import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrendingService } from './trending.service';
import { Idea } from 'src/app/models/idea';
import { here, log } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  trending:Idea[] =[]
  ideas:Idea[] =[];
  @Output() idea_event: EventEmitter<Idea> = new EventEmitter<Idea>();
  constructor(private trendingServ:TrendingService) { }

  ngOnInit() {
    this.trendingServ.trending().subscribe(data => this.trending = <Idea[]> data);
  }

  showIdea(idea:Idea)
  {
     
      var index = this.ideas.findIndex(item => item.id == idea.id);

      if(index < 0) this.ideas.push(idea);

      this.idea_event.emit(idea);
  }


}
