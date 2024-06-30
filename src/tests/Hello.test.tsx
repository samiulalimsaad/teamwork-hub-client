import { expect, test } from "vitest";

import { render, screen } from "@testing-library/react";
import React from "react";
import Hello from "./Hello";
React;
render(<Hello />);

test("renders Login component Click me button", () => {
    expect(screen.getByText(/Click me/i));
});

test("renders Login component with Hello text", () => {
    expect(screen.getByText(/Hello/i));
});
