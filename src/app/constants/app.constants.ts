import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { Notice } from '../models/notice';
import { Idea } from '../models/idea';

export var backend_url = "https://app-loop-backend.herokuapp.com/"
export var image_server_url = "https://app-loop-content-server.herokuapp.com/"

export enum Actions {
  logOff,
  login,
  signup,
  shareIdea,
  update
}

export enum PillType{
  rertort,
  comment, 
  idea
}

export var PROFILE:Profile;
export var NOTIFICATIONS:Notice[];
export var IDEAS:Idea[];

export function setPROFILE(data)
{
    PROFILE = data;
}

export function log(whatever) {
  console.log(whatever);
}

export function here() {
  console.log("here");
}
export var date_to_file_regex  = /(\.|\-|\s|:|\(|\))/gm;

export var isSmallScreen:boolean = window.screen.width < 992;