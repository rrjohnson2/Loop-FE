import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../shared/alerts/alert.component';
import { AlertTicket } from '../interfaces/alert-ticket';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
@ViewChild(AlertComponent) notice: AlertComponent;

  constructor(private globalService:GlobalService) { }

  ngOnInit() {
  }
  
  public notify(alert_ticket:AlertTicket)
  {
    this.globalService.notify(this.notice,alert_ticket);
  }

}
