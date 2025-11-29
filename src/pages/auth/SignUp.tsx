import { SignUpForm } from "../../components/auth/SignupForm";

function SignUp() {
    return (
        <div className="w-[600px] mx-auto">
            <div className="text-2xl font-bold mt-4 text-center">SignUp</div>

            <SignUpForm />
        </div>
    );
}

export {SignUp};