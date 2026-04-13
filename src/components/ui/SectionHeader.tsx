interface SectionHeaderProps {
  label: string;
  title: string;
  emphasisWord?: string;
  subtitle?: string;
}

export function SectionHeader({
  label,
  title,
  emphasisWord,
  subtitle,
}: SectionHeaderProps): React.ReactElement {
  const renderTitle = (): React.ReactNode => {
    if (!emphasisWord) {
      return title;
    }
    const parts = title.split(emphasisWord);
    return (
      <>
        {parts[0]}
        <em className="text-accent">{emphasisWord}</em>
        {parts[1] ?? ""}
      </>
    );
  };

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
        {label}
      </p>
      <h1 className="font-serif text-[32px] leading-tight">
        {renderTitle()}
      </h1>
      {subtitle && (
        <p className="text-[15px] text-text-secondary max-w-[480px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
