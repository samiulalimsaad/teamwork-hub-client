import { createBrowserRouter } from "react-router-dom";
import Documents from "../components/Documents";
import Project from "../components/Project";
import Projects from "../components/Projects";
import MainLayout from "../layouts/MainLayout";
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
