import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import { Profile } from '../models/profile';
import { Observable, BehaviorSubject } from 'rxjs';
import { AlertComponent } from '../shared/alerts/alert.component';
import { AlertTicket } from '../interfaces/alert-ticket';
import { RealtimeService } from '../services/realtime.service';
import { Actions } from '../constants/app.constants';
import { Notice, Notice_Actions } from '../models/notice';
import { ContentComponent } from './content/content.component';
import { Idea } from '../models/idea';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  private profile:Observable<Profile>;
  private notifications:Observable<Notice[]>;
  private ideas:Idea[];
  private ideas_behav:BehaviorSubject<Idea[]> = new BehaviorSubject<Idea[]>(this.ideas);
  private ideas_obs:Observable<Idea[]>
  @ViewChild(AlertComponent) alert: AlertComponent;
  @ViewChild(ContentComponent) content_comp: ContentComponent;

  constructor(
    private globalservice:GlobalService,
    private router:Router,
    private layoutService:LayoutService,
    private realTime:RealtimeService) { }

  ngOnInit() {
    this.setupProfile();
    this.notifications = this.realTime.noticfications.asObservable();
    this.notifications.subscribe((data)=>{
     
      if(this.content_comp.ideas != undefined)
      {
        this.updateOrAdd(data);
      }
    });
  }

  private setupProfile()
  {
    this.globalservice.getProfile().subscribe(
      data =>
      {
        this.globalservice.populateProfile(data);
        this.profile = this.globalservice.profileSubject.asObservable();
        this.ideas_obs = this.ideas_behav.asObservable();
        this.waitOnProfileForIdeas();
        this.realTime.joinRealTimeServer();
      },
      error =>
      {
        this.router.navigate(['/login']);
      }
    
      
    );
  }
  addIdea(event:Idea)
  {
    this.ideas.push(event);
    this.ideas_behav.next(this.ideas);
  }
  waitOnProfileForIdeas() {
    this.profile.subscribe(
      data=>
      {
        this.layoutService.getIdeas(data.preferences).subscribe(
          data =>
          {
            this.ideas = data.data;
            this.ideas_behav.next(this.ideas);
          });
      }
    );
  }

  private  updateOrAdd(data: Notice[]) {
    // tslint:disable-next-line: forin
    for(const key in data)
    {
      var notice:Notice = data[key];
      if(!notice.checked)
      {
        
        if(notice.action == Notice_Actions.FOCUS)
        {
          // tslint:disable-next-line: triple-equals
          if(this.ideas != undefined && this.ideas.find( idea => idea.id==notice.data.id) == undefined && notice.action == Notice_Actions.FOCUS)
          {
          
            this.ideas.push(notice.data);
          }
        } else{
          var idea :Idea = this.ideas.find( idea => idea.id == notice.idea_id);

          if(notice.action == Notice_Actions.RETORT){
            var retort = idea.retorts.find(ret => ret.id == notice.data.id);
            if(retort == undefined) idea.retorts.push(notice.data);
          }
          else if (notice.action === Notice_Actions.RATING)
          { 
            var rate = idea.ratings.find(rate => rate.id == notice.data.id);
            if(rate == undefined) idea.ratings.push(notice.data);
            else rate.vote = notice.data.vote;
          }
          else if (notice.action === Notice_Actions.COMMENT)
          { 
            var retort = idea.retorts.find(ret => ret.id == notice.retort_id);
            var message = retort.messages.find( msg => msg.id == notice.data.id)
            if(message == undefined) retort.messages.push(notice.data);
            else message.content = notice.data.content;
          }
        }
          
         notice.checked = true;
      }
    }
    this.ideas_behav.next(this.ideas);
  }

  public alerty(alert_ticket:AlertTicket)
  {
    this.globalservice.notify(this.alert,alert_ticket);
  }
  public showNotice(event:Notice)
  {
    this.content_comp.showNotice(event);
  }
}
