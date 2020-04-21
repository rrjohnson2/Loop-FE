import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preference } from 'src/app/models/preference';
import { backend_url, log, here } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';
import { RealtimeService } from '../services/realtime.service';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { Profile } from '../models/profile';
import { Notice, Notice_Actions } from '../models/notice';
import { Idea } from '../models/idea';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
 

  profile:Observable<Profile> = this.globalservice.profileSubject.asObservable();
  notifications:Observable<Notice[]> = this.realTime.noticfications.asObservable();
  ideas_obs:Observable<Idea[]> = this.globalservice.ideas_behav.asObservable();
  focus:Observable<any>;
  constructor(
    private httpClient:HttpClient,
    private realTime:RealtimeService,
    private router:Router,
    private globalservice:GlobalService,
    ) { }

    setup()
    {
        here();
        this.setupProfile();
        this.notifications.subscribe((data)=>{
            this.updateOrAdd(data);
            this.focus = this.getFocuses();
        });
    }

    public setupProfile()
  {
    this.globalservice.getProfile().subscribe(
      data =>
      {
        this.globalservice.populateProfile(data);
        this.waitOnProfileForIdeas();
        this.realTime.joinRealTimeServer();
      },
      error =>
      {
        this.router.navigate(['/login']);
      }
    );
  }

  
  private  waitOnProfileForIdeas() {
    this.profile.subscribe(
      data=>
      {
       if(data!=null) this.globalservice.getIdeas(data.preferences);
      }
    );
  }

  public  updateOrAdd(data: Notice[]) {
    // tslint:disable-next-line: forin
    for(const key in data)
    {
      var notice:Notice = data[key];
      if(!notice.checked)
      {
        
        if(notice.action == Notice_Actions.FOCUS)
        {
          // tslint:disable-next-line: triple-equals
          if(this.globalservice.ideas != undefined && this.globalservice.ideas.find( idea => idea.id==notice.data.id) == undefined && notice.action == Notice_Actions.FOCUS)
          {
          
            this.globalservice.ideas.push(notice.data);
          }
        } else if (this.globalservice.ideas != undefined){
          var idea :Idea = this.globalservice.ideas.find( idea => idea.id == notice.idea_id);

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
    this.globalservice.refresh();
  }

  

  private getFocuses()
  {
    return this.httpClient.get(backend_url + "getCategories");
  }

  out() {
    this.realTime.logOff();
  }

}
