import { Injectable } from '@angular/core';
import { Ticket } from 'src/app/interfaces/ticket';
import { HttpClient } from '@angular/common/http';
import { backend_url } from 'src/app/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class RetortCardService {
  retort_route ="commentRetort"
  constructor(private httpClient:HttpClient) { }

  message(ticket:Ticket)
  {
    return this.httpClient.post(backend_url+this.retort_route,ticket);
  }
}
