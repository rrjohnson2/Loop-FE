import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { Idea } from 'src/app/models/idea';
import { log } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-profile-activities',
  templateUrl: './profile-activities.component.html',
  styleUrls: ['./profile-activities.component.sass']
})
export class ProfileActivitiesComponent implements OnInit {

  @Input() profile:Profile;
  ideas:Idea[] = [];

  possible_activities =['ideas','retorts','messages','ratings'];

  current:string ;

  constructor() { }

  ngOnInit() {
  }

  filterActivities(pos){
    if(this.current == pos) return;
    this.current = pos;
    var temp = [];
    switch (pos) {
      case this.possible_activities[0]:
         temp = this.profile.created_ideas;
        break;
    case this.possible_activities[1]:
        temp = this.profile.ideas_retorted;
      break;
    case this.possible_activities[2]:
        temp = this.profile.ideas_messaged;
        break;
    case this.possible_activities[3]:
      temp = this.profile.ideas_rated;
    }
    this.ideas = temp;
    
  }

  get Ideas()
  {
    return    this.ideas.sort((val1, val2)=> 
    {return new Date(val2.timestamp).getTime() - new Date(val1.timestamp).getTime()});
  }

}
