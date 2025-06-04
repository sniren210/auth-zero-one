import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";

import { useAuthStore } from "@/store/AuthStore";
import { useFormStore } from "@/store/FormStore";
import {
  FiCheckCircle,
  FiUser,
  FiAlertCircle,
  FiMail,
  FiLock,
} from "react-icons/fi";

const LoginPage: React.FC = () => {
  const {
    user,
    loading,
    error,
    login,
    register,
    logout,
    setRememberMe: setStoreRememberMe,
    rememberMe,
  } = useAuthStore();
  const {
    isLogin,
    email,
    password,
    name,
    errors,
    setIsLogin,
    setEmail,
    setPassword,
    setName,
    validateEmail,
    validatePassword,
    validateName,
    clearForm,
  } = useFormStore();

  const handleSubmit = async (): Promise<void> => {
    const isEmailValid: boolean = validateEmail(email);
    const isPasswordValid: boolean = validatePassword(password);
    const isNameValid: boolean = isLogin ? true : validateName(name);

    if (!isEmailValid || !isPasswordValid || !isNameValid) {
      return;
    }

    if (isLogin) {
      await login(email, password);
    } else {
      await register(email, password, name);
    }
  };

  const handleGoogleLogin = (): void => {
    // Mock Google login - in real app, integrate with Google OAuth
    alert("Google login would be integrated here");
  };

  const handleAuthModeSwitch = (): void => {
    setIsLogin(!isLogin);
  };

  const handleRememberMeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setStoreRememberMe(e.target.checked);
  };

  const handleForgotPassword = (): void => {
    alert("Forgot password functionality would be implemented here");
  };

  // Success/Dashboard view
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <FiCheckCircle
              className="mx-auto text-green-500 mb-4"
              size={64}
              aria-hidden="true"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
            <p className="text-gray-600">
              Successfully logged in as {user.name || user.email}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Your Digital Transformation Journey
              </h3>
              <p className="text-sm text-gray-600">
                You are now connected to our trusted digital transformation
                platform. Explore our services and start your journey towards
                digital excellence.
              </p>
            </div>

            <ButtonComponent onClick={logout} variant="secondary">
              Logout
            </ButtonComponent>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-teal-600 to-teal-700 p-8 lg:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 text-center lg:text-left max-w-md">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 mx-auto lg:mx-0">
              <FiUser className="text-teal-600" size={32} aria-hidden="true" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Your Trusted Digital Transformation Partner
            </h1>
            <p className="text-teal-100 text-lg opacity-90">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-start space-x-2 text-teal-200">
            <div className="flex space-x-1" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="w-2 h-2 bg-teal-300 rounded-full"></div>
              ))}
            </div>
            <span className="text-sm">and other 100+ trusted partners</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="mb-8 text-center lg:text-left">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto lg:mx-0">
              <div
                className="w-6 h-6 bg-white rounded"
                aria-hidden="true"
              ></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? "Login to your Account" : "Create your Account"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Good to have you back!"
                : "Join our digital transformation community"}
            </p>
          </div>

          {/* Google Login Button */}
          <ButtonComponent
            onClick={handleGoogleLogin}
            variant="google"
            className="mb-6"
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </ButtonComponent>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700"
              role="alert"
            >
              <FiAlertCircle size={20} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <div className="space-y-4">
            {!isLogin && (
              <InputComponent
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={setName}
                icon={<FiUser size={20} />}
                error={errors.name}
                disabled={loading}
              />
            )}

            <InputComponent
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={setEmail}
              icon={<FiMail size={20} />}
              error={errors.email}
              disabled={loading}
            />

            <InputComponent
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              icon={<FiLock size={20} />}
              error={errors.password}
              disabled={loading}
            />

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium focus:outline-none focus:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <ButtonComponent
              type="submit"
              loading={loading}
              className="mt-6"
              onClick={handleSubmit}
            >
              {isLogin ? "Login" : "Create Account"}
            </ButtonComponent>
          </div>

          {/* Switch between Login/Register */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">
              {isLogin ? "Not Registered Yet? " : "Already have an account? "}
            </span>
            <button
              onClick={handleAuthModeSwitch}
              className="text-teal-600 hover:text-teal-700 font-medium focus:outline-none focus:underline"
              disabled={loading}
            >
              {isLogin ? "Create an account" : "Login here"}
            </button>
          </div>

          {/* Demo credentials info */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              Demo Login Credentials:
            </h4>
            <p className="text-sm text-blue-700">
              <strong>Email:</strong> demo@example.com
              <br />
              <strong>Password:</strong> password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
