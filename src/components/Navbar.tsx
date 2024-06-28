import { Link } from "react-router-dom";
import { useAuth } from "../providers/hooks/auth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    return (
        <div className="w-full mx-auto navbar sm:w-3/5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                </div>
                <Link to="/" className="text-xl btn btn-ghost">
                    TeamworkHub
                </Link>
            </div>
            <div className="hidden navbar-center lg:flex"></div>
            <div className="navbar-end">
                {user ? (
                    <button onClick={logOut} className="btn">
                        Logout
                    </button>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="btn btn-sm">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-sm">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
