import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/message';
import { PillType } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent implements OnInit {
  @Input() message:Message;
  @Input() username:string;
  type:PillType = PillType.comment;
  constructor() { }

  ngOnInit() {
  }

}
