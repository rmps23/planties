import { useId } from "react";

const inputClass =
  "w-full p-2 rounded-sm bg-neutral-950 text-neutral-50 focus:outline-none border border-neutral-950 focus:ring-1 focus:ring-green-500 transition ease-in-out duration-300 shadow-md focus:shadow-green-500/20 mb-1";

const Field = ({ label, error, ...props }) => {
  const id = useId();
  return (
    <div className="my-4">
      <label htmlFor={id} className="block text-sm mb-1 text-green-500">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        {...props}
      />
      {error && (
        <p id={`${id}-err`} className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default Field;
