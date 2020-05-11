import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { Idea } from 'src/app/models/idea';
import { Notice } from 'src/app/models/notice';
import { LayoutService } from '../layout.service';
import { AlertComponent } from 'src/app/shared/alerts/alert.component';
import { ContentComponent } from './content/content.component';
import { here } from 'src/app/constants/app.constants';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit, AfterViewInit {

  profile:Profile;
  ideas:Idea[] =[];
  notifications:Notice[] = [];
  filter:string

  hidden_sm=false;
  

  @ViewChild(AlertComponent) alert:AlertComponent;
  @ViewChild(ContentComponent) content:ContentComponent;

  constructor(private layout:LayoutService, private ui:UIService) { }
  ngAfterViewInit(): void {
    this.hidden_sm = window.screen.width <992;
  }

  ngOnInit() {
    this.layout.profile.subscribe(data=> this.profile = data);

    this.layout.ideas_obs.subscribe(data => this.ideas = data);

    this.layout.notifications.subscribe(data => this.notifications = data);
  }

  addIdea(idea:Idea)
  {
    
    idea.creator.username = this.profile.username; 
    this.profile.created_ideas.push(idea);
    this.ideas.push(idea);
  }

  alerty(alert)
  {
      this.alert.add(alert);
  }
  showNotice(notice)
  {
      this.content.showNotice(notice);
  }
  showIdea(idea)
  {
    this.content.showIdea(idea);
  }

  ideaFilter(event)
  {
      if(event == this.filter) 
      {
        this.filter = null;
      }
      else{
        this.filter = event;
      }
  }
  get render_container()
  {
    return this.ui.container_or_fluid(this.hidden_sm);
  }

}
