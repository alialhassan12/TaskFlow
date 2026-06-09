import { ArrowRight, CheckCircle, Circle, EllipsisVertical, Plus, Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useAuthStore } from "../../store/authStore";
import { useProjectStore } from "../../store/projectStore";
import { useEffect, useState } from "react";
import CreateProjectDialog from "../../components/CreateProjectDialog";

const Home=()=>{
    const {authUser}=useAuthStore();
    const {getUserProjects,projects}=useProjectStore();
    const [searchInp,setSearchInp]=useState<string>("");
    const [openCreateDialog,setOpenCreateDialog]=useState<boolean>(false);
    
    useEffect(()=>{
        getUserProjects(authUser!.id);
    },[getUserProjects,authUser]);

    const filteredPrjects=projects.filter((project)=>project.projectTitle.toLowerCase().includes(searchInp.toLowerCase()));

    return(
        <div className="flex flex-col gap-2 py-2 px-4">
            {/* header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-bold text-3xl">Welcome back, {authUser?.name}</h1>
                </div>
            </div>
            {/* search */}
            <div className="relative">
                <Input
                    value={searchInp}
                    onChange={(e)=>setSearchInp(e.target.value)}
                    placeholder="Search Projects..."
                    className="bg-black text-gray-300 placeholder:text-gray-500 border-none pl-10 py-5"
                />
                <Search className="absolute top-2 text-gray-300 left-2 "></Search>
            </div>

            {/* projects */}
            <div className="grid grid-cols-4 min-h-[300px] gap-4 mt-8">
                <div 
                    onClick={()=>setOpenCreateDialog(true)}
                    className="border-dashed border-2 border-border/20 rounded-lg flex flex-col gap-4 justify-center items-center group hover:cursor-pointer hover:translate-y-[-3px] transition-all duration-300"
                >
                    <div className="p-2 bg-gray-500 rounded-full group-hover:scale-110 transform transition-all duration-300">
                        <Plus></Plus>
                    </div>
                    <p className="font-bold">New Project</p>
                    <p className="text-gray-500">Start a fresh workspace</p>
                </div>
                {
                    filteredPrjects.map((project)=>{
                        return(
                            <div
                                key={project.id}
                                className="flex flex-col h-fit gap-2 p-5 border border-border/20 rounded-lg hover:translate-y-[-3px] transition-all duration-300"
                            >
                                <div className="flex justify-between items-center">
                                    <h1 className="font-bold text-2xl">{project.projectTitle}</h1>
                                    <div className="hover:bg-gray-200/10 rounded-full p-2 cursor-pointer transition-all durationn-300">
                                        <EllipsisVertical/>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 mt-5 border-b pb-5 border-border/20">
                                    {project.tasks.map((task)=>{
                                        return(
                                            <div 
                                                key={task.id}
                                                className="flex items-center w-full gap-2 line-clamp-1"
                                            >
                                                {
                                                    task.isCompleted?(
                                                        <>
                                                            <CheckCircle className="text-green-300 w-4"/>
                                                            <p className="line-through">{task.title}</p>
                                                        </>
                                                    ):(
                                                        <>
                                                            <Circle className="text-blue-300 w-4"/>
                                                            <p className="">{task.title}</p>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        );
                                    })}
                                    {project.tasks.length==0 &&(
                                        <div className="text-gray-300/20">
                                            No Tasks Added yet!
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <div className="p-2 rounded-full bg-purple-400 hover:cursor-pointer hover:bg-purple-400/90 transition-all duration-300 active:translate-y-1  ">
                                        <ArrowRight className="w-4 h-4"/>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <CreateProjectDialog open={openCreateDialog} setOpen={setOpenCreateDialog}></CreateProjectDialog>
        </div>
    );
}

export default Home;