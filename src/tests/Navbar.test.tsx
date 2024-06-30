import { expect, test } from "vitest";
import Navbar from "../components/Navbar";
import { render, screen } from "./render"; // Adjust the path to your test-utils

render(<Navbar />, { route: "/" });

test("renders Login component with TeamworkHub text", () => {
    expect(screen.getByText(/TeamworkHub/i));
});
