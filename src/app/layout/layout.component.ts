import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { LayoutService } from './layout.service';
import { PROFILE, setPROFILE, here, log } from '../constants/app.constants';
import { LandingComponent } from './landing/landing.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    child
  

  constructor(private layout:LayoutService) { }

  ngOnInit(){
       this.layout.setup();
  }
  logOff(event)
  {
    if(event)
      this.layout.out();
  }

  onActivate(event)
  {
    this.child = event;
  }
  public showNotice(notice)
  { 
    this.child.showNotice(notice);
  }

}