import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { UIService } from 'src/app/services/ui.service';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { UploadImageModalService } from './upload-image-modal.service';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-modal.component.html',
  styleUrls: ['./upload-image-modal.component.sass']
})
export class UploadImageModalComponent implements OnInit {
  @Output() alert_ticket: EventEmitter<AlertTicket> = new EventEmitter<AlertTicket>();
  @ViewChild('classic1') modal:ElementRef;
  @ViewChild('cropper') imageCropper:ImageCropperComponent
  imageChangedEvent: any = '';
  croppedImage: any = '';
  size:number = 180;
  message:string = ''
  loaded: boolean;
  @Input() profile:Profile; 
  img:File;
  constructor(private uiService:UIService, private uploadService:UploadImageModalService) { }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}
imageLoaded() {
    
  this.img = new File([this.croppedImage], `${this.profile.username}.png`);
  this.loaded = true; 
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}
cancel()
{
  this.imageChangedEvent = '';
  this.croppedImage = '';
  this.message= ''
  this.loaded =false;
}

upload()
{
  if(this.loaded)
  {
    this.uploadService.upload(this.img).subscribe(
      data =>{
          console.log(data);
      }
    );
  }
  else this.message = 'load the image please '
}
open() {
  
  this.uiService.open(this.modal, "modal-mini", 'sm');
}

}
