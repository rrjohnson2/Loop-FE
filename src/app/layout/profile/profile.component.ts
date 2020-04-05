import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../layout.service';
import { AlertComponent } from 'src/app/shared/alerts/alert.component';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

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
