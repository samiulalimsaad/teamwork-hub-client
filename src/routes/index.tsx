import { createBrowserRouter } from "react-router-dom";
import Editor from "../components/Document/Editor";
import MainLayout from "../layouts/MainLayout";
import Documents from "../pages/Documents";
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
            { path: "/test", element: <Editor /> },
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
