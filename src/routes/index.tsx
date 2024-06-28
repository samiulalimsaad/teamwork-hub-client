import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Project from "../components/Project";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login";
import Register from "../pages/register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <App /> },
            { path: "/project/:id", element: <Project /> },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
]);
