import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonComponent from "../ButtonComponent";

describe("ButtonComponent", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders button with children", () => {
    render(
      <ButtonComponent onClick={mockOnClick}>Test Button</ButtonComponent>
    );

    expect(
      screen.getByRole("button", { name: /test button/i })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(<ButtonComponent onClick={mockOnClick}>Click me</ButtonComponent>);

    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    render(
      <ButtonComponent onClick={mockOnClick} disabled>
        Disabled Button
      </ButtonComponent>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("shows loading state", () => {
    render(
      <ButtonComponent onClick={mockOnClick} loading>
        Loading Button
      </ButtonComponent>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(
      <ButtonComponent onClick={mockOnClick} variant="primary">
        Primary
      </ButtonComponent>
    );

    let button = screen.getByRole("button");
    expect(button).toHaveClass("bg-teal-600");

    rerender(
      <ButtonComponent onClick={mockOnClick} variant="secondary">
        Secondary
      </ButtonComponent>
    );

    button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-200");
  });

  it("applies custom className", () => {
    render(
      <ButtonComponent onClick={mockOnClick} className="custom-class">
        Custom Button
      </ButtonComponent>
    );

    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });
});
