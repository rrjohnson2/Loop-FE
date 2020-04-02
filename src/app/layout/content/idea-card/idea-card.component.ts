import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Idea } from 'src/app/models/idea';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from 'src/app/models/message';
import { IdeaCardService } from './idea-card.service';
import { Ticket } from 'src/app/interfaces/ticket';
import { Notice, Notice_Actions } from 'src/app/models/notice';
import { RetortCardComponent } from '../retort-card/retort-card.component';
import { UIService } from 'src/app/services/ui.service';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { IdeaModalComponent } from '../../idea-modal/idea-modal.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.css']
})
export class IdeaCardComponent implements OnInit {


  @Input() idea:Idea;
  @Input() username:string;
           expan:boolean = false;
  @ViewChildren(RetortCardComponent) retort_cards:QueryList<RetortCardComponent>;
  @ViewChild(IdeaModalComponent) ideaModal:IdeaModalComponent;
  today:Date = new Date();
  retortForm:FormGroup
  constructor(private idea_card_service:IdeaCardService, private uiService:UIService, private global:GlobalService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm()
  {
    this.retortForm = new FormGroup(
      {
        retort: new FormControl(null,
          [
            Validators.required
          ])
      }
    )
      
  } 
  submit()
  {
      var ticket:Ticket={
        customer:this.username,
        data:{
          idea:this.idea.id,
          retort:this.retortForm.get("retort").value
        }
      }
      this.idea_card_service.retort(ticket).subscribe(
        
          (data) =>
          {
            this.retortForm.reset();
            this.addRetortToIdea(data);
          }
        
      )
     
  }
  addRetortToIdea(data: any) {
    this.idea.retorts.push(data.data)
  }

  messageEvent(event)
  {
    for (const key in this.idea.retorts) {
      if(this.idea.retorts[key].id == event.retort.id)
      {
        this.idea.retorts[key].messages.push(event.data.data);
      }
    }

  }

  showNotice(event:Notice) {
    this.expan = true;
    if(event.action == Notice_Actions.RETORT)
    {  
     
    return this.uiService.bringInView(this.idea.id,`ideas_body`)
    }
    return this.retort_cards.find((item: RetortCardComponent, index: number, array: RetortCardComponent[]) => 
    item.retort.id ==event.retort_id).showNotice(event);
  }
  showRetort() {
    this.expan = !this.expan;
  }

  vote(vote_type)
  {
    var ticket:Ticket = {
      customer: this.username,
      data:{
        idea:this.idea.id,
        vote:vote_type
      }
    }
    this.idea_card_service.vote(ticket).subscribe(
      data =>{
        this.addRating(data);
      }
    );
  }
  addRating(data: any) {
    for (const key in this.idea.ratings) {
      if(this.idea.ratings[key].id == data.data.id) 
      {
        return this.idea.ratings[key].vote = data.data.vote;
        
      }
    }
    this.idea.ratings.push(data.data); 
  }
  get upVotes()
  { 
    var up = 0;
    for (const key in this.idea.ratings) {
      if(this.idea.ratings[key].vote == "UP") up++;
    }
   return up;
  }
  get downVotes()
  {
    var down = 0;
    for (const key in this.idea.ratings) {
      if(this.idea.ratings[key].vote == "DOWN") down++;
    }
    return down;
  }
  get sortedRetorts()
  {
   return  this.idea.retorts.sort((val1, val2)=> 
      {return new Date(val1.timestamp).getTime() - new Date(val2.timestamp).getTime()});
  }
  toggleDropDown(myDrop:NgbDropdown)
  {
    myDrop.toggle();
  }

  showEdit()
  {
    this.ideaModal.open();
  }
  updateIdea(idea:Idea)
  {
    var ticket:Ticket={
      customer:this.username,
      data:idea
    }
      this.idea_card_service.updateIdea(ticket).subscribe(
        data =>
        {
          this.idea = idea;
        }
      );
  }

  delete(){
    var ticket:Ticket={
      customer:this.username,
      data:this.idea
    }
    this.idea_card_service.delete(ticket).subscribe(
      data =>
      {
        var index =this.global.ideas.findIndex(ide => ide.id == this.idea.id);
        this.global.ideas.splice(index,1);
        this.global.refresh();
      }
    );
  }

}