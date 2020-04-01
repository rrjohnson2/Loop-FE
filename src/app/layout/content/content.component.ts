import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { Profile } from 'src/app/models/profile';
import { Idea } from 'src/app/models/idea';
import { Notice, Notice_Actions } from 'src/app/models/notice';
import { UIService } from 'src/app/services/ui.service';
import { IdeaCardComponent } from './idea-card/idea-card.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { Retort } from 'src/app/models/retort';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  
  @Input()  profile:Profile;
  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();
  @Input()  ideas:Idea[];
  @ViewChildren(IdeaCardComponent) idea_cards:QueryList<IdeaCardComponent>;
  constructor(private uiService:UIService) {
   
   }

  ngOnInit() {
  
  }

  showNotice(event: Notice) {
    if(event.action == Notice_Actions.FOCUS || event.action == Notice_Actions.RATING)
    {
      return this.showIdea(event.data);
    }
    return this.idea_cards.find((item: IdeaCardComponent, index: number, array: IdeaCardComponent[]) => 
    item.idea.id ==event.idea_id).showNotice(event);
  }
  showIdea(data:Idea) {
    
    return this.uiService.bringInView(data.id,`ideas_body`);
  }
 
  
  get Ideas()
  {
    return    this.ideas.sort((val1, val2)=> 
    {return new Date(val2.timestamp).getTime() - new Date(val1.timestamp).getTime()});
  }

}
