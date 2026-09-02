import { useCountUp } from "../lib/useCountUp";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

function Stat({
  value,
  suffix,
  label,
  onLabelChange,
}: {
  value: number;
  suffix: string;
  label: string;
  onLabelChange: (v: string) => void;
}) {
  const { value: v, nodeRef } = useCountUp(value);
  return (
    <div className="flex flex-col items-start gap-2 py-8">
      <div
        ref={nodeRef as React.RefObject<HTMLDivElement>}
        className="font-display text-4xl font-bold text-ink sm:text-5xl"
      >
        {v}
        <span className="text-primary">{suffix}</span>
      </div>
      <EditableText
        as="div"
        className="eyebrow"
        value={label}
        onChange={onLabelChange}
      />
    </div>
  );
}

export default function StatStrip() {
  const { data, setNestedField } = useSite();
  const s = data.stats;

  return (
    <section className="border-y border-border bg-surface">
      <div className="container-x grid grid-cols-2 gap-x-8 md:grid-cols-4 md:divide-x md:divide-border">
        <div className="md:pr-8">
          <Stat
            value={s.stat1.value}
            suffix={s.stat1.suffix}
            label={s.stat1.label}
            onLabelChange={(v) => setNestedField("stats.stat1.label", v)}
          />
        </div>
        <div className="md:px-8">
          <Stat
            value={s.stat2.value}
            suffix={s.stat2.suffix}
            label={s.stat2.label}
            onLabelChange={(v) => setNestedField("stats.stat2.label", v)}
          />
        </div>
        <div className="md:px-8">
          <Stat
            value={s.stat3.value}
            suffix={s.stat3.suffix}
            label={s.stat3.label}
            onLabelChange={(v) => setNestedField("stats.stat3.label", v)}
          />
        </div>
        <div className="md:pl-8">
          <Stat
            value={s.stat4.value}
            suffix={s.stat4.suffix}
            label={s.stat4.label}
            onLabelChange={(v) => setNestedField("stats.stat4.label", v)}
          />
        </div>
      </div>
    </section>
  );
}
