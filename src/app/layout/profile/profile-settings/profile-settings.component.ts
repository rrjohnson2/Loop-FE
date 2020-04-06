import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileSettingsService } from './profile-settings.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadImageModalComponent } from './upload-image-modal/upload-image-modal.component';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass']
})
export class ProfileSettingsComponent implements OnInit {

  @Input() profile:Profile;
  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();
  @ViewChild(UploadImageModalComponent) upload_image: UploadImageModalComponent
  constructor(private profileSettings:ProfileSettingsService, private formBuilder:FormBuilder) { }

  contact_open:boolean;
  contacts_values=
  [
    {
      name:"firstName",
      ind:0
    },
    {
      name:"lastName",
      ind:1
    },
    {
      name:"email",
      ind:2
    },
    
  ]
  contactForm:FormGroup;


  ngOnInit() {
    this.initForms()
  }

  toggle(value)
  {
    if(value =='contact')
    {
      this.contact_open = !this.contact_open;
      return;
    }
  }

  initForms()
  {
    this.initContact();
  }

  initContact()
  {
    this.contactForm = new FormGroup(
      {
        contacts : this.render(this.contacts_values)
      }
    )
  }
  render(list: { name: string; }[]): import("@angular/forms").AbstractControl {
    const array = list.map(item=> 
      {
          return  this.formBuilder.control(null);
      });
      return this.formBuilder.control(array);
  }
  
  openUploadModal()
  {
    this.upload_image.open();
  }

  get render_profile()
  {
    return "http://localhost:8082/avatar?user="+this.profile.profilePicture;
  }
  alery(event)
  {
    this.alert_ticket.emit(event);
  }
  get contacts(){
    return this.contactForm.get("contacts");
  }

}
