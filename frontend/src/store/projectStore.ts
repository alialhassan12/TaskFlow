import {create} from "zustand";
import type { Project } from "../@types/project";
import axiosInstance from "../lib/axios";

interface ProjectStore{
    projects:Project[];
    getUserProjects:(userId:string|number)=>Promise<void>;
    isGettingUserProjects:boolean;

    createProject:(userId:string|number,title:string,description:string,startDate:string,endDate:string,)=>Promise<void>;
    isCreatingProject:boolean;
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
        } catch (error) {
            console.log(error);
        }finally{
            set({isCreatingProject:false});
        }
    }
}))