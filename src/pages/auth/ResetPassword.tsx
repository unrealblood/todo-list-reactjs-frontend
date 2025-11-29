import { ResetPasswordForm } from "../../components/auth/ResetPasswordForm";
import { useSearchParams } from "react-router";

function ResetPassword() {
    const [params] = useSearchParams();
    
    const token = params.get("token");

    return (
        <div className="w-[600px] mx-auto">
            <div className="text-2xl font-bold mt-4 text-center">Reset Password</div>

            <ResetPasswordForm token={token!} />
        </div>
    );
}

export {ResetPassword};