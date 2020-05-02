import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { PillType, log, here } from 'src/app/constants/app.constants';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Ticket } from 'src/app/interfaces/ticket';
import { PillService } from './pill.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.sass']
})
export class PillComponent implements OnInit {

  @Input() data:any
  @Input() type:PillType;
  @Input() username: string;

  @Input( ) idea_id;
  @Input() retort_id;

  @Output() expan: EventEmitter<boolean> = new EventEmitter<boolean>();


  writeable: boolean=false;
  pillForm:FormGroup;
  constructor(private pillService:PillService, private globalService:GlobalService, private uiServe:UIService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.pillForm = new FormGroup(
      {
        contentVal: new FormControl(this.data.content,
          [
            Validators.required
          ])
      });
  }

  showEdit()
  {
    this.writeable = !this.writeable;
    this.uiServe.init();
  }
  delete()
  {
    
    var ticket:Ticket = {
      customer:this.username,
      data: this.data
    }
    switch (this.type) {
      case PillType.comment:
        this.pillService.delMessage(ticket).subscribe(
          data =>
          {
            this.globalService.deleteComment(data.id,this.retort_id,this.idea_id);
          }
        );
        break;
      case PillType.rertort:
        this.pillService.delRetort(ticket).subscribe(
          data =>
          {
            this.globalService.deleteRetort(data.id,this.idea_id);
          }
        );
        break;
    }
  }
  toggleDropDown(myDrop:NgbDropdown)
  {
    myDrop.toggle();
  }
  submit()
  {
    var temp = this.data;
    temp.content = this.pillForm.get("contentVal").value;
    var ticket:Ticket = {
      customer:this.username,
      data: temp
    }

    switch (this.type) {
      case PillType.comment:
        this.pillService.upMessage(ticket).subscribe(
          data =>
          {
            this.data.content = temp.content;
            this.showEdit();
          }
        );
        break;
      case PillType.rertort:
        this.pillService.upRetort(ticket).subscribe(
          data =>
          {
            this.data.content = temp.content;
            this.showEdit();
          }
        );
        break;
    }

  }
  expand()
  {
    this.expan.emit(true);
  }

}
