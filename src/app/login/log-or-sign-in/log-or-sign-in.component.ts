import { Component, OnInit, ViewChild } from '@angular/core';
import { log } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-log-or-sign-in',
  templateUrl: './log-or-sign-in.component.html',
  styleUrls: ['./log-or-sign-in.component.sass']
})
export class LogOrSignInComponent implements OnInit {

  choice:string ="Login"
  constructor() { }

  ngOnInit() {
  }

  toggle(event){
      if(event.checked) this.choice= "Sign Up"
      else this.choice ="Login"
  }

}
