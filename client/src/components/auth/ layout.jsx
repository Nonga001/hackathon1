import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
                <div className="max-w-md space-y-6 text-center text-primary-foreground ">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Welcome to MDawa
                    </h1>
                </div>
            </div>
            <div className="items-center justify-center bg-background px-4 py-12 sm:px-6 g:px-8 ">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;


