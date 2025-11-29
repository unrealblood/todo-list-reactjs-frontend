import { ForgotPasswordForm } from "../../components/auth/ForgotPasswordForm";

function ForgotPassword() {
    return (
        <div className="w-[600px] mx-auto">
            <div className="text-2xl font-bold mt-4 text-center">Forgot Password</div>

            <ForgotPasswordForm />
        </div>
    );
}

export {ForgotPassword};