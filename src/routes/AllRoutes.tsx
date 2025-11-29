import { Route, Routes } from "react-router";
import { Home } from "../pages";
import { ForgotPassword, SignIn, SignUp } from "../pages/auth";
import { ProtectedRoute } from "./ProtectedRoute";
import { ResetPassword } from "../pages/auth/ResetPassword";

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Routes>
    );
}

export {AllRoutes};