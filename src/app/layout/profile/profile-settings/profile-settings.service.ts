import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backend_url } from 'src/app/constants/app.constants';
import { Ticket } from 'src/app/interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {
  

  constructor(private http:HttpClient) { }

  updatePreference(ticket:Ticket) {
    return this.http.post(backend_url+"update",ticket);
  }
}
