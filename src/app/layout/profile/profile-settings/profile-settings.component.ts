import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileSettingsService } from './profile-settings.service';
import { UploadImageModalComponent } from './upload-image-modal/upload-image-modal.component';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { FormGroup } from '@angular/forms';
import { LayoutService } from '../../layout.service';
import { UIService } from 'src/app/services/ui.service';
import { Preference } from 'src/app/models/preference';
import { Ticket } from 'src/app/interfaces/ticket';
import { Actions } from 'src/app/constants/app.constants';
import { isFormattedError } from '@angular/compiler';

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
  pre_pop:boolean;

  contact_open:boolean;
  account_open:boolean;
  constructor(private profileSettings:ProfileSettingsService,
     private layout:LayoutService,
     private uiService:UIService) { }

  


  ngOnInit() {
    this.preForm = new FormGroup({});
  }

  createForm()
  {
    this.preForm = new FormGroup({
      categories: this.uiService.render(this.focuses)
    });
  }

  toggle(value)
  {
    if(value == "preference") 
    {
      this.pre_open = ! this.pre_open
      if(!this.pre_pop) this.popPref();
    }
  }
  private popPref() {
    
    this.layout.focus.subscribe(
      (data) =>
      {
        var arry = [];
        var count=0;
        arry = data;
        for(var i=0; i<arry.length;i++)
        {
          var hasPref = false;
          var index = this.profile.preferences.findIndex(pre => pre.category == arry[i]);
          if( index != -1 && count < this.profile.preferences.length) 
          {
            hasPref =true;
            count++;
          }
          this.focuses .push(
            {
              name: arry[i],
              init: hasPref,
              src : `assets/loop_icons/${arry[i]}.png`
            }
          )
        }
        this.createForm();
      }
      
    );
    this.pre_pop = true;
  }

  
  
  openModal(val:string)
  {
    if(val =='img') this.upload_image.open();
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

  updatePreference(){

    var ticket:Ticket ={
      customer:this.profile.username,
      data: this.populateCategories(),
      update_reason:"PREFERENCES"
    }
    this.profileSettings.updatePreference(ticket).subscribe(data => {
      this.profile.preferences =  this.stripPref(data);
      this.alert_ticket.emit({
        action_attempted: Actions.update,
        msg: "Update Worked",
        type:'success'
      });
      this.toggle('preference');
    },
    error =>{
        this.alert_ticket.emit({
          action_attempted: Actions.update,
          msg: "Update failed",
          type:'danger'
        });
    });
  }
  private stripPref(data): Preference[] {
      return  <Preference[]> data;
  }
  private populateCategories(): Preference[] {
    var temp:Preference[] =[]
    var controls=[]
    controls = this.categories.value;
    console.log(this.categories);
    for (var i =0; i< controls.length; i++ ) {
      if (controls[i].value==true) {
          temp.push(new Preference(this.focuses[i].name,null,null));
          console.log(temp)
      }
    }
  
    return temp;
  }

  openCard(val)
  {
    if(val == 'contact')this.contact_open = !this.contact_open;
    else if(val == 'account') this.account_open = !this.account_open;
  }

}
