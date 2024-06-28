import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="w-full mx-auto sm:w-3/5">
            <Outlet />
        </div>
    );
};

export default MainLayout;
