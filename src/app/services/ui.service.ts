import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { log, here } from '../constants/app.constants';
declare var jQuery: any;

@Injectable({
  providedIn: 'root'
})
export class UIService {


  private closeResult:string;

  resize_textarea = (function ($) {
    $('.Looop-textarea').each(function () {
      }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });
    $('.Looop-textarea').each(function () {
    }).on("blur",function () {
        this.style.height = (27) + 'px';
    });
    $('.Looop-textarea').each(function () {
    }).on("focus",function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
  })(jQuery);
  
  constructor(private modalService:NgbModal, private  formBuilder:FormBuilder) { }

  dismissAll() {
   this.modalService.dismissAll();
        }

  open(content, type, modalDimension) {
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

    el

    
    var pos = 0
    var ele_adjusted_top  = 0;
    var ancestor = el.parentElement;

    // this find the ideas_body id from where the idea is  soley dependet on html structure
    for (let index = 0; index < 4 ; index++) {
        ele_adjusted_top += ancestor.offsetTop;
        ancestor = ancestor.parentElement;
    }
    if(el !=null) pos = ele_adjusted_top;
    //if(pos >= parent.scrollHeight && pos !=0 ) pos = parent.scrollHeight;

    parent.scroll({
        top: pos,
        behavior: 'smooth'
    })
    
  }

  render(list): import("@angular/forms").AbstractControl {
    const array = list.map(item=> 
      {
          if(item.init !=null) return  this.formBuilder.control(item.init);
          return   this.formBuilder.control(null);
      });
      return this.formBuilder.control(array);
  }

}
