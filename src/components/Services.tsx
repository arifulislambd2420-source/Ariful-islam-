import {
  BarChart3,
  Facebook,
  Globe,
  Mail,
  Megaphone,
  PenLine,
  Search,
  Target,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

const ICONS: Record<string, LucideIcon> = {
  Megaphone,
  Facebook,
  BarChart3,
  Search,
  Globe,
  Mail,
  PenLine,
  Target,
};

export default function Services() {
  const { data, updateData } = useSite();

  const updateService = (i: number, field: "title" | "desc", val: string) => {
    updateData((prev) => {
      const next = [...prev.services];
      next[i] = { ...next[i], [field]: val };
      return { ...prev, services: next };
    });
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden py-24 text-on-navy sm:py-28"
      style={{
        background:
          "linear-gradient(180deg, #131c2e 0%, #0f1730 50%, #0a0e1a 100%)",
      }}
    >
      {/* soft accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-[420px] w-[420px] rounded-full bg-primary opacity-15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-20 h-[380px] w-[380px] rounded-full bg-cyan opacity-15 blur-[120px]"
      />

      <div className="container-x relative">
        {/* Custom header (SectionHeader uses light tokens, we style inline for dark bg) */}
        <div className="reveal mx-auto mb-14 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 backdrop-blur">
            <Sparkles size={13} className="text-cyan" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cyan">
              এন্ট্রি ০১ · সার্ভিস
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            যেসব <span className="text-gradient">কাজ</span> ভালো পারি।
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-on-navy-muted">
            ফুল-ফানেল ডিজিটাল মার্কেটিং — awareness থেকে conversion পর্যন্ত প্রতিটা
            স্টেজ কভার করি।
          </p>
        </div>

        {/* Card grid */}
        <div className="reveal grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.services.map((svc, i) => {
            const Icon = ICONS[svc.iconName] || Sparkles;
            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/50 hover:bg-white/[0.08] hover:shadow-glow"
              >
                {/* hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                />

                {/* Icon in gradient circle */}
                <div
                  className="relative grid h-14 w-14 place-items-center rounded-2xl text-white shadow-glow transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
                  }}
                >
                  <Icon size={26} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="relative mt-5">
                  <EditableText
                    as="h3"
                    className="block font-display text-lg font-semibold text-white transition-colors group-hover:text-cyan"
                    value={svc.title}
                    onChange={(v) => updateService(i, "title", v)}
                  />
                  <EditableText
                    as="p"
                    className="mt-2 block text-sm leading-relaxed text-on-navy-muted"
                    value={svc.desc}
                    onChange={(v) => updateService(i, "desc", v)}
                    multiline
                  />
                </div>

                {/* corner index */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-5 top-5 text-[11px] font-semibold tracking-[0.18em] text-white/25"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
