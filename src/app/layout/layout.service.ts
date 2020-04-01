import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preference } from 'src/app/models/preference';
import { backend_url } from 'src/app/constants/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  all_idea_path = "getIdeas"

  constructor(private httpClient:HttpClient) { }

  getIdeas(preferences:Preference[]):Observable<any>
  {
    return this.httpClient.post(backend_url+this.all_idea_path,preferences);
  }
}
