import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Actions } from 'src/app/constants/app.constants';
import { Profile } from 'src/app/models/profile';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ticket } from 'src/app/interfaces/ticket';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  @Input() public profile:Profile;
  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();

  autoCloseBool=false;
  closeResult: string;
  updateForm:FormGroup;
  updateTicket:Ticket;

  ngOnInit() {
    this.createForm();
  }
    constructor(private globalService:GlobalService,private router:Router,private uiService:UIService)
    {

    }
  private createForm()
  {
    // tslint:disable-next-line: no-unused-expression
    this.updateForm = new FormGroup(
      {
        firstname: new FormControl(null,
          [
            
          ]),
        lastname: new FormControl(null,
          [
            
          ]),
        email: new FormControl(null,
          [
            
          ]),
        password: new FormControl(null,
          [
            
          ]),
        username: new FormControl(null,
          [

          ]),
        old_password: new FormControl(null,
        [
          Validators.required
        ]),

      }
    );
  }
  public toggleDropDown(myDrop:NgbDropdown)
  {
    myDrop.toggle();
  }

 

  public logoff(){
    localStorage.clear();
    this.globalService.flush();
    this.router.navigate(['/login']);
  }

  open(content, type, modalDimension) {
    this.uiService.open(content,type,modalDimension);
}
 


public update()
{
  
  if(!this.globalService.validateForm(this.updateForm,this.alert_ticket))
    {
      
      return
    }

  this.updateTicket =
  {
      customer: this.profile.username,
      data: {
        old_password: this.updateForm.get("old_password").value,
        member: {
          username: this.updateForm.get("username").value,
          email: this.updateForm.get("email").value,
          firstName: this.updateForm.get("firstname").value,
          lastName: this.updateForm.get("lastname").value,
          password: this.updateForm.get("password").value,
        }
      }
  }
    this.globalService.updateProfile(this.updateTicket).subscribe(
      data =>
      {
          this.globalService.populateProfile(data);
          this.updateForm.reset();
          this.uiService.dismissAll();
      },
      error =>{
        this.alert_ticket.emit({
          msg:error.error.message,
          type:"danger",
          action_attempted: Actions.logOff
        })
      }
    )

}



}
