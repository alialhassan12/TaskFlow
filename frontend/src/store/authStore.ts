import {create} from "zustand";
import axiosInstance from "../lib/axios";
import type {User} from "../@types/user.ts";
import { toast } from "sonner";

interface AuthState {
    authUser:User |null,
    setAuthUser:(user:User)=>void,

    login:({Email,Password}: {Email:string,Password:string})=>Promise<boolean>,
    isloggingIn:boolean,

    isRegistering:boolean;
    register:({Name,Email,Password}:{Name:string,Email:string,Password:string})=>Promise<boolean>;
}

export const useAuthStore=create<AuthState>((set)=>({
    authUser:null,
    setAuthUser:(user:User)=>set({authUser:user}),

    isloggingIn:false,
    login:async({Email,Password})=>{
        set({isloggingIn:true});
        try{
            const response=await axiosInstance.post("/login",{Email,Password});
            localStorage.setItem("token",response.data.token);
            console.log(response.data);
            set({authUser:response.data.user});

            return true;
        }catch(error:unknown){
            console.error("Login failed",error);
            toast.error("Login failed. Please check your credentials and try again.");
            return false;
        }finally{
            set({isloggingIn:false});
        }
    },

    isRegistering:false,
    register:async({Name,Email,Password})=>{
        set({isRegistering:true});
        try{
            const response=await axiosInstance.post("/register",{Name,Email,Password});
            localStorage.setItem("token",response.data.token);
            set({authUser:response.data.user});
            return true;
        }catch(error:unknown){
            console.log(error);
            toast.error("Faild to register");
            return false;
        }finally{
            set({isRegistering:false});
        }
    }

}))