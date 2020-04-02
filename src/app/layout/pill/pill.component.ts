import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { PillType } from 'src/app/constants/app.constants';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Ticket } from 'src/app/interfaces/ticket';
import { PillService } from './pill.service';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.sass']
})
export class PillComponent implements OnInit {

  @Input() data:any
  @Input() type:PillType;
  @Input() username: string;

  writeable: boolean=false;
  pillForm:FormGroup;
  constructor(private pillService:PillService, private host: ElementRef<HTMLElement>) { }

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
    console.log(this.writeable);
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
            this.data = null;
            this.host.nativeElement.remove();
          }
        );
        break;
      case PillType.rertort:
        this.pillService.delRetort(ticket).subscribe(
          data =>
          {
            this.data = null;
            this.host.nativeElement.remove();
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

          }
        );
        break;
      case PillType.rertort:
        this.pillService.upRetort(ticket).subscribe(
          data =>
          {
            this.data.content = temp.content;

          }
        );
        break;
    }

  }

}
