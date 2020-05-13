import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from 'src/app/shared/alerts/alert.component';
import { Profile } from 'src/app/models/profile';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-mobile-profile-activities',
  templateUrl: './mobile-profile-activities.component.html',
  styleUrls: ['./mobile-profile-activities.component.sass']
})
export class MobileProfileActivitiesComponent implements OnInit {

  @ViewChild(AlertComponent) alert:AlertComponent;
  profile:Profile;
  constructor(private layout:LayoutService) { }

  ngOnInit() {
    this.layout.profile.subscribe(data=> this.profile = data);
  }
  

  alerty(alert)
  {
      this.alert.add(alert);
  }

}
