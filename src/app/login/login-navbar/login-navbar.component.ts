import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ticket } from 'src/app/interfaces/ticket';
import { Router } from '@angular/router';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { Actions } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-login-navbar',
  templateUrl: './login-navbar.component.html',
  styleUrls: ['./login-navbar.component.css']
})
export class LoginNavbarComponent implements OnInit, AfterViewInit {
  private ticket: Ticket;
  public loginForm: FormGroup;
  hidden:boolean= false;

  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();

constructor(private globalservice: GlobalService, private router:Router) { }
  ngAfterViewInit(): void {
    this.hidden = window.screen.width < 992;
  }

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
