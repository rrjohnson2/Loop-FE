
import { Preference } from "./preference";
import { Idea } from "./idea";
import { Message } from "./message";
import { Retort } from "./retort";
import { Rating } from './rating';

export class Profile {
    created_ideas: Idea[] = [];
    ideas_retorted: Idea[] = [];
    ideas_messaged: Idea[] = [];
    ideas_rated:  Idea[] = [];
    created_messages: Message[] =[];
    created_retorts: Retort[] =[];
    created_ratings:Rating[] =[]; 
    email: string= '';
    firstName: string= '';
    lastName: string= '';
    preferences: Preference[]=[];
    username: string= '';
    profilePicture:string;

    constructor(
        created_ideas: Idea[],
        ideas_retorted: Idea[],
        ideas_messaged: Idea[],
        ideas_rated:Idea[],
        created_messages: Message[],
        created_retorts: Retort[],
        created_ratings:Rating[],
        email: string,
        firstName: string,
        lastName: string,
        preferences: Preference[],
        username: string,
        profilePicture:string
    )
    {
        this.created_ideas = created_ideas;
        this.created_messages = created_messages;
        this.created_retorts = created_retorts ;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.preferences = preferences;
        this.username = username;
        this.profilePicture = profilePicture;
        this.ideas_retorted = ideas_retorted;
        this.ideas_messaged= ideas_messaged;
        this.created_ratings = created_ratings;
        this.ideas_rated = ideas_rated;

    }
}
