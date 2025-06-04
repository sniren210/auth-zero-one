import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "@/pages";

// Mock the stores
jest.mock("../store/AuthStore", () => ({
  useAuthStore: () => ({
    user: null,
    loading: false,
    error: null,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    setRememberMe: jest.fn(),
    rememberMe: false,
  }),
}));

jest.mock("../store/FormStore", () => ({
  useFormStore: () => ({
    isLogin: true,
    email: "",
    password: "",
    name: "",
    errors: {},
    setIsLogin: jest.fn(),
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    setName: jest.fn(),
    validateEmail: jest.fn(() => true),
    validatePassword: jest.fn(() => true),
    validateName: jest.fn(() => true),
    clearForm: jest.fn(),
  }),
}));

describe("LoginPage", () => {
  it("renders login form", () => {
    render(<LoginPage />);
    expect(screen.getByText(/login to your account/i)).toBeInTheDocument();
  });
});
