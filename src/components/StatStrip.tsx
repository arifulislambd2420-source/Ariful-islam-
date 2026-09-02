import { useCountUp } from "../lib/useCountUp";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

function Stat({
  value,
  suffix,
  label,
  onLabelChange,
  accent = false,
}: {
  value: number;
  suffix: string;
  label: string;
  onLabelChange: (v: string) => void;
  accent?: boolean;
}) {
  const { value: v, nodeRef } = useCountUp(value);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:bg-white/[0.08] hover:shadow-glow">
      {/* subtle hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
      />

      <div
        ref={nodeRef as React.RefObject<HTMLDivElement>}
        className={`relative font-display text-4xl font-bold sm:text-5xl ${
          accent ? "text-gradient" : "text-white"
        }`}
      >
        {v}
        <span className={accent ? "text-gradient" : "text-cyan"}>{suffix}</span>
      </div>
      <EditableText
        as="div"
        className="relative mt-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted"
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
    <section
      className="relative overflow-hidden py-16 text-on-navy sm:py-20"
      style={{
        background:
          "linear-gradient(180deg, #131c2e 0%, #131c2e 100%)",
      }}
    >
      {/* soft accent glows to keep continuity with Hero/Services */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-primary opacity-10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-cyan opacity-10 blur-[120px]"
      />
      {/* subtle divider hairlines top & bottom */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
        }}
      />

      <div className="container-x relative">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          <Stat
            value={s.stat1.value}
            suffix={s.stat1.suffix}
            label={s.stat1.label}
            onLabelChange={(v) => setNestedField("stats.stat1.label", v)}
          />
          <Stat
            value={s.stat2.value}
            suffix={s.stat2.suffix}
            label={s.stat2.label}
            onLabelChange={(v) => setNestedField("stats.stat2.label", v)}
          />
          <Stat
            value={s.stat3.value}
            suffix={s.stat3.suffix}
            label={s.stat3.label}
            onLabelChange={(v) => setNestedField("stats.stat3.label", v)}
          />
          <Stat
            value={s.stat4.value}
            suffix={s.stat4.suffix}
            label={s.stat4.label}
            onLabelChange={(v) => setNestedField("stats.stat4.label", v)}
            accent
          />
        </div>
      </div>
    </section>
  );
}
