import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../pages/register";


function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.spyOn(console, "error").mockImplementation(() => {});

describe("Register page", () => {
  it("shows error modal", async () => {
    render(<Register />);

    const registerButton = screen.getByRole("button");
    userEvent.click(registerButton);

    await sleep(4000);

    const errorModal = screen.getByText("Błąd rejestracji");
    expect(errorModal).toBeInTheDocument();
  });
});
