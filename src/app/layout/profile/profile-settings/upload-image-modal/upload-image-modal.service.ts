import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { image_server_url } from 'src/app/constants/app.constants';
@Injectable({
  providedIn: 'root'
})
export class UploadImageModalService {

  

  constructor(private http:HttpClient) { }

  upload(image) {
    const formData = new FormData()
    formData.append('avatar',image);
    console.log(formData)
    return this.http.post(image_server_url +"upload_profile_picture",formData);
  }
}
