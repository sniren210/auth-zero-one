// TypeScript interfaces and types
interface AuthUser {
  id: number;
  email: string;
  name: string;
}

interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  name?: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  error?: string;
  disabled?: boolean;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'google';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export type {
  AuthUser,
  AuthResponse,
  ValidationErrors,
  AuthState,
  InputProps,
  ButtonProps
};
