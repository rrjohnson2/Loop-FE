import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { backend_url } from 'src/app/constants/app.constants';
import { Ticket } from 'src/app/interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class PillService {
  private udpateRetort = "updateRetort";
  private deleteRetort = "deleteRetort";

  private updateMessage = "updateMessage";
  private deletemessage = "deleteMessage";

  constructor(private httpClient:HttpClient) { }

  private updateOrDelete(data:any,path:string):Observable<any>
  {
    return this.httpClient.post(backend_url+path,data);

  }

  upRetort(data)
  {
    return this.updateOrDelete(data,this.udpateRetort);
  }
  delRetort(data)
  {
    return this.updateOrDelete(data,this.deleteRetort);
  }

  upMessage(data)
  {
    return this.updateOrDelete(data,this.updateMessage);
  }
  delMessage(data)
  {
    return this.updateOrDelete(data,this.deletemessage);
  }




}
