import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../shared/alerts/alert.component';
import { AlertTicket } from '../interfaces/alert-ticket';
import { GlobalService } from '../services/global.service';
import { isSmallScreen } from '../constants/app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(AlertComponent) notice: AlertComponent;

  hidden = false;

  constructor(private globalService:GlobalService) { }

  ngOnInit() {
    this.hidden = isSmallScreen;
  }
  
  public notify(alert_ticket:AlertTicket)
  {
    this.globalService.notify(this.notice,alert_ticket);
  }

}
