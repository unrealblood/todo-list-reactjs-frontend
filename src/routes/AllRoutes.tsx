import { Route, Routes } from "react-router";
import { Home } from "../pages";
import { SignIn, SignUp } from "../pages/auth";
import { ProtectedRoute } from "./ProtectedRoute";

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/signin" element={<SignIn />} />
        </Routes>
    );
}

export {AllRoutes};