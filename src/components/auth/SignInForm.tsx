import { useForm, type SubmitHandler } from "react-hook-form";
import type { SignInFormFields } from "../../lib/typescript/auth";
import { Link, useNavigate } from "react-router";
import { useLoginUser } from "../../lib/tanstack-query/auth";
import { useState } from "react";

function SignInForm() {
    const loginUser = useLoginUser();

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string>("");

    const { register, handleSubmit, formState: {errors} } = useForm<SignInFormFields>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    function handleSignIn(data: SignInFormFields): SubmitHandler<SignInFormFields> {
        loginUser.mutate({email: data.email, password: data.password}, {
            onError: (error) => {
                setErrorMessage(error.message);
            },
            onSuccess: () => {
                navigate("/");
            }
        });
    }

    return (
        <form onSubmit={handleSubmit(handleSignIn)} className="mt-4">
            <fieldset className="border border-black p-4 rounded-xl">
                <legend>SignIn Form</legend>
                
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="flex flex-col justify-start items-start gap-2">
                        <label htmlFor="emailInput">Email Address</label>
                        
                        <input type="email" id="emailInput" className="bg-gray-200 p-2 rounded-full" placeholder="Enter your email address" {...register("email", {
                            required: "Email address is required",
                            validate: (value) => {
                                if(!value.includes("@")) {
                                    return "Email address must include @"
                                }
                                
                                return true;
                            }
                        },)} />
                    </div>

                    <div className="flex flex-col justify-start items-start gap-2">
                        <label htmlFor="passwordInput">Password</label>
                        
                        <input type="password" id="passwordInput" className="bg-gray-200 p-2 rounded-full" placeholder="Enter your password" {...register("password", {
                            required: "Password is required",
                            validate: (value) => {
                                if(value.length < 6) {
                                    return "Password must be at least 6 characters"
                                }

                                return true;
                            }
                        })} />
                    </div>

                    {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

                    {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}

                    {(errorMessage !== "") && (<p className="text-red-500">{errorMessage}</p>)}

                    <div className="flex flex-col justify-start items-start gap-2 mt-2">
                        <button type="submit" className="bg-blue-500 text-white rounded-full py-2 px-6 cursor-pointer">SignIn</button>
                    </div>

                    <div>
                        <p>Do not have an account. <Link to="/auth/signup" className="font-bold">Signup</Link></p>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}

export {SignInForm};