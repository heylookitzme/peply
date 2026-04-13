interface DataItem {
  label: string;
  value: string;
  unit?: string;
}

interface DataDisplayProps {
  items: DataItem[];
}

export function DataDisplay({ items }: DataDisplayProps): React.ReactElement {
  return (
    <dl className="grid gap-6 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-secondary">
            {item.label}
          </dt>
          <dd className="mt-1 font-mono text-[28px] font-medium tracking-tight">
            {item.value}
            {item.unit && (
              <span className="text-sm text-text-secondary ml-1">
                {item.unit}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
