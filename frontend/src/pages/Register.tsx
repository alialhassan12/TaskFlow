import { AlertCircle, CheckCircle, Eye, EyeClosed } from "lucide-react";
import { Button } from "../components/ui/button";
import { Spinner } from "../components/ui/spinner";
import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Register=()=>{
    const {register,isRegistering}=useAuthStore();
    const [showPassword,setShowPassword]=useState<boolean>(false);
    const [error,setError]=useState<string>("");
    const [formData,setFormData]=useState<{Name:string,Email:string,Password:string}>({
        Name:"",
        Email:"",
        Password:""
    });

    const navigate=useNavigate();

    const handleRegister=async()=>{
        setError("");
        if(formData.Name.trim().length === 0||formData.Email.trim().length === 0 || formData.Password.trim().length===0){
            setError("All Fields required");
            return;
        }
        const success=await register(formData);
        if(success) return navigate("/user/dashboard");
    }

    return(
        <div className="flex flex-row flex-wrap items-center">
            <div className="flex flex-col items-center justify-center h-screen w-1/2 bg-gradient-to-b from-purple-500 to-gray-900">
                {/* icon */}
                <div className="bg-purple-400 rounded-xl">
                    <CheckCircle className="text-purple-900 w-8 h-8 m-4"/>
                </div>
                {/* title */}
                <h1 className="text-3xl font-bold mt-4 text-white">Task Flow</h1>
                {/* description */}
                <p className="text-gray-300 mt-2 text-center px-8">
                    The elite workspace for high-velocity development teams. Focus on the code, we'll handle the flow.
                </p>
            </div>
            <div className="flex items-center justify-center h-screen w-1/2">
                <div className="flex flex-col items-center justify-start w-[500px]">
                    <h1 className="text-white font-bold w-full">Welcome back</h1>
                    <p className="text-gray-300 w-full">Log in to your workspace to continue.</p>

                    <div className="flex flex-col items-start justify-start w-full mt-8 gap-3">
                        <Field>
                            <FieldLabel className="text-gray-300">Name</FieldLabel>
                            <Input 
                                type="text"
                                value={formData?.Name}
                                disabled={isRegistering}
                                placeholder="John doe" 
                                onChange={(e)=>setFormData({...formData,Name:e.target.value})}
                                className="bg-black text-gray-300 placeholder:text-gray-500 border-none p-5"
                            />
                        </Field>
                        <Field>
                            <FieldLabel className="text-gray-300">Email address</FieldLabel>
                            <Input 
                                type="email"
                                value={formData?.Email}
                                disabled={isRegistering}
                                placeholder="dev@example.com" 
                                onChange={(e)=>setFormData({...formData,Email:e.target.value})}
                                className="bg-black text-gray-300 placeholder:text-gray-500 border-none p-5"
                            />
                        </Field>
                        <Field >
                            <FieldLabel className="text-gray-300">Password</FieldLabel>
                            <div className="relative">
                                <Input 
                                    type={showPassword?"text":"password"}
                                    disabled={isRegistering}
                                    value={formData?.Password} 
                                    onChange={(e)=>setFormData({...formData,Password:e.target.value})}
                                    placeholder="••••••••" 
                                    className="bg-black text-gray-300 placeholder:text-gray-500 border-none p-5"
                                    >
                                </Input>
                                <button 
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" 
                                    onClick={()=>setShowPassword(!showPassword)}
                                >
                                    {
                                        showPassword?
                                        <Eye className="text-gray-500 w-5 h-5"/>
                                        :
                                        <EyeClosed className="text-gray-500 w-5 h-5"/>
                                    }
                                </button>
                            </div>
                        </Field>
                        {error
                            ?
                            <p className="flex gap-2 p-4 border border-red-500 bg-red-200 text-red-700 w-full rounded-lg text-center">
                                <AlertCircle/> {error}
                            </p>
                            :
                            <></>
                        }
                        <Button 
                            onClick={()=>{handleRegister()}}
                            disabled={isRegistering}
                            className="bg-purple-500 text-white w-full mt-4 hover:bg-purple-600 cursor-pointer"
                        >
                            {
                                isRegistering?
                                <>
                                    <Spinner/> Signing up...
                                </>
                                :
                                "Sign up"
                            }
                        </Button>
                        <p className="text-gray-300 w-full text-center mt-4">
                            Already have an account? <a href="/" className="text-purple-500 hover:underline">Log in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;