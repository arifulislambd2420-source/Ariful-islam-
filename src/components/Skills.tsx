import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

function SkillItem({
  name,
  value,
  index,
  onNameChange,
}: {
  name: string;
  value: number;
  index: number;
  onNameChange: (v: string) => void;
}) {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // stagger the fill slightly for a nicer feel
            const delay = index * 90;
            setTimeout(() => setW(value), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, index]);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-white/[0.08]"
    >
      {/* subtle hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
      />

      <div className="relative mb-3 flex items-baseline justify-between gap-3">
        <EditableText
          as="span"
          className="text-[14px] font-semibold text-white transition-colors group-hover:text-cyan"
          value={name}
          onChange={onNameChange}
        />
        <span
          className="tabular-nums font-display text-[15px] font-bold text-gradient"
          aria-label={`${w} percent`}
        >
          {w}%
        </span>
      </div>

      {/* Track */}
      <div className="relative h-[8px] w-full overflow-hidden rounded-full bg-white/10">
        {/* fill */}
        <div
          className="relative h-full rounded-full shadow-glow transition-[width] duration-[1500ms] ease-out"
          style={{
            width: `${w}%`,
            background: "linear-gradient(90deg, #2563EB 0%, #22D3EE 100%)",
          }}
        >
          {/* moving shimmer */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const { data, updateData } = useSite();

  const updateSkillName = (i: number, val: string) => {
    updateData((prev) => {
      const next = [...prev.skills];
      next[i] = { ...next[i], name: val };
      return { ...prev, skills: next };
    });
  };

  return (
    <section
      className="relative overflow-hidden py-24 text-on-navy sm:py-28"
      style={{
        background:
          "linear-gradient(180deg, #0a0e1a 0%, #0f1730 50%, #131c2e 100%)",
      }}
    >
      {/* soft accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-primary opacity-15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-24 h-[380px] w-[380px] rounded-full bg-cyan opacity-15 blur-[120px]"
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="reveal mx-auto mb-14 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 backdrop-blur">
            <Sparkles size={13} className="text-cyan" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cyan">
              এন্ট্রি ০৪ · স্কিল
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            যে টুল ও <span className="text-gradient">স্কিলে</span> দক্ষ।
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-on-navy-muted">
            নিচের শতাংশগুলো আপেক্ষিক দক্ষতার ইঙ্গিত — প্রতিটাই বাস্তব প্রজেক্টে
            ব্যবহৃত।
          </p>
        </div>

        {/* Skills grid */}
        <div className="reveal grid grid-cols-1 gap-5 md:grid-cols-2">
          {data.skills.map((s, i) => (
            <SkillItem
              key={i}
              index={i}
              name={s.name}
              value={s.value}
              onNameChange={(v) => updateSkillName(i, v)}
            />
          ))}
        </div>

        <p className="reveal mt-8 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-on-navy-muted/60">
          [ শতাংশ মান অ্যাডমিন এডিট মোডে নেই — animation trigger অক্ষত রাখার জন্য ]
        </p>
      </div>
    </section>
  );
}
