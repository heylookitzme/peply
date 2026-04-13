interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export function Card({
  children,
  className = "",
  padding = "md",
}: CardProps): React.ReactElement {
  return (
    <div
      className={`bg-surface border border-border rounded-[10px] ${paddingMap[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
