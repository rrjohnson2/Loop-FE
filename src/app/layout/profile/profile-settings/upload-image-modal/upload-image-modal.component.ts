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
  imageChangedEvent: any = '';
  croppedImage: any = '';
  size:number = 180;
  message:string = ''
  loaded: boolean;
  @Input() profile:Profile; 
  image_file:File;
  uri: string;
  original_image: any;
  constructor(private uiService:UIService, private uploadService:UploadImageModalService) { }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    
  console.log(event);
    this.croppedImage = event.base64;
   
    this.image_file= new File(
      [this.dataURItoBlob(this.croppedImage)],
      this.profile.username +".png",
      {type:this.imageChangedEvent.target.files[0].type}
    )
    
  }
imageLoaded() {
  this.loaded = true; 
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    console.log("hee")
}
cancel()
{
  this.imageChangedEvent = '';
  this.croppedImage = '';
  this.message= ''
  this.loaded =false;
  this.image_file = null;
}

upload()
{
  if(this.loaded)
  {
    this.uploadService.upload(this.image_file).subscribe(
      data =>{this.profile.profilePicture = this.profile.username
      }
    );
  }
  else this.message = 'load the image please '
}
open() {
  
  this.uiService.open(this.modal, "modal-mini", 'sm');
}

private dataURItoBlob(dataURI) {
  const byteString = window.atob(dataURI.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array], { type: 'image/jpeg' });    
  return blob;
}

}
