import { SignInForm } from "../../components/auth/SignInForm";

function SignIn() {
    return (
        <div className="w-[600px] mx-auto">
            <div className="text-2xl font-bold mt-4 text-center">SignIn</div>

            <SignInForm />
        </div>
    );
}

export {SignIn};