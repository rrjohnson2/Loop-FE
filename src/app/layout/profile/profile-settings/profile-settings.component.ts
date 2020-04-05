import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileSettingsService } from './profile-settings.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadImageModalComponent } from '../upload-image-modal/upload-image-modal.component';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass']
})
export class ProfileSettingsComponent implements OnInit {

  @Input() profile:Profile;
  @ViewChild(UploadImageModalComponent) upload_image: UploadImageModalComponent
  constructor(private profileSettings:ProfileSettingsService) { }

  ngOnInit() {
  }
  
  openUploadModal()
  {
    this.upload_image.open();
  }

  get render_profile()
  {
    return `http://localhost:8082/avatar?user=${this.profile.profilePicture}`;
  }

}
