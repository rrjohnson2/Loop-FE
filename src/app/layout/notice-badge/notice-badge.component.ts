import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notice-badge',
  templateUrl: './notice-badge.component.html',
  styleUrls: ['./notice-badge.component.sass']
})
export class NoticeBadgeComponent implements OnInit {

  @Input() profilePicture;
  @Input() username;
  @Input() time
  @Input() info;
  constructor() { }

  ngOnInit() {
  }

}
