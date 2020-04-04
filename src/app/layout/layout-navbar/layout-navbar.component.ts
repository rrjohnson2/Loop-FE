import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../layout.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { RealtimeService } from 'src/app/services/realtime.service';
@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.css']
})
export class LayoutNavbarComponent implements OnInit {

 profile:Profile;

  constructor(private layout:LayoutService, 
    private router:Router,
    private global:GlobalService,
    private realTime: RealtimeService)
  {}

  ngOnInit(): void {
    this.layout.profile.subscribe(
      data =>{
        this.profile = data;
      }
    )
  }

  logOff()
  {
    this.global.logOff();
    this.realTime.logOff();
    this.router.navigate(['/login']);
  }
  
   toggleDropDown(myDrop:NgbDropdown)
  {
    myDrop.toggle();
  }

}
