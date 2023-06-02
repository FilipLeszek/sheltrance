import {render} from "@testing-library/react";
import LoginStructure from "@/components/login/LoginStructure";

describe('Login page',  () => {
  it('should render login page', function () {
    render(<LoginStructure/>)
  });

});