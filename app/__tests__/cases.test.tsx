import { render } from "@testing-library/react";
import ShelterCasesPage from "@/pages/cases";

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

describe('Cases page',  () => {
  it('should render login page', function () {
    render(<ShelterCasesPage/>)
  });

});