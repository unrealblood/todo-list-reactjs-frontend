import { Route, Routes } from "react-router";
import { Home } from "../pages";

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export {AllRoutes};