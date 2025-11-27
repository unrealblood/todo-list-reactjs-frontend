import { Link } from "react-router";

function AuthHeader() {
    function handleLogout() {
        console.log("User logged out.");
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