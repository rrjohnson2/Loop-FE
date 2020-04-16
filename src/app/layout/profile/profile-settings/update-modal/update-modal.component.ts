import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Profile } from 'src/app/models/profile';
import { UIService } from 'src/app/services/ui.service';
import { Ticket } from 'src/app/interfaces/ticket';
import { isBuffer } from 'util';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.sass']
})
export class UpdateModalComponent implements OnInit  {

  updateForm: FormGroup;
  @Input()  profile:Profile 
  reason:string;
  @ViewChild('classic1') modal:ElementRef;
  constructor(private uiService:UIService, private formBuilder:FormBuilder) { }

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
    var tictket:Ticket={
      customer: this.profile.username,
      update_reason: this.reason,
      data:frame
    };


  }

  private getFrame(){
    console.log("here")
        switch (this.reason) {
          case "PASSWORD":

            break;

          case "EMAIL":
            
               break;
          case "FIRSTNAME":
            
                break;
          case "LASTNAME":
            
                break;
          case "USERNAME":
            
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

}
