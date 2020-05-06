import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { image_server_url, backend_url } from 'src/app/constants/app.constants';
import { Ticket } from 'src/app/interfaces/ticket';
import { UIService } from 'src/app/services/ui.service';
@Injectable({
  providedIn: 'root'
})
export class UploadImageModalService {
  

  

  constructor(private http:HttpClient,private uiserve:UIService) { }

  upload(image) {
    const formData = new FormData()
    formData.append('avatar',image);
    return this.http.post(image_server_url +"upload_profile_picture",formData);
  }
  updatePicture(ticket:Ticket) {
    return this.http.post(backend_url+"update",ticket);
  }
  
}
