import { expect, test } from "vitest";
import Projects from "../pages/Projects";
import { render, screen } from "./render"; // Adjust the path to your test-utils

render(<Projects />, { route: "/login" });

test("renders Login component New button", () => {
    expect(screen.getByText(/New/i));
});

// test("renders Login component with TeamworkHub text", () => {
//     expect(screen.getByText(/TeamworkHub/i));
// });

// test("renders Login component with edit button", () => {
//     expect(screen.getByText(/edit/i));
// });
