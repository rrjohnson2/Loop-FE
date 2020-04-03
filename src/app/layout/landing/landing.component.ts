import { Component, OnInit, ViewChild } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { Idea } from 'src/app/models/idea';
import { Notice } from 'src/app/models/notice';
import { LayoutService } from '../layout.service';
import { AlertComponent } from 'src/app/shared/alerts/alert.component';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  profile:Profile;
  ideas:Idea[] =[];
  notifications:Notice[] = [];

  @ViewChild(AlertComponent) alert:AlertComponent;
  @ViewChild(ContentComponent) content:ContentComponent;

  constructor(private layout:LayoutService) { }

  ngOnInit() {
    this.layout.profile.subscribe(data=> this.profile = data);

    this.layout.ideas_obs.subscribe(data => this.ideas = data);

    this.layout.notifications.subscribe(data => this.notifications = data);
  }

  addIdea(idea:Idea)
  {
    
  }

  alerty(alert)
  {
      this.alert.add(alert);
  }
  showNotice(notice)
  {
      this.content.showNotice(notice);
  }


}
