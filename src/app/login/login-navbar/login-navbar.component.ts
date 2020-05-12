import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import {  isSmallScreen } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-login-navbar',
  templateUrl: './login-navbar.component.html',
  styleUrls: ['./login-navbar.component.css']
})
export class LoginNavbarComponent implements OnInit {
  hidden:boolean= false;

  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();

constructor() { }
 

ngOnInit() {
  
  this.hidden = isSmallScreen;
}

notify(event){
  this.alert_ticket.emit(event)
}


}
