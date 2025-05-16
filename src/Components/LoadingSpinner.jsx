import clsx from "clsx";

const LoadingSpinner = ({ size = "large" }) => {
  return (
    <div
      className={clsx(
        size === "large" ? "min-h-screen bg-gray-900" : "",
        "flex items-center justify-center"
      )}
    >
      <div
        className={clsx(
          size === "large" ? "w-16 h-16" : "w-6 h-6",
          "border-4 border-t-yellow-400 border-gray-700 rounded-full animate-spin"
        )}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
