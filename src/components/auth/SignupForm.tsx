import { useForm } from "react-hook-form";
import type { SignUpFormFields } from "../../lib/typescript/auth";
import { Link } from "react-router";
import { useRegisterUser } from "../../lib/tanstack-query/auth";
import { useState } from "react";

function SignUpForm() {
    const registerUser = useRegisterUser();

    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { register, handleSubmit, formState: {errors} } = useForm<SignUpFormFields>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    function handleSignUp(data: SignUpFormFields): SubmitHandler<SignUpFormFields> {
        registerUser.mutate({
            name: data.name,
            email: data.email,
            password: data.password
        },
        {
            onError: (error) => {
                setErrorMessage(error.message);
            },
        }
        );

        setSuccessMessage("Successfully registered. You can now login");
    }

    return (
        <form onSubmit={handleSubmit(handleSignUp)} className="mt-4">
            <fieldset className="border border-black p-4 rounded-xl">
                <legend>SignIn Form</legend>
                
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="flex flex-col justify-start items-start gap-2">
                        <label htmlFor="nameInput">Name</label>
                        
                        <input type="text" id="nameInput" className="bg-gray-200 p-2 rounded-full w-[350px]" placeholder="Enter your full name" {...register("name", {
                            required: "Name is required"
                        },)} />
                    </div>

                    <div className="flex flex-col justify-start items-start gap-2">
                        <label htmlFor="emailInput">Email Address</label>
                        
                        <input type="email" id="emailInput" className="bg-gray-200 p-2 rounded-full w-[350px]" placeholder="Enter your email address" {...register("email", {
                            required: "Email address is required",
                            validate: (value) => {
                                if(!value.includes("@")) {
                                    return "Email address must include @"
                                }
                                
                                return true;
                            },
                        },)} />
                    </div>

                    <div className="flex flex-col justify-start items-start gap-2">
                        <label htmlFor="passwordInput">Password</label>
                        
                        <input type="password" id="passwordInput" className="bg-gray-200 p-2 rounded-full w-[350px]" placeholder="Enter your password" {...register("password", {
                            required: "Password is required",
                            validate: (value) => {
                                if(value.length < 6) {
                                    return "Password must be at least 6 characters"
                                }

                                return true;
                            }
                        })} />
                    </div>

                    {errors.name && (<p className="text-red-500">{errors.name.message}</p>)}
                    
                    {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}
                    
                    {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}

                    {(successMessage !== "") && (<p className="text-green-500">{successMessage}</p>)}

                    {(errorMessage !== "") && (<p className="text-red-500">{errorMessage}</p>)}

                    <div className="flex flex-col justify-start items-start gap-2 mt-2">
                        <button type="submit" disabled={registerUser.isPending} className="bg-blue-500 text-white rounded-full py-2 px-6 cursor-pointer">SignIn</button>
                    </div>

                    <div>
                        <p>Already have an account. <Link to="/auth/signin" className="font-bold">SignIn</Link></p>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}

export {SignUpForm};