import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Project from "../components/Project";
import MainLayout from "../layouts/MainLayout";

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
        path: "about",
        element: <div>About</div>,
    },
]);
