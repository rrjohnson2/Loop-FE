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
import { Profile } from 'src/app/models/profile';
import { log } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.css']
})
export class IdeaCardComponent implements OnInit {


  @Input() idea:Idea;
  @Input() profile:Profile;
  @Input() username:string;
           expan:boolean = false;
  @ViewChildren(RetortCardComponent) retort_cards:QueryList<RetortCardComponent>;
  @ViewChild(IdeaModalComponent) ideaModal:IdeaModalComponent;
  today:Date = new Date();
  retortForm:FormGroup
  types =[];
  constructor(private idea_card_service:IdeaCardService, private uiService:UIService, private global:GlobalService) { }

  ngOnInit() {
    this.createForm();
    this.global.getVoteTypes().subscribe(
      (data) =>
     {
       var arry:any = [];
       arry = data;
       for(var i=0; i<arry.length;i++)
       {
         this.types .push(
            arry[i]
         )
       }
     }
    );
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
    
    this.addToCreated(this.profile.ideas_retorted);
    this.profile.created_retorts.push(data.data);
    this.idea.retorts.push(data.data)
  }

  messageEvent(event)
  {
    console.log(event.data.data);
    for (const key in this.idea.retorts) {
      if(this.idea.retorts[key].id == event.retort.id)
      {
       
        this.idea.retorts[key].messages.push(event.data.data);
      }
    }

    this.addToCreated(this.profile.ideas_messaged);
    this.profile.created_messages.push(event.data.data);

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
    this.addToCreated(this.profile.ideas_rated);
    this.profile.created_ratings.push(data.data);
    this.idea.ratings.push(data.data); 
  }
  
  addToCreated(list)
  {
    if(list.findIndex(thought => thought.id == this.idea.id) ==-1)
      {
        list.push(this.idea);
      }
  }

  get rating()
  {
    var avg = null;

    var score = 0;

    var count = 0;

    for (const key in this.idea.ratings) {
      count++;
      if(this.idea.ratings[key].vote == "Bad") score+=1;
      else if(this.idea.ratings[key].vote == "Poor") score+=2;
      else if(this.idea.ratings[key].vote == "So_So") score+=3;
      else if(this.idea.ratings[key].vote == "Fair") score+=4;
      else if(this.idea.ratings[key].vote == "Good") score+=5;
    }

    if(score > 0) avg = score/count;
  
    return avg;
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
        var index = this.global.ideas.findIndex(ide => ide.id == this.idea.id);
        this.global.ideas.splice(index,1);
        this.global.refresh();
      }
    );
  }

}