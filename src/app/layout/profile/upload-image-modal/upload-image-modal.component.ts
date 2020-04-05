import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-modal.component.html',
  styleUrls: ['./upload-image-modal.component.sass']
})
export class UploadImageModalComponent implements OnInit {
  

  imageChangedEvent: any = '';
  croppedImage: any = '';
  @ViewChild('classic1') modal:ElementRef;
  @ViewChild('cropper') imageCropper:ImageCropperComponent
  size:number = 180;
  constructor(private uiService:UIService) { }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}
imageLoaded() {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}

open() {
  
  this.uiService.open(this.modal, "modal-mini", 'sm');
}

}
