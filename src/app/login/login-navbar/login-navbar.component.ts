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
  hidden:boolean= false;

  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();

constructor() { }
  ngAfterViewInit(): void {
    this.hidden = window.screen.width < 992;
  }

ngOnInit() {
}

notify(event){
  this.alert_ticket.emit(event)
}


}
