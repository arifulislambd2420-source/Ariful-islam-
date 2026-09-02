import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

function Bar({
  name,
  value,
  onNameChange,
}: {
  name: string;
  value: number;
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
            setW(value);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="border-b border-border py-5">
      <div className="mb-2 flex items-baseline justify-between">
        <EditableText
          as="span"
          className="text-[14px] font-medium text-ink"
          value={name}
          onChange={onNameChange}
        />
        <span className="text-[13px] font-semibold text-primary">{w}%</span>
      </div>
      <div className="h-[6px] w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-cta-gradient transition-[width] duration-[1400ms] ease-out"
          style={{ width: `${w}%` }}
        />
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
    <section className="border-t border-border bg-surface py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          entry="এন্ট্রি ০৪ · স্কিল"
          title="যে টুল ও স্কিলে দক্ষ।"
          intro="নিচের শতাংশগুলো আপেক্ষিক দক্ষতার ইঙ্গিত — প্রতিটাই বাস্তব প্রজেক্টে ব্যবহৃত।"
        />
        <div className="reveal grid gap-x-12 md:grid-cols-2">
          {data.skills.map((s, i) => (
            <Bar
              key={i}
              name={s.name}
              value={s.value}
              onNameChange={(v) => updateSkillName(i, v)}
            />
          ))}
        </div>
        <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-muted/70">
          [ শতাংশগুলো আনুমানিক — চূড়ান্ত সংখ্যা পরে আপডেট হবে ]
        </p>
      </div>
    </section>
  );
}
