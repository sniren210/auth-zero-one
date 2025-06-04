import { ButtonProps } from "@/interface/AuthInterface";

const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
}) => {
  const baseClasses: string =
    "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2";

  const variants: Record<string, string> = {
    primary:
      "bg-teal-600 text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-teal-400",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
    google:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
  };

  const handleClick = (): void => {
    if (onClick && !loading && !disabled) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={loading || disabled}
      className={`${baseClasses} ${variants[variant]} ${className} ${
        loading || disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      aria-disabled={loading || disabled}
    >
      {loading ? (
        <>
          <div
            className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
            aria-hidden="true"
          ></div>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonComponent;
