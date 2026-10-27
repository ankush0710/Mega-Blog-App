import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div>
      {label && (
        <label htmlFor={id} className={``}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`px-3 py-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
