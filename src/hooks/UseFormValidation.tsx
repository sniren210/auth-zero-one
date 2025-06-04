import { ValidationErrors } from "@/interface/AuthInterface";
import { useState } from "react";

// Form validation hook with proper typing
const useFormValidation = (): {
  errors: ValidationErrors;
  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => boolean;
  validateName: (name: string) => boolean;
  clearErrors: () => void;
} => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: undefined }));
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return false;
    }
    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: undefined }));
    return true;
  };

  const validateName = (name: string): boolean => {
    if (!name) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      return false;
    }
    if (name.length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must be at least 2 characters",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, name: undefined }));
    return true;
  };

  const clearErrors = (): void => setErrors({});

  return { errors, validateEmail, validatePassword, validateName, clearErrors };
};

export default useFormValidation;
