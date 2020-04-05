import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileSettingsService } from './profile-settings.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadImageModalComponent } from './upload-image-modal/upload-image-modal.component';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass']
})
export class ProfileSettingsComponent implements OnInit {

  @Input() profile:Profile;
  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();
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
  alery(event)
  {
    this.alert_ticket.emit(event);
  }

}
