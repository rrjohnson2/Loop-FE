import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { Notice } from '../models/notice';
import { Idea } from '../models/idea';

export var backend_url = "http://localhost:8080/"


export enum Actions {
  logOff,
  login,
  signup,
  shareIdea
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