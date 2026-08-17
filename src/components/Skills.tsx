import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";

const SKILLS = [
  { name: "Social Media Marketing", value: 90 },
  { name: "SEO Optimization", value: 85 },
  { name: "Facebook / Google Ads", value: 88 },
  { name: "Content Writing", value: 80 },
  { name: "Lead Generation", value: 78 },
  { name: "WordPress", value: 75 },
];

function Bar({ name, value }: { name: string; value: number }) {
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
    <div ref={ref} className="border-b border-hairline py-5">
      <div className="mb-2 flex items-baseline justify-between font-mono">
        <span className="text-[13px] uppercase tracking-widest2 text-text">{name}</span>
        <span className="text-[12px] text-accent">{w}%</span>
      </div>
      <div className="h-[3px] w-full overflow-hidden bg-hairline">
        <div
          className="h-full bg-accent transition-[width] duration-[1400ms] ease-out"
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="border-t border-hairline bg-panel/30 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          entry="এন্ট্রি ০৪ · স্কিল"
          title="যে টুল ও স্কিলে দক্ষ।"
          intro="নিচের শতাংশগুলো আপেক্ষিক দক্ষতার ইঙ্গিত — প্রতিটাই বাস্তব প্রজেক্টে ব্যবহৃত।"
        />
        <div className="reveal grid gap-x-12 md:grid-cols-2">
          {SKILLS.map((s) => (
            <Bar key={s.name} {...s} />
          ))}
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-widest2 text-muted/70">
          [ শতাংশগুলো আনুমানিক — চূড়ান্ত সংখ্যা পরে আপডেট হবে ]
        </p>
      </div>
    </section>
  );
}
