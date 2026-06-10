import {create} from "zustand";
import type { Task } from "../@types/task";
import axiosInstance from "../lib/axios";
import { toast } from "sonner";

interface TaskState{
    tasks:Task[];

    getTasks:(projectId:string|number)=>Promise<void>;

    setTaskCompleted:(taskId:number|string)=>Promise<void>;
    setTaskInCompleted:(taskId:number|string)=>Promise<void>;
}

export const useTaskStore=create<TaskState>((set)=>({
    tasks:[],

    getTasks:async(projectId:string|number)=>{
        try{
            const response=await axiosInstance.get(`/tasks/get/${projectId}`);
            set({tasks:response.data.data});
        }catch(error){
            console.log(error);
        }
    },

    setTaskCompleted:async(taskId:number|string)=>{
        try{
            const response=await axiosInstance.post('/tasks/mark-completed',taskId);
            set((state)=>({
                tasks:state.tasks.map((task)=>{
                    if(task.id === taskId){
                        task.isCompleted=true;
                        return task;
                    }
                    return task;
                })
            }));
            toast.success(response.data.message);
        }catch(error){
            console.log(error);
        }
    },
    setTaskInCompleted:async(taskId:number|string)=>{
        try{
            const response=await axiosInstance.post('/tasks/mark-incompleted',taskId);
            set((state)=>({
                tasks:state.tasks.map((task)=>{
                    if(task.id === taskId){
                        task.isCompleted=false;
                        return task;
                    }
                    return task;
                })
            }));
            toast.success(response.data.message);
        }catch(error){
            console.log(error);
        }
    }
}));