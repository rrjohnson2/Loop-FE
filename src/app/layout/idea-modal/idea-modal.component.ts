import { Component, OnInit, Output, Input, EventEmitter, ContentChild, TemplateRef, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Idea } from 'src/app/models/idea';
import { UIService } from 'src/app/services/ui.service';
import { ShareIdeaService } from '../layout-navbar/share-idea/share-idea.service';
import { GlobalService } from 'src/app/services/global.service';
import { Focus } from 'src/app/models/focus';
import { ShareIdeaData } from 'src/app/interfaces/shareIdeaData';

@Component({
  selector: 'app-idea-modal',
  templateUrl: './idea-modal.component.html',
  styleUrls: ['./idea-modal.component.sass']
})
export class IdeaModalComponent implements OnInit {

  ideaForm:FormGroup;
  ideaFormSelection:number = 0
  focuses = []

  @Input() idea:Idea
  @Output() idea_event: EventEmitter<Idea> = new EventEmitter<Idea>();

  @ContentChild('classic1') classic1: TemplateRef<ElementRef>;

  constructor(private uiService:UIService,private share_ideaService:ShareIdeaService , private formBuilder:FormBuilder, private globalService:GlobalService) {
    
  }

 ngOnInit() {
   this.share_ideaService.getFocuses().subscribe(
     (data) =>
     {
       var arry = [];
       arry = data;
       for(var i=0; i<arry.length;i++)
       {
         this.focuses .push(
           {
             name: arry[i]
           }
         )
       }
       this.createForm();
     }
     
   );
 }
  
 private createForm()
 {
   if(this.idea !=null)
   {
    this.ideaForm = new FormGroup(
      {
        title: new FormControl(this.idea.title,
          [
            Validators.required
          ]), 
          description: new FormControl(this.idea.description,
            [
              Validators.required
            ]),
          categories: this.renderCategories(this.focuses)
      }
    );
   }

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
        categories: this.renderCategories(this.focuses)
    }
  );

 }

 shareIdea()
 {
   var focuses:Focus[] = this.populateCategories();
   
   var ideaCreated:Idea;

   if(this.idea !=null)
   {
     this.idea.description = this.ideaForm.get("description").value;
     this.idea.title = this.ideaForm.get("title").value;
     this.idea.focuses = focuses;
    ideaCreated = this.idea;
   }
   else{
      ideaCreated = new Idea(null,this.ideaForm.get("description").value,null,focuses,null,null,null,null,this.ideaForm.get("title").value,null);
   }
   this.idea_event.emit(ideaCreated);
   this.cancel();
  
  
 }
 populateCategories(): Focus[] {
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

 open()
 {
   console.log(this.classic1)
   document.getElementById("openModalButton").click();
 }
 openModal( content, type, dem){
  this.uiService.open(content, type, dem);
 }

 nextInput(next:boolean)
 {
   switch (next) {
     case true:
       this.ideaFormSelection++;
       break;
     case false:
         this.ideaFormSelection--;
       break;
   }
    
 }
 private renderCategories(categories)
 { 
   const arry = categories.map(
     category =>
     {
       return this.formBuilder.control(null);
     }
   );
   return this.formBuilder.control(arry);
 }
 get categories() {
   return this.ideaForm.get('categories');
 };

 cancel()
 {
  
  this.ideaForm.reset();
  this.createForm();
  this.uiService.dismissAll();
 }

}
