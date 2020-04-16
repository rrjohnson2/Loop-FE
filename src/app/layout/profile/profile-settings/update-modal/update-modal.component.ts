import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/profile';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.sass']
})
export class UpdateModalComponent implements OnInit  {

  updateForm: FormGroup;
  @Input()  profile:Profile 
  reason:string ="USERNAME";
  @ViewChild('classic1') modal:ElementRef;
  constructor(private uiService:UIService) { }

  

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.updateForm = new FormGroup({
      old_password: new FormControl(null,[]),
      confirmed: new FormControl(null,[]),
      target: new FormControl(null,[Validators.required])
    });
  }

  submit(){
    
  }

  open() {
    this.uiService.open(this.modal, "modal-mini", 'sm');
  }

}
