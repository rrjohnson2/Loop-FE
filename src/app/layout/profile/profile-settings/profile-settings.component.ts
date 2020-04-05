import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileSettingsService } from './profile-settings.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass']
})
export class ProfileSettingsComponent implements OnInit {

  @Input() profile:Profile;
  constructor(private profileSettings:ProfileSettingsService) { }

  ngOnInit() {
  }

}
