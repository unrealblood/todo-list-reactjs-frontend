import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserType } from "../typescript/user";
import type { SignInFormFields } from "../typescript/auth";
import { useAuthStore } from "../../zustand/store";

export const useRegisterUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (user: UserType) => {
            const res = await fetch("http://localhost:5000/users/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const result = await res.json();

            if (result.error) throw new Error("Failed to register user");

            return result;
        },

        onError: (error) => {
            throw new Error("Mutation Error: " + error.message);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["signin"] });
        }
    });
}

export const useLoginUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: SignInFormFields) => {
            const res = await fetch("http://localhost:5000/users/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (result.error) throw new Error("Invalid credentials");

            localStorage.setItem("accessToken", result.accessToken);
            localStorage.setItem("userId", result.userId);

            useAuthStore.getState().setAccessToken(result.accessToken);

            return result;
        },

        onError: (error) => {
            throw new Error("Mutation Error: " + error.message);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["signup"] });
        }
    });
}

export const useForgotPassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({email}: {email: string}) => {
            const res = await fetch("http://localhost:5000/users/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
            });

            const result = await res.json();

            if (result.error) throw new Error(result.error);

            return result;
        },

        onError: (error) => {
            throw new Error("Mutation Error: " + error.message);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["forgot-password"] });
        }
    });
}

export const useResetPassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({token, newPassword, confirmPassword}: {token: string, newPassword: string, confirmPassword: string}) => {
            const res = await fetch("http://localhost:5000/users/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({token, newPassword, confirmPassword}),
            });

            const result = await res.json();

            if (result.error) throw new Error(result.error);

            return result;
        },

        onError: (error) => {
            throw new Error("Mutation Error: " + error.message);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["forgot-password"] });
        }
    });
}