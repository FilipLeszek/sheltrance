import { render } from "@testing-library/react";
import MessagesPage from "../pages/messages";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({ pathname: "/messages" })),
}));
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    status: "authenticated",
  })),
}));

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

describe("Messages page", () => {
  it("should render messages page", function () {
    render(<MessagesPage />);
  });
});
