import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/app/interfaces/ticket';
import { backend_url } from 'src/app/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class IdeaCardService {
  

  retort_url ="retortIdea"
  vote_url ="rateIdea"
  constructor(private httpClient:HttpClient) { }

  retort(ticket:Ticket)
  {
    return this.httpClient.post(backend_url+this.retort_url,ticket);
  }
  vote(ticket: Ticket) {
    return this.httpClient.post(backend_url+this.vote_url,ticket);
  }
}
