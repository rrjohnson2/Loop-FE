import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-badge',
  templateUrl: './message-badge.component.html',
  styleUrls: ['./message-badge.component.sass']
})
export class MessageBadgeComponent implements OnInit {

  @Input() content;
  @Input() tag;
  @Input() time;
  constructor() { }

  ngOnInit() {
  }

}
