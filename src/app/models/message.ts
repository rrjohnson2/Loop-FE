import { Member } from "./member";

export class Message {
    content: string;
    creator: Member;
    timestamp: Date;
    id: number;

    constructor(
        content: string,
        creator: Member,
        timestamp: Date,
    ){
        this.content = content;
        this.creator = creator;
        this.timestamp = timestamp;
        this.id = this.id;
    }
}
