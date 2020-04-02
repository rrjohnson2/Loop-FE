import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { CreateMemberTicket } from 'src/app/interfaces/create-member-ticket';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { Actions } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    private create_member: CreateMemberTicket;
    public signupform: FormGroup;
    @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();

  constructor(private globalservice: GlobalService,private router:Router) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm()
  {
    // tslint:disable-next-line: no-unused-expression
    this.signupform = new FormGroup(
      {
        firstname: new FormControl(null,
          [
            Validators.required
          ]),
        lastname: new FormControl(null,
          [
            Validators.required
          ]),
        email: new FormControl(null,
          [
            Validators.email
          ]),
        password: new FormControl(null,
          [
            Validators.required
          ]),
        username: new FormControl(null,
          [
            Validators.required
          ]),

      }
    );
  }

  public signUp()
  {
    if(!this.globalservice.validateForm(this.signupform,this.alert_ticket))
    {
      return
    }

    this.setUpTicket();
    this.globalservice.signUp(this.create_member).subscribe(
      data =>{
         this.globalservice.populateMember(data);
         this.router.navigate(['']);
      },
      
    error =>
    {
      this.alert_ticket.emit({
        msg:error.error.message,
        type:"danger",
        action_attempted:Actions.signup
      });
    }
    );
  }
  private setUpTicket()
  {
    // tslint:disable-next-line: whitespace
    this.create_member= {
      firstName: this.signupform.get("firstname").value,
      lastName: this.signupform.get("lastname").value,
      email: this.signupform.get("email").value,
      password: this.signupform.get("password").value,
      username: this.signupform.get("username").value
    };
  }

  
 
}
