import { Timestamp } from "@angular/fire/firestore";

export interface Usuario 
{
    uid?:string,
    email?:any,
    mensaje?:string,
    hora?:Timestamp,
    fehca?:Date
}
