import { Component, OnInit, Input } from '@angular/core';
import { here } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-bit-content',
  templateUrl: './bit-content.component.html',
  styleUrls: ['./bit-content.component.sass']
})
export class BitContentComponent implements OnInit {

   bit:File;
   private reader:FileReader;  
   src;

  constructor() { }

  ngOnInit() {
   this.init(null);
  }
  init(bit)
  {
    this.bit = bit
    this.src= null;
    this.reader = new FileReader();
    this.reader.onload = (e) => {
      this.src = this.reader.result;
  }

  }

  render_type(type:string)
  {
    
    this.render_src();
    if(type.match("image")) return 'image';
    else if(type.match("video")) return 'video';
    else if(type.match("audio")) return 'audio';

  }
  private render_src()
  { 
    here();
    if(this.bit && this.reader.readyState ==0)
    {
      this.reader.readAsDataURL(this.bit);
    }


  }

}
