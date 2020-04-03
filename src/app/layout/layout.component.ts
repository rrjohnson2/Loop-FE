import { Component, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';
import { PROFILE, setPROFILE } from '../constants/app.constants';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  

  constructor(private layout:LayoutService) { }

  ngOnInit(){
       this.layout.setup();
  }
}