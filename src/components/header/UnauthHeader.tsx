import { Link } from "react-router";

function UnauthHeader() {
    return (
        <header className="flex justify-between items-center border-b border-gray-200 pb-2">
            <div>
                <Link to="/" className="font-bold text-2xl">Todo List</Link>
            </div>

            <nav className="flex justify-center items-center gap-2">
                <Link to="/auth/sign-in">Sign In</Link>
                <Link to="/auth/signup">Signup</Link>
            </nav>
        </header>
    );
}

export {UnauthHeader};