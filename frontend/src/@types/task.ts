export interface Task{
    id:string|number;
    projectId:string|number;
    title:string;
    description:string;
    dueDate:string;
    isCompleted:boolean;
}