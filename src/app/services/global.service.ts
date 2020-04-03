import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateMemberTicket } from '../interfaces/create-member-ticket';
import { Ticket } from '../interfaces/ticket';
import { Member } from '../models/member';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { AlertComponent } from '../shared/alerts/alert.component';
import { AlertTicket } from '../interfaces/alert-ticket';
import { FormGroup,  } from '@angular/forms';
import { Actions, backend_url } from '../constants/app.constants';
import { Idea } from '../models/idea';
import { Preference } from '../models/preference';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
 

  public ideas:Idea[];

  public all_idea_path = "getIdeas"

  public username: string;

  public profileSubject:BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);

  public ideas_behav:BehaviorSubject<Idea[]> = new BehaviorSubject<Idea[]>(null);
  votes: string ="VoteTypes";

  constructor(private http:HttpClient) { 
    this.username= localStorage.getItem("username");
  }

  /**
   * signUp
   */
  public signUp(ticket_member:CreateMemberTicket) {
     return this.http.post( backend_url + 'createMember', ticket_member);
  }

  public login(ticket:Ticket) {
    return this.http.post(backend_url + 'login', ticket);
 }
  public populateMember(data)
  {
    this.username = data.data.username;
    localStorage.setItem("username",this.username);
  }
  public populateProfile(data)
  {
    this.profileSubject.next(data.data);
    this.populateMember(data);
  }
  public getProfile()
  {
    return this.http.get(backend_url+"getProfile?username="+this.username);
  }
  
 
  public validateForm(form:FormGroup, alert_ticket:EventEmitter<AlertTicket>):boolean {
    if(form.invalid)
    {
      var name:string;

      // tslint:disable-next-line: forin
      for (const n in form.controls) {
        if (form.controls[n].invalid) {
            name=n;
            break;
        }
      }
      alert_ticket.emit({
        msg: name+" is Invalid",
        // tslint:disable-next-line: whitespace
        type:"danger",
        action_attempted: Actions.login
      });
      return false;
    }
    return true;
  }

  public updateProfile(updateTicket: Ticket)
  {
    return this.http.post(backend_url+"updateProfile",updateTicket);
  }

   public notify(notice: AlertComponent, alert_ticket:AlertTicket) {
    notice.add(alert_ticket);
    
  }
  public   flush() {
    this.profileSubject.next(null);
    this.username = null;
  }

  getIdeas(preferences:Preference[])
  {
     this.initIdeas(preferences).subscribe(
      data =>
      {
        this.ideas = data.data;
        this.refresh();
      }
     );
  }

  initIdeas(preferences:Preference[]):Observable<any>
  {
    return this.http.post(backend_url+this.all_idea_path,preferences);
  }

  addIdea(event:Idea)
  {
    this.ideas.push(event);
  }
  deleteRetort(retort_id, idea_id)
  {
    var idea :Idea = this.ideas.find( idea => idea.id == idea_id);

    var index = idea.retorts.findIndex(ret => ret.id == retort_id);

    idea.retorts.splice(index,1);

    this.refresh();
  }
  deleteComment(com_id, retort_id,idea_id )
  {
    var idea :Idea = this.ideas.find( idea => idea.id == idea_id);

    var retorts = idea.retorts;

    var retort = retorts.find(ret => ret.id == retort_id);

    var index = retort.messages.findIndex(com => com.id = com_id);
    retort.messages.splice(index,1);
     
    this.refresh();
  }
  refresh(){
    this.ideas_behav.next(this.ideas);
}
getVoteTypes() {
  return this.http.get(backend_url+this.votes);
}

addIdeaSubject(event:Idea)
  {
    this.addIdea(event);

    this.refresh();
  }
  
}
