import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Notice } from '../models/notice';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  notice:Notice[] = [];
  noticfications:BehaviorSubject<Notice[]> = new BehaviorSubject<Notice[]>(this.notice);

  constructor(private socket:Socket) {
    
    this.socket.on("notice",(data)=>{
        this.addNotice(data);
    });
   }

   joinRealTimeServer()
   {
     this.socket.emit("join",localStorage.getItem("username"));
   }
    addNotice(data)
   {
    this.notice.push(new Notice(data));
    this.noticfications.next(this.notice);
   }
   

}
