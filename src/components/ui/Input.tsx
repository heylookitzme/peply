import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, id, className = "", ...props }, ref) {
    return (
      <div className="space-y-1.5">
        <label htmlFor={id} className="block text-[13px] font-medium text-text-secondary">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150 ${className}`}
          {...props}
        />
      </div>
    );
  }
);
