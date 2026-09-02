import { Compass, Palette, Rocket, ShieldCheck, LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

const STEP_ICONS: LucideIcon[] = [Compass, Palette, Rocket, ShieldCheck];

export default function Process() {
  const { data, updateData } = useSite();

  const updateStep = (i: number, field: "title" | "desc" | "n", val: string) => {
    updateData((prev) => {
      const next = [...prev.process];
      next[i] = { ...next[i], [field]: val };
      return { ...prev, process: next };
    });
  };

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          entry="এন্ট্রি ০৩ · প্রসেস"
          title="আমি যেভাবে কাজ করি।"
          intro="প্রতিটা প্রজেক্টে একই ৪ ধাপের কাঠামো — যাতে ফলাফল অনুমেয় হয়।"
        />

        <ol className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.process.map((step, i) => {
            const Icon = STEP_ICONS[i] || Compass;
            return (
              <li
                key={i}
                className="relative rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between">
                  <EditableText
                    as="span"
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted"
                    value={`Step / ${step.n}`}
                    onChange={(v) => updateStep(i, "n", v.replace(/^Step \/ /, ""))}
                  />
                  <Icon size={20} className="text-primary" />
                </div>
                <EditableText
                  as="h3"
                  className="mt-6 block font-display text-2xl font-semibold text-ink"
                  value={step.title}
                  onChange={(v) => updateStep(i, "title", v)}
                />
                <EditableText
                  as="p"
                  className="mt-3 block text-sm text-muted"
                  value={step.desc}
                  onChange={(v) => updateStep(i, "desc", v)}
                  multiline
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
