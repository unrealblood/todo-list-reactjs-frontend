import { useForm, type SubmitHandler } from "react-hook-form";
import { useForgotPassword } from "../../lib/tanstack-query/auth";
import { useState } from "react";
import { Link } from "react-router";

function ForgotPasswordForm() {
    const forgotPassword = useForgotPassword();

    const [resetLink, setResetLink] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { register, handleSubmit, formState: {errors} } = useForm<{email: string}>({
        defaultValues: {
            email: ""
        }
    });

    async function handleForgotPassword(data: {email: string}): SubmitHandler<{email: string}> {
        const result = await forgotPassword.mutateAsync({
            email: data.email
        },
        {
            onError: (error) => {
                setErrorMessage(error.message);
            }
        });

        if(!result.error) {
            setResetLink(result.resetLink);
        }
        else {
            setErrorMessage(result.error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleForgotPassword)} className="mt-4">
            <fieldset className="border border-black p-4 rounded-xl">
                <legend>Forgot Password Form</legend>
                
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="flex flex-col justify-start items-start gap-2">
                        <label htmlFor="emailInput">Email Address</label>
                        
                        <input type="email" id="emailInput" className="bg-gray-200 p-2 rounded-full w-[350px]" placeholder="Enter your email address" {...register("email", {
                            required: "Email address is required",
                            validate: (value) => {
                                if(!value.includes("@")) {
                                    return "Email address must include @"
                                }
                                
                                return true;
                            }
                        },)} />
                    </div>

                    {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

                    {(errorMessage !== "") && (<p className="text-red-500">{errorMessage}</p>)}

                    {(resetLink !== "") && (
                        <div>
                            <span>Reset Password Link Generated: </span>
                            <Link to={resetLink} className="underline text-blue-500">Click this link</Link>
                        </div>
                        )}

                    <div className="flex flex-col justify-start items-start gap-2 mt-2">
                        <button type="submit" className="bg-blue-500 text-white rounded-full py-2 px-6 cursor-pointer">Submit</button>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}

export {ForgotPasswordForm};