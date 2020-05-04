import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notice } from 'src/app/models/notice';
import { log } from 'src/app/constants/app.constants';

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
     log(notice)
     this.notice_event.emit(notice);
     this.notifications.splice(this.notifications.indexOf(notice),1);
  }
  render_info(action,notice)
  {
    //comment retort focus rating
    return action
  }


// <button *ngIf="notice.action == 'COMMENT'; else retort" class="drop_down_button "  (click)="showNotice(notice)">
//           {{notice.data.timestamp|dateago}} ~ {{notice.data.creator.username| titlecase}} : commented on a retort
//               <app-notice-badge
//                 [profilePicture] ="idea.creator.profilePicture"
//                 [username] = "idea.creator.username"
//                 [time] = "idea.timestamp"
//                 [info] = "idea.title"
//               ></app-notice-badge>
//        </button>
//     <ng-template #retort >
//       <button *ngIf="notice.action == 'RETORT'; else focus" class="drop_down_button "  (click)="showNotice(notice)">
//         {{notice.data.timestamp|dateago}} ~ {{notice.data.creator.username| titlecase}} : retorted an idea of yours
//       </button>
//     </ng-template>
//     <ng-template #focus >
//       <button *ngIf="notice?.action == 'FOCUS'; else rating" class="drop_down_button "  (click)="showNotice(notice)">
//        <div> {{notice.data.timestamp|dateago}} {{notice.data.title}}: Idea Shared In 
//         <span *ngFor="let foc of notice.data.focus">
//             <span *ngFor="let pref of profile.preferences">
//               <span *ngIf="foc.category == pref.category">
//                 {{foc.category}} 
//               </span>
//             </span>
//           </span> 
//         </div>
//       </button>
//     </ng-template>
//     <ng-template #rating >
//       <button *ngIf="notice.action == 'RATING'" class="drop_down_button "  (click)="showNotice(notice)">
//         {{notice.data.vote}} VOTE on your idea
//       </button>
//     </ng-template>

}
