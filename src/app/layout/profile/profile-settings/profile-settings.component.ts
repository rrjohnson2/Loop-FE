import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileSettingsService } from './profile-settings.service';
import { UploadImageModalComponent } from './upload-image-modal/upload-image-modal.component';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { FormGroup } from '@angular/forms';
import { LayoutService } from '../../layout.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.sass']
})
export class ProfileSettingsComponent implements OnInit {

  @Input() profile:Profile;
  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();
  @ViewChild(UploadImageModalComponent) upload_image: UploadImageModalComponent

  preForm:FormGroup;
  focuses=[];
  pre_open:boolean;
  constructor(private profileSettings:ProfileSettingsService,
     private layout:LayoutService,
     private uiService:UIService) { }

  


  ngOnInit() {
    this.preForm = new FormGroup({});
    this.layout.focus.subscribe(
      (data) =>
      {
        var arry = [];
        arry = data;
        for(var i=0; i<arry.length;i++)
        {
          this.focuses .push(
            {
              name: arry[i]
            }
          )
        }
        this.createForm();
      }
      
    );
  }

  createForm()
  {
    this.preForm = new FormGroup({
      categories: this.uiService.render(this.focuses)
    });
  }

  toggle(value)
  {
    if(value == "prefernence") this.pre_open = ! this.pre_open;
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
  get categories(){
    return this.preForm.get("categories");
  }

}
