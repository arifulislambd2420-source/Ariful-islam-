import { ArrowUpRight, Briefcase, Sparkles } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

// Decorative gradient palettes rotated per card (kept static — cosmetic only)
const THUMB_GRADIENTS = [
  "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
  "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
  "linear-gradient(135deg, #059669 0%, #22D3EE 100%)",
  "linear-gradient(135deg, #D97706 0%, #F43F5E 100%)",
];

export default function Work() {
  const { data, updateData } = useSite();

  const updateWork = (
    i: number,
    field: "role" | "company" | "period" | "summary",
    val: string
  ) => {
    updateData((prev) => {
      const next = [...prev.works];
      next[i] = { ...next[i], [field]: val };
      return { ...prev, works: next };
    });
  };

  return (
    <section
      id="work"
      className="relative overflow-hidden py-24 text-on-navy sm:py-28"
      style={{
        background:
          "linear-gradient(180deg, #0a0e1a 0%, #0f1730 50%, #131c2e 100%)",
      }}
    >
      {/* soft accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-16 h-[440px] w-[440px] rounded-full bg-primary opacity-15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-32 h-[380px] w-[380px] rounded-full bg-cyan opacity-15 blur-[120px]"
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="reveal mx-auto mb-14 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 backdrop-blur">
            <Sparkles size={13} className="text-cyan" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cyan">
              এন্ট্রি ০২ · কেস / অভিজ্ঞতা
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            যেসব <span className="text-gradient">ব্র্যান্ডের</span> সাথে কাজ করেছি।
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-on-navy-muted">
            বাস্তব ব্যবসার জন্য বাস্তব রেজাল্ট — ছোট শপ থেকে পাবলিকেশন হাউস পর্যন্ত।
          </p>
        </div>

        {/* Card grid */}
        <div className="reveal grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.works.map((w, i) => {
            const monogram = (w.company || "?").trim().charAt(0);
            const gradient = THUMB_GRADIENTS[i % THUMB_GRADIENTS.length];
            return (
              <article
                key={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/50 hover:bg-white/[0.08] hover:shadow-glow"
              >
                {/* Thumbnail / preview area */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden"
                  style={{ background: gradient }}
                >
                  {/* decorative grid pattern */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "36px 36px",
                    }}
                  />
                  {/* soft glow blob */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-14 -right-10 h-40 w-40 rounded-full bg-white opacity-20 blur-3xl"
                  />

                  {/* Monogram */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="select-none font-display text-[92px] font-bold leading-none text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                      style={{ textShadow: "0 4px 24px rgba(0,0,0,0.25)" }}
                    >
                      {monogram}
                    </span>
                  </div>

                  {/* Case index badge (top-left) */}
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3 py-1 backdrop-blur">
                    <Briefcase size={12} className="text-white" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      কেস — {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Period pill (top-right) */}
                  <div className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/25 px-3 py-1 backdrop-blur">
                    <EditableText
                      as="span"
                      className="text-[11px] font-semibold text-white"
                      value={w.period}
                      onChange={(v) => updateWork(i, "period", v)}
                    />
                  </div>

                  {/* Tags row (bottom) */}
                  <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5">
                    {w.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/25 bg-black/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="relative flex flex-1 flex-col p-6">
                  <EditableText
                    as="h3"
                    className="block font-display text-xl font-bold text-white transition-colors group-hover:text-cyan"
                    value={w.company}
                    onChange={(v) => updateWork(i, "company", v)}
                  />
                  <EditableText
                    as="div"
                    className="mt-1 text-[13px] font-medium text-on-navy-muted"
                    value={w.role}
                    onChange={(v) => updateWork(i, "role", v)}
                  />
                  <EditableText
                    as="p"
                    className="mt-4 block text-sm leading-relaxed text-on-navy-muted"
                    value={w.summary}
                    onChange={(v) => updateWork(i, "summary", v)}
                    multiline
                  />

                  {/* Arrow (hover slides) */}
                  <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted transition-colors group-hover:text-cyan">
                      বিস্তারিত দেখুন
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-on-navy-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-cyan"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="reveal mt-8 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-on-navy-muted/60">
          [ নোট — বিস্তারিত কেস স্টাডি ও রেজাল্ট মেট্রিক পরে যোগ করা হবে ]
        </p>
      </div>
    </section>
  );
}
