import { InputProps } from "@/interface/AuthInterface";
import { useState } from "react";
import { FaEyeSlash, FaEye, FaExclamationCircle } from "react-icons/fa";

// Input Component with proper TypeScript typing
const InputComponent: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  error,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputType: string = type === "password" && showPassword ? "text" : type;

  const handleTogglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-1">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          className={`w-full px-4 py-3 ${icon ? "pl-10" : ""} ${
            type === "password" ? "pr-10" : ""
          } 
              border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-black focus:border-transparent
              ${error ? "border-red-500" : "border-gray-300"} ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          }
              transition-all duration-200`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <div
          className="flex items-center space-x-1 text-red-500 text-sm"
          role="alert"
        >
          <FaExclamationCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputComponent;
