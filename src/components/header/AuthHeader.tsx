import { Link, useNavigate } from "react-router";

function AuthHeader() {
    const navigate = useNavigate();
    
    function handleLogout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");

        navigate("/auth/signin");
    }

    return (
        <header className="flex justify-between items-center border-b border-gray-200 pb-2">
            <div>
                <Link to="/" className="font-bold text-2xl">Todo List</Link>
            </div>

            <div>
                <button type="button" className="cursor-pointer" onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
}

export {AuthHeader};