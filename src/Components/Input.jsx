const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-2.5 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-transparent focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all ${className}`}
      {...props}
    />
  );
};

export default Input;
