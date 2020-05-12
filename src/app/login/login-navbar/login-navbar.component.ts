import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import {  isSmallScreen } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-login-navbar',
  templateUrl: './login-navbar.component.html',
  styleUrls: ['./login-navbar.component.css']
})
export class LoginNavbarComponent implements OnInit, AfterViewInit {
  hidden:boolean= false;

  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();

constructor() { }
  ngAfterViewInit(): void {
    this.hidden = isSmallScreen;
  }

ngOnInit() {
}

notify(event){
  this.alert_ticket.emit(event)
}


}
