import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notice } from 'src/app/models/notice';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  
  @Input() public notifications:Notice[];
  
  @Output() notice_event: EventEmitter<Notice> = new EventEmitter<Notice>();
  constructor() { }

  ngOnInit() {
  }


  public showNotice(notice)
  { 
     this.notice_event.emit(notice);
     this.notifications.splice(this.notifications.indexOf(notice),1);
  }

}
