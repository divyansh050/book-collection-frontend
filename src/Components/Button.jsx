import clsx from "clsx";
import LoadingSpinner from "./LoadingSpinner";

// Base Styles: Applied to all button variants for consistent styling
const baseStyles =
  "rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed";

// Size Variants: Defining padding for different button sizes
const sizes = {
  md: "px-4 py-2", // Medium size (default)
  lg: "px-6 py-2", // Large size
};

// Style Variants: Defining different button styles
const variants = {
  primary:
    "border border-transparent bg-yellow-400 text-gray-900 hover:bg-yellow-500",
  ghost:
    "bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900",
  danger: "bg-red-500 text-white hover:bg-red-600",
  underline: "text-yellow-400 hover:text-yellow-500 underline p-0",
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  ariaLabel = "",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        baseStyles,
        variants[variant],
        variant !== "underline" && sizes[size],
        className
      )}
      disabled={disabled || loading} // Disable if loading
      aria-label={
        ariaLabel || (typeof children === "string" ? children : "Button")
      } // Dynamic aria-label
      {...props}
    >
      {/* If loading, show spinner instead of text */}
      {loading ? <LoadingSpinner size="small" /> : children}
    </button>
  );
};

export default Button;
