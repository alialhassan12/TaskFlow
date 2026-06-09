import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useAuthStore } from "../store/authStore";
import { useProjectStore } from "../store/projectStore";

interface projectDialogInterface{
    open:boolean;
    setOpen:(open:boolean)=>void
}

const CreateProjectDialog=({open,setOpen}:projectDialogInterface)=>{
    const {authUser}=useAuthStore();
    const {createProject}=useProjectStore();
    const [formData,setFormData]=useState<{
        userId:string|number,
        title:string,
        description:string,
        startDate:string,
        endDate:string,
    }>({
        userId:authUser!.id,
        title:"",
        description:"",
        startDate:"",
        endDate:"",
    });

    const handleCreate=async()=>{
        await createProject(formData.userId,formData.title,formData.description,formData.startDate,formData.endDate);
        setFormData({
            userId:authUser!.id,
            title:"",
            description:"",
            startDate:"",
            endDate:"",
        });
    }
    const handleCancel=()=>{
        setFormData({
            userId:authUser!.id,
            title:"",
            description:"",
            startDate:"",
            endDate:"",
        });
    }

    return(
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="bg-black text-white">
            <AlertDialogHeader>
                <AlertDialogTitle>Start a Fresh Workspace</AlertDialogTitle>
                <AlertDialogDescription>
                    Define your project parameters.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <Field>
                <FieldLabel className="uppercase text-gray-400/80">project title</FieldLabel>
                <Input
                    value={formData.title}
                    onChange={(e)=>setFormData({...formData,title:e.target.value})}
                    placeholder="eg. Engine"
                />
            </Field>
            <Field>
                <FieldLabel className="uppercase text-gray-400/80">project Description</FieldLabel>
                <Input
                    value={formData.description}
                    onChange={(e)=>setFormData({...formData,description:e.target.value})}
                    placeholder="What is this workspace for..."
                />
            </Field>
            <div className="flex items-center gap-2">
                <Field>
                    <FieldLabel className="uppercase text-gray-400/80"> Start Date</FieldLabel>
                    <Input
                        value={formData.startDate}
                        onChange={(e)=>setFormData({...formData,startDate:e.target.value})}
                        type="date"
                    />
                </Field>
                <Field>
                    <FieldLabel className="uppercase text-gray-400/80"> End Date</FieldLabel>
                    <Input
                        value={formData.endDate}
                        onChange={(e)=>setFormData({...formData,endDate:e.target.value})} 
                        type="date"
                    />
                </Field>
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel 
                    size={"10"} 
                    variant={"default"}
                    onClick={handleCancel}
                    className="p-2 bg-black hover:bg-black/90 cursor-pointer"
                >
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    size={"10"}
                    variant={"default"}
                    onClick={handleCreate}
                    className="p-2 bg-purple-500 hover:bg-purple-500/70 cursor-pointer"
                >
                    Create
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    );
}

export default CreateProjectDialog;