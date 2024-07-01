import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Document from "../pages/Document";
import Login from "../pages/Login";
import Project from "../pages/Project";
import Projects from "../pages/Projects";
import Register from "../pages/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Projects /> },
            { path: "/project/:id", element: <Project /> },
            { path: "/project/document/:id", element: <Document /> },
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
