import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backend_url, here,log } from 'src/app/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  

  constructor(private http:HttpClient) { }

  removeNotice(notice){
    log(notice);
    return this.http.post(backend_url+"removeNotice",notice);
  }
}
