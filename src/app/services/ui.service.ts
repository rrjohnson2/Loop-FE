import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { log, here, date_to_file_regex } from '../constants/app.constants';
declare var jQuery: any;

@Injectable({
  providedIn: 'root'
})
export class UIService {
  
  
  
  


  private closeResult:string;

  
  
  constructor(private modalService:NgbModal, private  formBuilder:FormBuilder) { 
    
  }

  // tabs_new_lines(value: string) {
  //   var res = "";

  //   if(value)
  //   {
  //     res = value.split('\\n').join('\n');
  //     // res = res.split('\\t').join('\t');
  //   }

  //   return res
  // }

  // addTabs_newlines(value: any): string {
  //   var res ='';
    
   
  //   if(value)
  //   {
  //     res = value.split('\n').join('\\n');
  //     // res = res.split('\t').join('\\t');
  //   }


  //   return res ;
  // }

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

  auto_size_text_area()
  {
    // auto hieght for ttextareas
  (function ($) {
      $('.textarea').each(function () {
        }).on('input', function () {
          this.style.height = 'auto';
          this.style.height = (this.scrollHeight) + 'px';
        });
      $('.textarea').each(function () {
      }).on("blur",function () {
        this.style.height = 'auto';
      });
      $('.textarea').each(function () {
      }).on("focus",function () {
          this.style.height = 'auto';
          this.style.height = (this.scrollHeight) + 'px';
      });
      // $('.textarea').one("keydown",function(e){
      //   if(e.keyCode==9 || e.which==9){
      //     e.preventDefault();
      //     console.log(this.val)
      //     var s = this.selectionStart;
      //     this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
      //     this.selectionEnd = s+1; 
      // }
      // });
      
    })(jQuery);

  }
  loop_upload_button()
  {
    
   const inputs =  document.getElementsByClassName("loop_target_input");
   const buttons =  document.getElementsByClassName("loop_button_upload");
   

  if(buttons.length == inputs.length)
  {
    var pairs = [];

    for(var i =0; i< buttons.length;i++)
    {
      pairs.push(
       { 
         button:buttons[i],
         input: inputs[i],
        }
      )
    }

    pairs.forEach(pair =>{
      pair.button.addEventListener('click',function () {
        var ele = pair.input as HTMLElement;
        ele.click();
      })
    })
  }
   
  
  }

 dataURItoBlob(dataURI, mod = 0) {
    const byteString = window.atob(dataURI.split(',')[mod]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
    return blob;
  }

  encode_file(username: string, extension: string): string {
    var res:string = `${username}${new Date()}`
    res  = res.replace(date_to_file_regex,``) +`.${extension}`;
    return res ;
  }

  container_or_fluid(hidden_sm: boolean) {

    if(hidden_sm) return "container-fluid"
    return "container"
  }
}
