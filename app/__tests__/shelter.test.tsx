import ShelterDetailsPage from "@/pages/shelter";
import { render } from "@testing-library/react";

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
    json: () => Promise.resolve({data: {name: "dawd", address: "dawdas"}}),
  })
);

describe("Shelter page", () => {
  it("should render shelter page", function () {
    render(<ShelterDetailsPage></ShelterDetailsPage>);
  });
});
