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

  @Input() data:any
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
