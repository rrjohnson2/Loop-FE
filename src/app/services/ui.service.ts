import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class UIService {


  private closeResult:string;
  
  constructor(private modalService:NgbModal) { }

  dismissAll() {
   this.modalService.dismissAll();
        }

  open(content, type, modalDimension) {
      console.log(content);
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}

bringInView(child_id,parent_id) {
    const el: HTMLElement|null = document.getElementById(child_id);
    const parent: HTMLElement|null = document.getElementById(parent_id);
    var pos = 0
    if(el !=null) pos =el.offsetTop;
    if(pos >= parent.scrollHeight && pos !=0 ) pos = parent.scrollHeight;
    parent.scroll({
        top: pos,
        left: 0,
        behavior: 'smooth'
    })
    
  }

}
