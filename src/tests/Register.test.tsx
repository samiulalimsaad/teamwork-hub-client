import { expect, test } from "vitest";
import Register from "../pages/Register";
import { render, screen } from "./render"; // Adjust the path to your test-utils

render(<Register />, { route: "/register" });

test("renders Login component Login button", () => {
    expect(screen.getByText(/Register/i));
});

test("renders Login component with Already have an text", () => {
    expect(screen.getByText(/Already have an/i));
});

test("renders Login component with name field", () => {
    expect(screen.getByText(/Name/i));
});

test("renders Login component with email field", () => {
    expect(screen.getByText(/Email/i));
});

test("renders Login component with password field", () => {
    expect(screen.getByText(/Password/i));
});
