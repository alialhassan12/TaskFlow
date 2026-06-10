import {create} from "zustand";
import type { Project } from "../@types/project";
import axiosInstance from "../lib/axios";
import { toast } from "sonner";

interface ProjectStore{
    projects:Project[];
    getUserProjects:(userId:string|number)=>Promise<void>;
    isGettingUserProjects:boolean;

    project:Project|null;
    isGettingProject:boolean;
    getProject:(userId:string|number,projectId:string|number)=>Promise<void>;

    createProject:(userId:string|number,title:string,description:string,startDate:string,endDate:string,)=>Promise<void>;
    isCreatingProject:boolean;

    isDeletingProject:boolean;
    deleteProject:(userId:string|number,projectId:string|number)=>Promise<void>;
}

export const useProjectStore=create<ProjectStore>((set,get)=>({
    projects:[],

    isGettingUserProjects:false,
    getUserProjects:async(userId:string|number)=>{
        set({isGettingUserProjects:true});
        try{
            const response=await axiosInstance.get(`/projects/my-projects/${userId}`);
            console.log(response.data);
            set({projects:response.data.data})
        }catch(error){
            console.log(error);
        }finally{
            set({isGettingUserProjects:false});
        }
    },

    project:null,
    isGettingProject:false,
    getProject:async(userId:string|number,projectId:string|number)=>{
        set({isGettingProject:false});
        try {
            const response=await axiosInstance.get(`/projects/${userId}/${projectId}`);
            set({project:response.data.data});
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }finally{
            set({isGettingProject:true});
        }
    },

    isCreatingProject:false,
    createProject:async(userId:string|number,title:string,description:string,startDate:string,endDate:string)=>{
        set({isCreatingProject:true});
        try {
            const response=await axiosInstance.post('/projects/create',{
                UserId:userId,
                ProjectTitle:title,
                Description:description,
                StartDate:new Date(startDate),
                EndDate:new Date(endDate)
            });
            set({projects:[...get().projects,response.data.data]});
            toast.success(response?.data?.message);
        } catch (error) {
            console.log(error);
        }finally{
            set({isCreatingProject:false});
        }
    },

    isDeletingProject:false,
    deleteProject:async(userId:number|string,projectId:number|string)=>{
        set({isDeletingProject:true});
        try{
            const response=await axiosInstance.delete(`/projects/delete/${projectId}/${userId}`);
            set((state)=>({
                projects: state.projects.filter((proj)=>proj.id!==projectId)
            }));
            toast.success(response?.data?.message);
        }catch(error){
            console.log(error);
        }finally{
            set({isDeletingProject:false});
        }
    }
}))