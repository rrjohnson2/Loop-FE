import { Component, OnInit, Input } from '@angular/core';
import { image_server_url } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.sass']
})
export class TagComponent implements OnInit {

  @Input() profilePicture;
  @Input() time;
  @Input() tag;
  @Input() element_class= "col_fit_profile_pic"

  
  constructor() { }

  ngOnInit() {
  }

  get render_profile()
  {
    return image_server_url+"avatar?user="+this.profilePicture;
  }

}
