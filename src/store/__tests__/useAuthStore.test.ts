import { renderHook, act } from "@testing-library/react";
import { useAuthStore } from "../AuthStore";

describe("useAuthStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store state before each test
    useAuthStore.setState({
      user: null,
      loading: false,
      error: null,
      rememberMe: false,
    });
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.rememberMe).toBe(false);
  });

  it("should handle login success", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      // Simulate login logic
      result.current.login("demo@example.com", "password123");
    });
  });

  it("should handle logout", () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });
});
