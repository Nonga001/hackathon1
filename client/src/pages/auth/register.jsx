import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const initialState = {
    userName: '',
    email: '',
    password: ''
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    async function onSubmit(event) {
        event.preventDefault();
    
        // Validate form data
        if (!formData.userName || !formData.email || !formData.password) {
            toast({
                title: "All fields are required",
                variant: 'destructive',
            });
            return;
        }
    
        try {
            const data = await dispatch(registerUser(formData));
    
            console.log("Dispatch result:", data); // Log the dispatch result
    
            if (data?.payload?.success) {
                toast({
                    title: data.payload.message,
                });
                setFormData(initialState); // Reset form data
                navigate('/auth/login');
            } else {
                toast({
                    title: data?.payload?.message || "Registration failed",
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast({
                title: "An error occurred during registration",
                variant: 'destructive',
            });
        }
    }
    
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-background px-4"> {/* Centering container */}
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Create new account
                    </h1>
                    <p className="mt-2">
                        Already have an account
                        <Link className="font-bold ml-2 text-primary hover:underline" to='/auth/login'>Login</Link>
                    </p>
                </div>
                <CommonForm 
                    formControls={registerFormControls}
                    buttonText={"Signup"}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit} 
                />
            </div>
        </div>
    );
}

export default AuthRegister;
