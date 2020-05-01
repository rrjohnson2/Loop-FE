import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Retort } from 'src/app/models/retort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RetortCardService } from './retort-card.service';
import { Ticket } from 'src/app/interfaces/ticket';
import { Message } from 'src/app/models/message';
import { GlobalService } from 'src/app/services/global.service';
import { Notice_Actions, Notice } from 'src/app/models/notice';
import { UIService } from 'src/app/services/ui.service';
import { PillType, here } from 'src/app/constants/app.constants';
import { log } from 'util';

@Component({
  selector: 'app-retort-card',
  templateUrl: './retort-card.component.html',
  styleUrls: ['./retort-card.component.css']
})
export class RetortCardComponent implements OnInit {

  type:PillType = PillType.rertort;
  @Input() idea_id:number;
  @Input() retort:Retort;
  @Input() username: string;
  @Output() messageEvent: EventEmitter<any> = new EventEmitter<any>();
  messageForm:FormGroup;
  expan: boolean  =false;
  constructor(private retortCardService:RetortCardService,private uiService:UIService) { }

  ngOnInit() {
    this.createForm();
  }
  ngOnChange()
  {

  }
  createForm()
  {
    this.messageForm = new FormGroup(
      {
        message: new FormControl(null,
          [
            Validators.required
          ])
      });
      
  } 
  submit()
  {
    var ticket:Ticket = {
      customer:this.username,
      data: {
        retort:this.retort.id,
        comment:this.messageForm.get("message").value
      }
    }
    this.retortCardService.message(ticket).subscribe(
      data =>{
        this.messageForm.reset()
        this.messageEvent.emit(
          {
            data:data,
            retort:this.retort
          }
        );
        this.expan = true;
      }
    )
  }

  showNotice(event:Notice) {
    if(event.action == Notice_Actions.COMMENT)
    {
      this.expan= true;
      return this.uiService.bringInView(this.idea_id,`ideas_body`)
    }
  }
 

  get sortedMessages()
  {
   return  this.retort.messages.sort((val1, val2)=> 
      {return new Date(val1.timestamp).getTime() - new Date(val2.timestamp).getTime()});
  }

  showComment(event)
  {
    this.expan = !this.expan;
     this.uiService.init();
  }
 
}
