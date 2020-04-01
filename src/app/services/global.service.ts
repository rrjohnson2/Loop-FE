import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateMemberTicket } from '../interfaces/create-member-ticket';
import { Ticket } from '../interfaces/ticket';
import { Member } from '../models/member';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../models/profile';
import { AlertComponent } from '../shared/alerts/alert.component';
import { AlertTicket } from '../interfaces/alert-ticket';
import { FormGroup,  } from '@angular/forms';
import { Actions, backend_url } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {




  public username: string;

  public profileSubject:BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);

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
}
