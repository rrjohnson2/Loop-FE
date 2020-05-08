import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { Idea } from 'src/app/models/idea';
import { Profile } from 'src/app/models/profile';
import { Focus } from 'src/app/models/focus';
import { ShareIdeaData } from 'src/app/interfaces/shareIdeaData';
import { Ticket } from 'src/app/interfaces/ticket';
import { Actions, here, log } from 'src/app/constants/app.constants';
import { UIService } from 'src/app/services/ui.service';
import { ShareIdeaService } from './share-idea.service';
import { GlobalService } from 'src/app/services/global.service';
import { IdeaModalComponent } from '../idea-modal/idea-modal.component';
import { LayoutService } from '../../layout.service';
import { BitContentComponent } from '../../bit-content/bit-content.component';

@Component({
  selector: 'app-share-idea',
  templateUrl: './share-idea.component.html',
  styleUrls: ['./share-idea.component.css'],
  providers:[UIService]
})
export class ShareIdeaComponent implements OnInit, AfterViewInit {
  ideaForm:FormGroup;
  private content:string
  private regex = /(\.|\-|\s|:|\(|\))/gm;
  content_file:File;
  focuses = []

  

  @ViewChild(IdeaModalComponent) ideaModal:IdeaModalComponent;
  @ViewChild(BitContentComponent) bitComp:BitContentComponent;

  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();
  @Output() idea_event: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Input() public profile:Profile;


  constructor(private uiService:UIService,private share_ideaService:ShareIdeaService , private globalService:GlobalService,
     private layout:LayoutService) {
    
   }
  ngAfterViewInit(): void {
    this.uiService.loop_upload_button();
  }

  ngOnInit() {
    this.createForm();
    this.layout.focus.subscribe(
      (data) =>
      {
        var arry = [];
        arry = data;
        for(var i=0; i<arry.length;i++)
        {
          this.focuses .push(
            {
              name: arry[i],
              src : `assets/loop_icons/${arry[i]}.png`
            }
          )
        }
        this.createForm();
      }
      
    );
  }
  createForm() {
    this.ideaForm = new FormGroup(
      {
        title: new FormControl(null,
          [
            Validators.required
          ]), 
          description: new FormControl(null,
            [
              Validators.required
            ]),
          categories: this.uiService.render(this.focuses)
      }
    );
  }

  shareIdea(idea:Idea)
  {
  
    // build focus fom checkboxes
    var shareIdeaData:ShareIdeaData={
      title: idea.title,
      description: idea.description,
      focuses: idea.focuses,
      content: idea.content
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

 createIdea()
 {
   if(!this.ideaForm.valid)
   {
    this.alert_ticket.emit({
      msg:"invalid request",
      action_attempted: Actions.shareIdea,
      type: "danger"
    });

    return
  }
   
   var focuses:Focus[] = this.populateCategories();
   
   var ideaCreated:Idea;
   ideaCreated = new Idea(null,this.ideaForm.get("description").value,null,focuses,null,null,null,null,this.ideaForm.get("title").value,null,this.content);
   
   this.upload(ideaCreated);
   
    this.ideaForm.reset();
    this.createForm();
    
 }

 private upload(ideaCreated)
 {
   if(this.content_file)
   {
     log(this.content_file)
     log(this.content);
     log(ideaCreated)
      this.share_ideaService.upload_content(this.content_file).subscribe(
        data=>
        {
          this.shareIdea(ideaCreated);
        }
      )
   }
   else{
     here()
     this.shareIdea(ideaCreated)
   }
 }

 private populateCategories(): Focus[] {
  var temp:Focus[] =[]
  var controls=[]
  controls = this.categories.value;
  for (var i =0; i< controls.length; i++ ) {
    if (controls[i].value==true) {
        temp.push(new Focus(this.focuses[i].name,null));
    }
  }

  return temp;
}

 get categories() {
   return this.ideaForm.get('categories');
 };

 fileChangeEvent(event)
 {
  var old_file = event.target.files[0];

  var extension = old_file.name.split('.').pop();

  this.bitComp.init(old_file);


  this.content = `${this.profile.username}${new Date()}`
  this.content = this.content .replace(this.regex,``) +`.${extension}`;
  this.content_file =  new File([old_file],this.content,{type:old_file.type});
  
 }


}
