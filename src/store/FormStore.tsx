import { create } from "zustand";

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
}

interface FormState {
  isLogin: boolean;
  email: string;
  password: string;
  name: string;
  errors: FormErrors;
  setIsLogin: (isLogin: boolean) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => boolean;
  validateName: (name: string) => boolean;
  clearErrors: () => void;
  clearForm: () => void;
}

export const useFormStore = create<FormState>((set, get) => ({
  isLogin: true,
  email: "",
  password: "",
  name: "",
  errors: {},

  setIsLogin: (isLogin: boolean) => {
    set({ isLogin });
    get().clearForm();
  },

  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  setName: (name: string) => set({ name }),

  validateEmail: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    set((state) => ({
      errors: {
        ...state.errors,
        email: isValid ? undefined : "Please enter a valid email address",
      },
    }));

    return isValid;
  },

  validatePassword: (password: string) => {
    const isValid = password.length >= 6;

    set((state) => ({
      errors: {
        ...state.errors,
        password: isValid
          ? undefined
          : "Password must be at least 6 characters",
      },
    }));

    return isValid;
  },

  validateName: (name: string) => {
    const isValid = name.trim().length >= 2;

    set((state) => ({
      errors: {
        ...state.errors,
        name: isValid ? undefined : "Name must be at least 2 characters",
      },
    }));

    return isValid;
  },

  clearErrors: () => set({ errors: {} }),

  clearForm: () =>
    set({
      email: "",
      password: "",
      name: "",
      errors: {},
    }),
}));
