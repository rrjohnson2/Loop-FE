import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  
  
  @Output() ideaFilter: EventEmitter<string> = new EventEmitter<string>();
  constructor()
  {

  }
  ngOnInit(): void {
   
  }
  
  filterIdea(filter:string)
  {
    this.ideaFilter.emit(filter)
  }

 
}

