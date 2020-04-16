import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/app/interfaces/ticket';
import { backend_url } from 'src/app/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UpdateServiceService {

  constructor(private htttp: HttpClient) { }

  update(ticket:Ticket)
  {
    return this,this.htttp.post(backend_url+"update",ticket);
  }
}
