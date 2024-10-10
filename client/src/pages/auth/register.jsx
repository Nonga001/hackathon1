import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
    userName: '',
    email: '',
    password: ''
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);

    function onSubmit() {
        // Handle form submission
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
