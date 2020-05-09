import { Component, OnInit, Input } from '@angular/core';
import { here } from 'src/app/constants/app.constants';
import { log } from 'util';

@Component({
  selector: 'app-bit-content',
  templateUrl: './bit-content.component.html',
  styleUrls: ['./bit-content.component.sass']
})
export class BitContentComponent implements OnInit {

   @Input()type;
   @Input()src;

  constructor() { }

  ngOnInit() {
  }
  init(bit)
  {
    if(bit ==null)
    {
      this.src = null;
      this.type= null;
    }
    this.type = bit.type;
    this.src= URL.createObjectURL(bit);

  }

  render_type(type:string)
  {
    if(type.match("image")) return 'image';
    else if(type.match("video")) return 'video';
    else if(type.match("audio")) return 'audio';

  }

}
