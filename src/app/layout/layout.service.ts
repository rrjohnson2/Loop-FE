import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preference } from 'src/app/models/preference';
import { backend_url } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private httpClient:HttpClient) { }

}
