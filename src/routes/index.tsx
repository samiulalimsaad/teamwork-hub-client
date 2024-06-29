import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Documents from "../pages/Documents";
import Project from "../pages/Project";
import Projects from "../pages/Projects";
import Login from "../pages/login";
import Register from "../pages/register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Projects /> },
            { path: "/project/:id", element: <Documents /> },
            { path: "/project/document/:id", element: <Project /> },
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
