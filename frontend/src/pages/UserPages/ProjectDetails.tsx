import { useEffect} from "react";
import { useParams } from "react-router-dom";
import { useProjectStore } from "../../store/projectStore";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { Switch } from "../../components/ui/switch";
import { useTaskStore } from "../../store/taskStore";

const ProjectDetails=()=>{
    const {id}=useParams();
    const {authUser}=useAuthStore();
    const {getProject,project}=useProjectStore();
    const {tasks,getTasks,setTaskCompleted,setTaskInCompleted}=useTaskStore();

    // const [completedSwitch,setCompletedSwitch]=useState<boolean>(false);

    useEffect(()=>{
        getProject(authUser!.id,id!);
        getTasks(id!);
    },[id,getProject,getTasks]);

    const completedTasks=tasks.filter((task)=>task.isCompleted);
    const inCompletedTasks=tasks.filter((task)=>!task.isCompleted);

    return(
        <div className="flex flex-col gap-2 py-2 px-4 pt-10">
            {/* header */}
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2 justify-start items-center">
                    <h1 className="text-3xl font-bold">{project?.projectTitle}</h1>
                    <p className="text-gray-300/90 text-lg">{project?.description}</p>
                </div>
                <Button 
                    variant={"default"}
                    className="bg-purple-500 hover:bg-purple-500/90 cursor-pointer p-5"
                >
                    <Plus/>Add Task
                </Button>
            </div>

            <div className="flex w-full mt-6">
                <div className="border-r border-border/20 w-1/2 min-h-[400px]">
                    <div className="flex justify-between items-center border-b border-border/20 pr-5">
                        <h1>InCompeted Tasks</h1>
                        <p>{inCompletedTasks?.length}</p>
                    </div>
                    <div className="mt-4 pr-5 grid grid-cols-2">
                        {inCompletedTasks?.map((task)=>{
                            return(
                                <div 
                                    key={task.id}
                                    className="flex flex-col h-fit gap-2 p-5 border border-border/20 rounded-lg hover:translate-y-[-3px] transition-all duration-300"
                                >
                                    <div className="flex justify-between items-center">
                                        <h1>{task.title}</h1>
                                        <span
                                            className="text-[10px] p-2 bg-orange-300/20 rounded-full text-orange-300"
                                        >
                                            InCompeleted
                                        </span>
                                    </div>
                                    <p className="text-gray-300">{task.description}</p>
                                    <p className="text-gray-300">
                                        <span className="text-white">Due to: </span>{new Date(task.dueDate).toDateString()}
                                    </p>

                                    <div className="flex gap-2 items-center">
                                        <Switch
                                            checked={task.isCompleted}
                                            className="cursor-pointer "
                                            onCheckedChange={()=>{
                                                setTaskCompleted(task.id);
                                            }} 
                                        />
                                        <p>In Completed</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="w-1/2 min-h-[400px] ">
                    <div className="flex justify-between items-center border-b border-border/20 pl-5">
                        <h1>Competed Tasks</h1>
                        <p>{completedTasks?.length}</p>
                    </div>
                    <div className="mt-4 pl-5 grid grid-cols-2">
                        {completedTasks?.map((task)=>{
                            return(
                                <div 
                                    key={task.id}
                                    className="flex flex-col h-fit gap-2 p-5 border border-border/20 rounded-lg hover:translate-y-[-3px] transition-all duration-300"
                                >
                                    <div className="flex justify-between items-center">
                                        <h1>{task.title}</h1>
                                        <span
                                            className="text-[10px] p-2 bg-green-300/20 rounded-full text-green-300"
                                        >
                                            Compeleted
                                        </span>
                                    </div>
                                    <p className="text-gray-300">{task.description}</p>
                                    <p className="text-gray-300">
                                        <span className="text-white">Due to: </span>{new Date(task.dueDate).toDateString()}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            className="cursor-pointer "
                                            checked={task.isCompleted}
                                            onCheckedChange={()=>{
                                                setTaskInCompleted(task.id);
                                            }} 
                                        />
                                        <p>Completed</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;