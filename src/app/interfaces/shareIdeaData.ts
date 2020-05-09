import { Focus } from "../models/focus";

export interface ShareIdeaData{
    title:string,
    description:string,
    focuses:Focus[],
    content:string,
    content_type:string
}