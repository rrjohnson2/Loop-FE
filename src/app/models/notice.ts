import { Member } from './member';

export class Notice {
    username:string;
    creator_profilePicture:string
    creator_username:string
    action:Notice_Actions
    data:any
    idea_id: number;
    retort_id: number;
    checked:boolean = false;

    constructor(data)
    {
        this.action = data.action;
        this.data = data.data;
        this.username = data.username;
        this.idea_id = data.idea_id
        this.retort_id = data.retort_id;
        this.checked = false;
        this.creator_profilePicture = data.creator_profilePicture;
        this.creator_username = data.creator_username;
    }

}

export enum Notice_Actions {
  FOCUS = "FOCUS",
  RETORT = "RETORT",
  COMMENT = "COMMENT",
  RATING = "RATING"
}
