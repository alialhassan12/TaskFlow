import type { Task } from "./task";
import type { User } from "./user";

export interface Project{
    id:string | number;
    userId:string|number;
    projectTitle:string;
    description:string;
    startDate:Date;
    endDate:Date;
    user?:User;
    tasks:Task[];
}