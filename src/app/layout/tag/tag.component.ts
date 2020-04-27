import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.sass']
})
export class TagComponent implements OnInit {

  @Input() profilePicture;
  constructor() { }

  ngOnInit() {
  }

  get render_profile()
  {
    return "http://localhost:8082/avatar?user="+this.profilePicture;
  }

}
