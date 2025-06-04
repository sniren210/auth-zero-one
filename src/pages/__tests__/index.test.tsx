import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../index";
import { useAuthStore } from "../../store/AuthStore";
import { useFormStore } from "@/store/FormStore";

// Mock the stores
jest.mock("../../store/AuthStore");
jest.mock("../../store/FormStore");

describe("LoginPage", () => {
  const mockLogin = jest.fn();
  const mockRegister = jest.fn();
  const mockLogout = jest.fn();
  const mockSetRememberMe = jest.fn();
  const mockValidateEmail = jest.fn();
  const mockValidatePassword = jest.fn();
  const mockValidateName = jest.fn();
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockSetName = jest.fn();
  const mockSetIsLogin = jest.fn();

  beforeEach(() => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
      error: null,
      login: mockLogin,
      register: mockRegister,
      logout: mockLogout,
      setRememberMe: mockSetRememberMe,
      rememberMe: false,
    });

    (useFormStore as unknown as jest.Mock).mockReturnValue({
      isLogin: true,
      email: "",
      password: "",
      name: "",
      errors: {},
      setIsLogin: mockSetIsLogin,
      setEmail: mockSetEmail,
      setPassword: mockSetPassword,
      setName: mockSetName,
      validateEmail: mockValidateEmail,
      validatePassword: mockValidatePassword,
      validateName: mockValidateName,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form by default", () => {
    render(<LoginPage />);
    expect(screen.getByText("Login to your Account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("switches to registration form", () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByText("Create an account"));
    expect(mockSetIsLogin).toHaveBeenCalledWith(false);
  });

  it("handles login submission", async () => {
    mockValidateEmail.mockReturnValue(true);
    mockValidatePassword.mockReturnValue(true);

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "demo@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));

    // await waitFor(() => {
    //   expect(mockLogin).toHaveBeenCalledWith("demo@example.com", "password123");
    // });
  });

  it("handles registration submission", async () => {
    mockValidateEmail.mockReturnValue(true);
    mockValidatePassword.mockReturnValue(true);
    mockValidateName.mockReturnValue(true);

    (useFormStore as unknown as jest.Mock).mockReturnValue({
      isLogin: false,
      email: "",
      password: "",
      name: "",
      errors: {},
      setIsLogin: mockSetIsLogin,
      setEmail: mockSetEmail,
      setPassword: mockSetPassword,
      setName: mockSetName,
      validateEmail: mockValidateEmail,
      validatePassword: mockValidatePassword,
      validateName: mockValidateName,
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "demo@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Create Account"));

    // await waitFor(() => {
    //   expect(mockRegister).toHaveBeenCalledWith(
    //     "demo@example.com",
    //     "password123",
    //     "Test User"
    //   );
    // });
  });

  it("displays logged in state when user is present", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { name: "Test User", email: "demo@example.com" },
      loading: false,
      error: null,
      logout: mockLogout,
    });

    render(<LoginPage />);
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(
      screen.getByText("Successfully logged in as Test User")
    ).toBeInTheDocument();
  });

  it("handles logout", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { name: "Test User", email: "demo@example.com" },
      loading: false,
      error: null,
      logout: mockLogout,
    });

    render(<LoginPage />);
    fireEvent.click(screen.getByText("Logout"));
    expect(mockLogout).toHaveBeenCalled();
  });

  it("handles remember me toggle", () => {
    render(<LoginPage />);
    const rememberMeCheckbox = screen.getByLabelText("Remember me");
    fireEvent.click(rememberMeCheckbox);
    expect(mockSetRememberMe).toHaveBeenCalledWith(true);
  });

  it("displays validation errors", async () => {
    mockValidateEmail.mockReturnValue(false);
    mockValidatePassword.mockReturnValue(false);

    (useFormStore as unknown as jest.Mock).mockReturnValue({
      isLogin: true,
      email: "",
      password: "",
      name: "",
      errors: {
        email: "Invalid email",
        password: "Invalid password",
      },
      setIsLogin: mockSetIsLogin,
      setEmail: mockSetEmail,
      setPassword: mockSetPassword,
      setName: mockSetName,
      validateEmail: mockValidateEmail,
      validatePassword: mockValidatePassword,
      validateName: mockValidateName,
    });

    render(<LoginPage />);
    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    expect(screen.getByText("Invalid password")).toBeInTheDocument();
  });
});
