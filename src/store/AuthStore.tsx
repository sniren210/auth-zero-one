import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  rememberMe: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setRememberMe: (remember: boolean) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      rememberMe: false,

      login: async (email: string, password: string) => {
        set({ loading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock successful login

          if (email === "demo@example.com" && password === "password123") {
            const mockUser: User = {
              id: "1",
              email,
              name: email.split("@")[0],
            };

            set({ user: mockUser, loading: false });
          }

          set({
            error: "Invalid email or password",
            loading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Login failed",
            loading: false,
          });
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ loading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock successful registration
          const mockUser: User = {
            id: "1",
            email,
            name,
          };

          set({ user: mockUser, loading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Registration failed",
            loading: false,
          });
        }
      },

      logout: () => {
        set({ user: null, error: null });
      },

      setRememberMe: (remember: boolean) => {
        set({ rememberMe: remember });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.rememberMe ? state.user : null,
        rememberMe: state.rememberMe,
      }),
    }
  )
);
