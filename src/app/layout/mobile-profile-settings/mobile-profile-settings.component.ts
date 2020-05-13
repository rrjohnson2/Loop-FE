import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from 'src/app/shared/alerts/alert.component';
import { Profile } from 'src/app/models/profile';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-mobile-profile-settings',
  templateUrl: './mobile-profile-settings.component.html',
  styleUrls: ['./mobile-profile-settings.component.sass']
})
export class MobileProfileSettingsComponent implements OnInit {

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
