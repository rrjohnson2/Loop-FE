import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backend_url } from 'src/app/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(private http:HttpClient) { }

  trending()
  {
    return this,this.http.get(backend_url+"trending");
  }
}
