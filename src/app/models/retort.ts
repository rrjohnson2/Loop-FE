import { Member } from "./member";
import { Message } from "./message";

export class Retort {
    content: string;
    creator: Member;
    id: number;
    messages: Message[]
    timestamp: Date

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

