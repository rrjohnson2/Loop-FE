import { Component, OnInit, Input, Output, EventEmitter,OnChanges } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { Idea } from 'src/app/models/idea';
@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.css']
})
export class LayoutNavbarComponent implements OnInit {

  @Input() public profile:Profile;
  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();
  @Output() idea_event: EventEmitter<Idea> = new EventEmitter<Idea>();

  constructor()
  {

  }

  ngOnInit(): void {
  }

  alert(alert:AlertTicket)
  {
      this.alert_ticket.emit(alert);
  }
  idea(ideA:Idea)
  {
    this.idea_event.emit(ideA);
    
  }

}
