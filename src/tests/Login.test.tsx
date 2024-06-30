import { expect, test } from "vitest";
import Login from "../pages/Login"; // Adjust the path to your Login component
import { render, screen } from "./render"; // Adjust the path to your test-utils

render(<Login />, { route: "/login" });

test("renders Login component Login button", () => {
    expect(screen.getByText(/Login/i));
});

test("renders Login component with create an text", () => {
    expect(screen.getByText(/create an/i));
});

test("renders Login component with email field", () => {
    expect(screen.getByText(/Email/i));
});

test("renders Login component with password field", () => {
    expect(screen.getByText(/Password/i));
});
