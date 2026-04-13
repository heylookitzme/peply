interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const base =
    "rounded-lg text-[15px] font-medium transition-colors duration-150 cursor-pointer";
  const widthClass = fullWidth ? "w-full" : "";

  const variants = {
    primary:
      "bg-accent text-white px-8 py-3.5 hover:bg-accent-hover",
    ghost:
      "border border-border text-text bg-transparent px-8 py-3.5 hover:border-text-secondary",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
