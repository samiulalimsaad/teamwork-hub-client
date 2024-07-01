import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../providers/hooks/auth";
import { useModalStore } from "../store/modal";
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
            <div className="sticky top-0 z-50 shadow-md bg-accent">
                <Navbar />
            </div>
            <div className="w-full p-4 mx-auto sm:w-3/5">
                {loading ? (
                    <div className="grid w-full h-full place-items-center">
                        <span className="loading loading-dots loading-lg"></span>
                        <p>Authenticating...</p>
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
            <Modal title="Session Expired" isOpen={isOpen}>
                <div>redirecting to login page...</div>
            </Modal>
        </div>
    );
};

export default MainLayout;
