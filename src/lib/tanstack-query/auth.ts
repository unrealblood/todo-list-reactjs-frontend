import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserType } from "../typescript/user";
import type { SignInFormFields } from "../typescript/auth";

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

            return result; // returns created todo
        },

        onError: (error) => {
            throw new Error("Mutation Error: " + error.message);
        },

        // After successfully posting → refetch todos
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

            return result; // returns created todo
        },

        onError: (error) => {
            throw new Error("Mutation Error: " + error.message);
        },

        // After successfully posting → refetch todos
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["signup"] });
        }
    });
}