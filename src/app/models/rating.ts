export class Rating {
    id: number;
    vote: string;

    constructor(
        id: number,
        vote: string
    ){
        this.id = id;
        this.vote = vote;
    }
}
