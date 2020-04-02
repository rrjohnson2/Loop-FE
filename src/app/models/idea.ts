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
        upVotes: number
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

    }
}
