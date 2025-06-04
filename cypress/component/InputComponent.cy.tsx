import { mount } from "@cypress/react";
import InputComponent from "../../src/components/InputComponent";

describe("InputComponent", () => {
  it("renders", () => {
    mount(<InputComponent />);
  });
});
