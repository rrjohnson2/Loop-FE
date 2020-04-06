export class Preference {
     category:string;
     weight: number;
     id:number

    /**
     * Preference
     */
    constructor(
        category:string,
        weight:number,
        id:number
    ){
        this.category=category;
        this.weight=weight;
        this.id=id;
    }
}
