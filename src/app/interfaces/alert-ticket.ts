import { Actions } from "../constants/app.constants";

export interface AlertTicket {
    msg:string,
    type:string,
    action_attempted:Actions
}
