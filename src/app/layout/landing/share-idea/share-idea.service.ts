import { Injectable } from '@angular/core';
import { backend_url, image_server_url } from 'src/app/constants/app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/interfaces/ticket';
import { Focus } from 'src/app/models/focus';

@Injectable({
  providedIn: 'root'
})
export class ShareIdeaService {

 

  constructor( private httpClient:HttpClient) {
    
   }
  shareIdea(shareIdeaTicket: Ticket) {
    return this.httpClient.post(backend_url+"createIdea",shareIdeaTicket);
  }

  upload_content(file) {
    const formData = new FormData();
    formData.append('content',file);
    return this.httpClient.post(image_server_url +"upload_content",formData);
  }
}
