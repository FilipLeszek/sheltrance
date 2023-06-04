import { render } from "@testing-library/react";

describe("Login page", () => {
  it("should render login page", function () {
    cy.mount(<LoginStructure />);
  });
});
