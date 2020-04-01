import { Preference } from "./preference";
import { Idea } from "./idea";
import { Message } from "./message";
import { Retort } from "./retort";

export class Profile {
    created_ideas: Idea[] = [];
    created_messages: Message[] =[];
    created_retorts: Retort[] =[]; 
    email: string= '';
    firstName: string= '';
    lastName: string= '';
    preferences: Preference[]=[];
    username: string= '';

    constructor(
        created_ideas: Idea[],
        created_messages: Message[],
        created_retorts: Retort[],
        email: string,
        firstName: string,
        lastName: string,
        preferences: Preference[],
        username: string
    )
    {
        this.created_ideas = created_ideas;
        this.created_messages = created_messages
        this.created_retorts = created_retorts 
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.preferences = preferences
        this.username = username

    }
}
