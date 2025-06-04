
import { act, renderHook } from "@testing-library/react";
import { useFormStore } from "../FormStore";

describe("useFormStore", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useFormStore());
    act(() => {
      result.current.clearForm();
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useFormStore());
    expect(result.current.isLogin).toBe(true);
    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.name).toBe("");
    expect(result.current.errors).toEqual({});
  });

  it("should set and validate email", () => {
    const { result } = renderHook(() => useFormStore());
    
    act(() => {
      result.current.setEmail("invalid");
      result.current.validateEmail("invalid");
    });
    expect(result.current.errors.email).toBe("Please enter a valid email address");
    
    act(() => {
      result.current.setEmail("test@example.com");
      result.current.validateEmail("test@example.com");
    });
    expect(result.current.errors.email).toBeUndefined();
  });

  it("should set and validate password", () => {
    const { result } = renderHook(() => useFormStore());
    
    act(() => {
      result.current.setPassword("12345");
      result.current.validatePassword("12345");
    });
    expect(result.current.errors.password).toBe("Password must be at least 6 characters");
    
    act(() => {
      result.current.setPassword("123456");
      result.current.validatePassword("123456");
    });
    expect(result.current.errors.password).toBeUndefined();
  });

  it("should set and validate name", () => {
    const { result } = renderHook(() => useFormStore());
    
    act(() => {
      result.current.setName("a");
      result.current.validateName("a");
    });
    expect(result.current.errors.name).toBe("Name must be at least 2 characters");
    
    act(() => {
      result.current.setName("John");
      result.current.validateName("John");
    });
    expect(result.current.errors.name).toBeUndefined();
  });

  it("should clear errors", () => {
    const { result } = renderHook(() => useFormStore());
    
    act(() => {
      result.current.setEmail("invalid");
      result.current.validateEmail("invalid");
      result.current.clearErrors();
    });
    expect(result.current.errors).toEqual({});
  });

  it("should clear form", () => {
    const { result } = renderHook(() => useFormStore());
    
    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setPassword("password");
      result.current.setName("John");
      result.current.clearForm();
    });
    
    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.name).toBe("");
    expect(result.current.errors).toEqual({});
  });

  it("should toggle login state and clear form", () => {
    const { result } = renderHook(() => useFormStore());
    
    act(() => {
      result.current.setEmail("test@example.com");
      result.current.setIsLogin(false);
    });
    
    expect(result.current.isLogin).toBe(false);
    expect(result.current.email).toBe("");
  });
});
