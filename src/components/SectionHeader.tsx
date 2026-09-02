type Props = {
  entry: string;
  title: string;
  intro?: string;
};

export default function SectionHeader({ entry, title, intro }: Props) {
  return (
    <div className="reveal mb-12 grid gap-6 border-b border-border pb-8 md:grid-cols-12 md:items-end">
      <div className="md:col-span-4">
        <p className="eyebrow">{entry}</p>
      </div>
      <div className="md:col-span-8">
        <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-[44px]">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-muted">{intro}</p>}
      </div>
    </div>
  );
}
