export class Rating {
    id: number;
    vote: string;
    timestamp: Date;

    constructor(
        id: number,
        vote: string,
        timestamp: Date,
    ){
        this.id = id;
        this.vote = vote;
        this.timestamp = timestamp;
    }
}
