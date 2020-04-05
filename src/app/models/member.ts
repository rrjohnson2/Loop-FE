export class Member {
    firstName: string;
    lastName: string;
    username: string;
    profilePicture:string;

    constructor(firstName:string,lastName:string,username:string, profilePicture:string)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.profilePicture = profilePicture;
    }
}
