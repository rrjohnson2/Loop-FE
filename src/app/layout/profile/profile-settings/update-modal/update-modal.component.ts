import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Profile } from 'src/app/models/profile';
import { UIService } from 'src/app/services/ui.service';
import { Ticket } from 'src/app/interfaces/ticket';
import { UpdateServiceService } from './update-service.service';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { Actions, here } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.sass']
})
export class UpdateModalComponent implements OnInit  {

  updateForm: FormGroup;
  @Input()  profile:Profile 
  message:string;
  reason:string;
  @ViewChild('classic1') modal:ElementRef;
  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();
  constructor(private uiService:UIService,
     private formBuilder:FormBuilder,
     private updateService:UpdateServiceService) { }

  ngOnInit() {
  }
  createForm(){
    switch (this.reason) {
      case "PASSWORD":
        this.updateForm =  this.formBuilder.group({
          old_password: [null, [Validators.required]],
          confirmed: ['', [Validators.required]],
          target: ['', [Validators.required]]
    }, {validator: this.Confirming});
        break;

      case "EMAIL":
        this.updateForm = this.formBuilder.group({
          target: [null, [Validators.required]],
          confirmed: [null, [Validators.required]]   
      }, {validator: this.Confirming})
           break;
      default: 
        this.updateForm = new FormGroup({
          target: new FormControl(null,[Validators.required])
        });
       break
    }
  }

  submit(){
    var frame = this.getFrame();
    var ticket:Ticket={
      customer: this.profile.username,
      update_reason: this.reason,
      data:frame
    };

    this.updateService.update(ticket).subscribe(data=>{
      this.updateProfile(frame);
      this.cancel();
    },
    error =>{
      this.message = "Something Went Wrong";
    }
    );
    


  }

  private updateProfile(frame)
  {
    switch (this.reason) {
      case "PASSWORD":
        this.alert_ticket.emit({
          action_attempted:Actions.update,
          msg:"Pasword Updated",
          type:"success"
        })
        break;
      case "USERNAME":
        this.profile.username = frame
        localStorage.setItem("username",this.profile.username);
        break;
      case "EMAIL":
        this.profile.email = frame
        break;
      case "FIRSTNAME":
        this.profile.firstName = frame
        break;
      case "LASTNAME":
        this.profile.lastName = frame
        break;
    }
  }

  private getFrame(){

    var target = this.updateForm.get('target').value;
        // tslint:disable-next-line: align
        switch (this.reason) {
          case "PASSWORD":
            return {
              old_password: this.updateForm.get('old_password').value,
              password: target
            }
          default:
            return target;
            break;
        }
  }

  open() {
    this.uiService.open(this.modal, "modal-mini", 'sm');
  }

  private Confirming(c: AbstractControl): { invalid: boolean } {
    if (c.get("target").value !== c.get("confirmed").value) {
        return {invalid: true};
    }

  
  
}

match()
  {
    var confirmed = this.updateForm.get('confirmed').value;
    var target = this.updateForm.get('target').value;
    return confirmed != null && target !=null && confirmed == target;
  }

  cancel()
  {
    this.updateForm.reset();
    this.uiService.dismissAll();
    this.message="";
  }

}
