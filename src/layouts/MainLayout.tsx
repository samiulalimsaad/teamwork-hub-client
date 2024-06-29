import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../providers/hooks/auth";
import { useModalStore } from "../store";
import { Modal } from "../utils/ui/Modal";

const MainLayout = () => {
    const { loading } = useAuth();
    const navigate = useNavigate();
    const { isOpen, close } = useModalStore();

    useEffect(() => {
        if (isOpen) {
            navigate("/login");
            setTimeout(close, 1500);
        }
    }, [close, isOpen, navigate]);

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
            <Modal title="Session Expired">
                <div>redirecting to login page...</div>
            </Modal>
        </div>
    );
};

export default MainLayout;
