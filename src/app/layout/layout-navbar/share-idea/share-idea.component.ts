import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { Idea } from 'src/app/models/idea';
import { Profile } from 'src/app/models/profile';
import { Focus } from 'src/app/models/focus';
import { ShareIdeaData } from 'src/app/interfaces/shareIdeaData';
import { Ticket } from 'src/app/interfaces/ticket';
import { Actions } from 'src/app/constants/app.constants';
import { UIService } from 'src/app/services/ui.service';
import { ShareIdeaService } from './share-idea.service';
import { GlobalService } from 'src/app/services/global.service';
import { IdeaModalComponent } from '../../idea-modal/idea-modal.component';

@Component({
  selector: 'app-share-idea',
  templateUrl: './share-idea.component.html',
  styleUrls: ['./share-idea.component.css']
})
export class ShareIdeaComponent implements OnInit {

  

  @ViewChild(IdeaModalComponent) ideaModal:IdeaModalComponent;

  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();
  @Output() idea_event: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Input() public profile:Profile;


  constructor(private uiService:UIService,private share_ideaService:ShareIdeaService , private formBuilder:FormBuilder, private globalService:GlobalService) {
    
   }

  ngOnInit() {
    
  }

  shareIdea(idea:Idea)
  {
  
    // build focus fom checkboxes
    var shareIdeaData:ShareIdeaData={
      title: idea.title,
      description: idea.description,
      focuses: idea.focuses
    }
    var shareIdeaTicket:Ticket ={
      customer:this.profile.username,
      data: shareIdeaData
    };
    this.share_ideaService.shareIdea(shareIdeaTicket).subscribe(
      data =>
      {
        var message:any = data;
        this.idea_event.emit(message.data);
        this.alert_ticket.emit({
          msg: message.data.message,
          action_attempted: Actions.shareIdea,
          type: "success"
        });
      },
      error =>{
        this.uiService.dismissAll();
        this.alert_ticket.emit({
          msg:error.error.message,
          action_attempted: Actions.shareIdea,
          type: "danger"
        })
      }
    );
  }
 
  open()
 {
   this.ideaModal.open();
 }


}
