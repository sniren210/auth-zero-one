import { mount } from "@cypress/react";
import ButtonComponent from "../../src/components/ButtonComponent";

describe("ButtonComponent.cy.tsx", () => {
  it("playground", () => {
    mount(<ButtonComponent>Click me</ButtonComponent>);
  });
});
