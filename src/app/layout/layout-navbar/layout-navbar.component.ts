import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { PROFILE } from 'src/app/constants/app.constants';
import { LayoutService } from '../layout.service';
@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.css']
})
export class LayoutNavbarComponent implements OnInit {

 profile:Profile;

  constructor(private layout:LayoutService)
  {
  }

  ngOnInit(): void {
   
    this.layout.profile.subscribe(
      data =>{
        this.profile = data;
      }
    )
  }

  
  public toggleDropDown(myDrop:NgbDropdown)
  {
    myDrop.toggle();
  }

}
