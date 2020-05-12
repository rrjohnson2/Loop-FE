import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Actions } from 'src/app/constants/app.constants';
import { Ticket } from 'src/app/interfaces/ticket';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.sass']
})
export class LogComponent implements OnInit {
  private ticket: Ticket;
  public loginForm: FormGroup;
  hidden:boolean= false;

  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();

constructor(private globalservice: GlobalService, private router:Router) { }
  
ngOnInit() {
  this.createForm();
}

private createForm()
{
  // tslint:disable-next-line: no-unused-expression
  this.loginForm = new FormGroup(
    {
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

public Login()
{
  if(!this.globalservice.validateForm(this.loginForm,this.alert_ticket))
    {
      
      return
    }

  this.setUpTicket();

  this.globalservice.login(this.ticket).subscribe(
    data =>
    {
      this.globalservice.populateMember(data);
      
      this.router.navigate(['']);
      
    },
    error =>
    {
      this.alert_ticket.emit({
        msg:error.error.message,
        type:"danger",
        action_attempted: Actions.login
      })
    }
    
  )
}
private setUpTicket()
{
  this.ticket =
  {
    customer: this.loginForm.get("username").value,
    data: this.loginForm.get("password").value
  };
}

public validateForm() {

  this.globalservice.validateForm(this.loginForm,this.alert_ticket);
  
}
}
