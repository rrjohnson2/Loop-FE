import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { LayoutService } from '../../layout.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  
  focuses =[]
  year = new Date().getFullYear();
  current =""
  @Output() ideaFilter: EventEmitter<string> = new EventEmitter<string>();
  constructor(private layout:LayoutService)
  {

  }
  ngOnInit(): void {
    this.layout.focus.subscribe(
      (data) =>
      {
        var arry = [];
        arry = data;
        for(var i=0; i<arry.length;i++)
        {
          this.focuses .push(
            {
              name: arry[i],
              src : `assets/loop_icons/${arry[i]}.png`
            }
          )
        }
      }
      
    );
  }
  
  filterIdea(filter:string)
  {
    if(this.current == filter) this.current=""
    else this.current = filter;
    this.ideaFilter.emit(filter)
  }

 
}

