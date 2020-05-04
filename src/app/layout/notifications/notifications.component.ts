import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notice, Notice_Actions } from 'src/app/models/notice';
import { log } from 'src/app/constants/app.constants';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  
  @Input() public notifications:Notice[];
  
  @Output() notice_event: EventEmitter<Notice> = new EventEmitter<Notice>();
  constructor(private noticeServ:NotificationService) { }

  ngOnInit() {
  }


  public showNotice(notice)
  { 
     this.notice_event.emit(notice);
     this.notifications.splice(this.notifications.indexOf(notice),1);
     this.noticeServ.removeNotice(notice).subscribe(
       data =>{
         
       }
     );
  }
  render_info(action,notice)
  {
    switch(action){
      case Notice_Actions.COMMENT: 
       return `commented on a retort you are following`
      break;
      case Notice_Actions.RETORT: 
       return `retorted on an bit you are following`
      break;
      case Notice_Actions.RATING: 
          return ` rated your bit ${notice.data.vote}`
      break;
      case Notice_Actions.FOCUS: 
          return `created bit in space you follow \u2022 ${notice.data.title}`
      break;
    }
    return action
  }
}
