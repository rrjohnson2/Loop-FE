import { Injectable } from '@angular/core';
import { backend_url } from 'src/app/constants/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class ShareIdeaService {


  constructor( private httpClient:HttpClient) { }

  getFocuses():Observable<any>
  {
    return this.httpClient.get(backend_url + "getCategories");
  }
  shareIdea(shareIdeaTicket: Ticket) {
    return this.httpClient.post(backend_url+"createIdea",shareIdeaTicket);
  }
}
