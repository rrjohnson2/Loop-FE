export class Preference {
    private category:string;
    private weight: number;
    private id:number

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
