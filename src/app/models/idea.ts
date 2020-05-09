import { Member } from "./member";
import { Retort } from "./retort";
import { Focus } from "./focus";
import { Rating } from "./rating";

export class Idea {
    creator: Member;
    description: string;
    downVotes: number;
    focuses: Focus[];
    id: number;
    ratings: Rating[];
    retorts: Retort[];
    timestamp: Date;
    title: string;
    upVotes: number;
    content:string;
    content_type:string;
   
    constructor(
        creator: Member,
        description: string,
        downVotes: number,
        focuses: Focus[],
        id: number,
        ratings: Rating[],
        retorts: Retort[],
        timestamp: Date,
        title: string,
        upVotes: number,
        content:string,
        content_type:string
    ){
        this.creator = creator;
        this.description = description;
        this.downVotes =  downVotes;
        this.focuses = focuses ;
        this.id = id;
        this.ratings = ratings;
        this.retorts = retorts;
        this.timestamp = timestamp;
        this.title = title;
        this.upVotes =upVotes;
        this.content = content;
        this.content_type = content_type;

    }
}
