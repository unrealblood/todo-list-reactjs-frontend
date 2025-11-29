import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useResetPassword } from "../../lib/tanstack-query/auth";

function ResetPasswordForm({token}: {token: string}) {
    const resetPassword = useResetPassword();

    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { register, handleSubmit, formState: {errors} } = useForm<{newPassword: string, confirmPassword: string}>({
        defaultValues: {
            newPassword: "",
            confirmPassword:""
        }
    });

    async function handleResetPassword(data: {newPassword: string, confirmPassword: string}): SubmitHandler<{newPassword: string, confirmPassword: string}> {
        if(data.newPassword !== data.confirmPassword) {
            setErrorMessage("Passwords do not match");
        }
        else {
            const result = await resetPassword.mutateAsync({
                token,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword
            });

            if(result.error) {
                setErrorMessage(result.error);
            }
            else {
                setSuccessMessage(result.msg);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(handleResetPassword)} className="mt-4">
            <fieldset className="border border-black p-4 rounded-xl">
                <legend>Reset Password Form</legend>
                
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="flex flex-col justify-start items-start gap-2">
                        <label htmlFor="newPasswordInput">New Password</label>
                        
                        <input type="password" id="newPasswordInput" className="bg-gray-200 p-2 rounded-full w-[350px]" placeholder="Enter your password" {...register("newPassword", {
                            required: "Password is required",
                            validate: (value) => {
                                if(value.length < 6) {
                                    return "Password must be at least 6 characters"
                                }

                                return true;
                            }
                        })} />
                    </div>

                    <div className="flex flex-col justify-start items-start gap-2">
                        <label htmlFor="confirmPasswordInput">Confirm Password</label>
                        
                        <input type="password" id="confirmPasswordInput" className="bg-gray-200 p-2 rounded-full w-[350px]" placeholder="Enter your password" {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) => {
                                if(value.length < 6) {
                                    return "Password must be at least 6 characters"
                                }

                                return true;
                            }
                        })} />
                    </div>

                    {errors.newPassword && (<p className="text-red-500">{errors.newPassword.message}</p>)}

                    {errors.confirmPassword && (<p className="text-red-500">{errors.confirmPassword.message}</p>)}

                    {(errorMessage !== "") && (<p className="text-red-500">{errorMessage}</p>)}

                    {(successMessage !== "") && (<p className="text-green-500">{successMessage}</p>)}

                    <div className="flex flex-col justify-start items-start gap-2 mt-2">
                        <button type="submit" className="bg-blue-500 text-white rounded-full py-2 px-6 cursor-pointer">Submit</button>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}

export {ResetPasswordForm};