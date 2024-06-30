import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as rtlRender, screen } from "@testing-library/react";
import React, { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import AuthProvider from "../providers/AuthProvider";

global.React = React; // Make React globally available (if necessary)
window.React = React; // Make React available on the window object (if necessary)

function render(children: ReactNode, { route = "/", ...renderOptions } = {}) {
    const queryClient = new QueryClient();

    return rtlRender(
        <MemoryRouter initialEntries={[route]}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
        </MemoryRouter>,
        renderOptions
    );
}

export { render, screen };
