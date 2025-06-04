import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaUser } from "react-icons/fa";
import InputComponent from "@/components/InputComponent";

describe("InputComponent", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders input with placeholder", () => {
    render(
      <InputComponent
        type="text"
        placeholder="Enter your name"
        value=""
        onChange={mockOnChange}
      />
    );

    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();

    render(
      <InputComponent
        type="text"
        placeholder="Test input"
        value=""
        onChange={mockOnChange}
      />
    );

    const input = screen.getByPlaceholderText(/test input/i);
    await user.type(input, "hello");

    expect(mockOnChange).toHaveBeenCalledTimes(5); // Once for each character
  });

  it("displays error state", () => {
    render(
      <InputComponent
        type="text"
        placeholder="Test input"
        value=""
        onChange={mockOnChange}
        error="This field is required"
      />
    );

    const input = screen.getByPlaceholderText(/test input/i);
    expect(input).toHaveClass("border-red-500");
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(
      <InputComponent
        type="text"
        placeholder="Test input"
        value=""
        onChange={mockOnChange}
        icon={<FaUser data-testid="user-icon" />}
      />
    );

    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();

    render(
      <InputComponent
        type="password"
        placeholder="Enter password"
        value="secret123"
        onChange={mockOnChange}
      />
    );

    const input = screen.getByPlaceholderText(/enter password/i);
    const toggleButton = screen.getByLabelText(/show password/i);

    expect(input).toHaveAttribute("type", "password");

    await user.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    await user.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <InputComponent
        type="text"
        placeholder="Disabled input"
        value=""
        onChange={mockOnChange}
        disabled
      />
    );

    const input = screen.getByPlaceholderText(/disabled input/i);
    expect(input).toBeDisabled();
    expect(input).toHaveClass("bg-gray-100");
  });
});
