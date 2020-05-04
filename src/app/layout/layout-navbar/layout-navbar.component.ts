import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../layout.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { RealtimeService } from 'src/app/services/realtime.service';
import { Notice } from 'src/app/models/notice';
@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.css']
})
export class LayoutNavbarComponent implements OnInit {

 profile:Profile;
 @Output() logout_event: EventEmitter<boolean> = new EventEmitter<boolean>();
 @Output() notice_event: EventEmitter<Notice> = new EventEmitter<Notice>();
  notifications:Notice[]=[];

  constructor(private layout:LayoutService, 
    private router:Router,
    private global:GlobalService)
  {}

  ngOnInit(): void {
    this.layout.profile.subscribe(
      data =>{
        this.profile = data;
      }
    )

    this.layout.notifications.subscribe(data => this.notifications = data);
  }

  logOff()
  {
    this.global.logOff();
    this.router.navigate(['/login']);
    this.logout_event.emit(true);
  }
  
   toggleDropDown(myDrop:NgbDropdown)
  {
    myDrop.toggle();
  }

  public showNotice(notice)
  { 
    if(this.router.url != '/layout/landing')
    {
      this.router.navigate['/layout/landing'];
    }
     this.notice_event.emit(notice);
  }

}
