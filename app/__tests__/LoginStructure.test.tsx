import React from "react";
import LoginStructure from "../components/login/LoginStructure";
import { render, screen } from "@testing-library/react";

describe("LoginStructure component", () => {
  it("renders", () => {
    render(
      <LoginStructure>
        <div></div>
      </LoginStructure>
    );
    const title = screen.getByText(/Shelterance/i);
    expect(title).toBeInTheDocument();
  });
});
