import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/login";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(() => false),
}));

describe("Login page", () => {
  it("shows error modal", async () => {
    render(<Login />);

    const loginButton = screen.getByRole("button");
    userEvent.click(loginButton);

    await sleep(2000);

    const errorModal = screen.getByText("Błąd logowania");
    expect(errorModal).toBeInTheDocument();
  });
});
