import { Component, OnInit, Input } from '@angular/core';
import { PillType } from 'src/app/constants/app.constants';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.sass']
})
export class PillComponent implements OnInit {

  @Input() user:string;
  @Input() picture:string;
  @Input() content:string;
  @Input() timestamp:Date;

  @Input() id:number;
  @Input() type:PillType;

  writeable: boolean=false;
  pillForm:FormGroup;
  constructor() { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.pillForm = new FormGroup(
      {
        contentVal: new FormControl(this.content,
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

  }
  edit(){

  }
  toggleDropDown(myDrop:NgbDropdown)
  {
    myDrop.toggle();
  }
  submit()
  {

  }

}
