import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, AfterViewChecked } from '@angular/core';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { Profile } from 'src/app/models/profile';
import { Idea } from 'src/app/models/idea';
import { Notice, Notice_Actions } from 'src/app/models/notice';
import { UIService } from 'src/app/services/ui.service';
import { IdeaCardComponent } from './idea-card/idea-card.component';
import { here, log } from 'src/app/constants/app.constants';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input() filter:string;
  @Input()  profile:Profile;
  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();
  @Input()  ideas:Idea[];
  @ViewChildren(IdeaCardComponent) idea_cards:QueryList<IdeaCardComponent>;
  constructor(private uiService:UIService) {
   
   }
  

  ngOnInit() {
  }

  showNotice(event: Notice) {
    log(event)
    if(event.action == Notice_Actions.FOCUS)
    {
      this.showIdea(event.data);
    }
    if( event.action == Notice_Actions.RATING)
    {
      return this.uiService.bringInView(event.idea_id,`ideas_body`);
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
