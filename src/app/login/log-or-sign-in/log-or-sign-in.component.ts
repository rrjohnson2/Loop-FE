import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { log } from 'src/app/constants/app.constants';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';

@Component({
  selector: 'app-log-or-sign-in',
  templateUrl: './log-or-sign-in.component.html',
  styleUrls: ['./log-or-sign-in.component.sass']
})
export class LogOrSignInComponent implements OnInit {

  choice:string ="Login"
  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();
  constructor() { }

  ngOnInit() {
  }

  toggle(event){
      if(event.checked) this.choice= "Sign Up"
      else this.choice ="Login"
  }
  notify(event){
    this.alert_ticket.emit(event);
  }

}
