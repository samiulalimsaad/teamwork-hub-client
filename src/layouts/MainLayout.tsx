import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../providers/hooks/auth";

const MainLayout = () => {
    const { loading } = useAuth();
    return (
        <div>
            <div className="bg-accent">
                <Navbar />
            </div>
            <div className="w-full mx-auto sm:w-3/5">
                {loading ? (
                    <span className="loading loading-dots loading-lg"></span>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
};

export default MainLayout;
