import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast"; // Ensure correct path
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
    email: '',
    password: ''
};

function AuthLogin() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useToast(); // Ensure you're extracting toast correctly

    function onSubmit(event) { // Add event parameter
        event.preventDefault(); // Prevent default form submission
    
        dispatch(loginUser(formData)).then((data) => {
            console.log(data); // Log the response data for debugging
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message,
                });
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: "destructive",
                });
            }
        }).catch((error) => {
            console.error("Login error:", error); // Log error for debugging
            toast({
                title: "An error occurred. Please try again.",
                variant: "destructive",
            });
        });
    }
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-background px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Sign in to your
                    </h1>
                    <p className="mt-2">
                        Don't have an account
                        <Link className="font-bold ml-2 text-primary hover:underline" to='/auth/register'>Sign up</Link>
                    </p>
                </div>
                <CommonForm 
                    formControls={loginFormControls}
                    buttonText={"Login"}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit} 
                />
            </div>
        </div>
    );
}

export default AuthLogin;
