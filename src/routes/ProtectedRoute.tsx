import type { ReactNode } from "react";
import { Navigate } from "react-router";

function ProtectedRoute({children}: {children: ReactNode}) {
    const accessToken = localStorage.getItem("accessToken");

    return (
        accessToken ? children : <Navigate to="/auth/signin" />
    );
}

export { ProtectedRoute };