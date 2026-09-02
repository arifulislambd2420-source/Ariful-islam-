import { Compass, Palette, Rocket, ShieldCheck, LucideIcon, Sparkles } from "lucide-react";
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
    <section
      id="about"
      className="relative overflow-hidden py-24 text-on-navy sm:py-28"
      style={{
        background:
          "linear-gradient(180deg, #131c2e 0%, #0f1730 50%, #0a0e1a 100%)",
      }}
    >
      {/* soft accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-primary opacity-15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-24 h-[380px] w-[380px] rounded-full bg-cyan opacity-15 blur-[120px]"
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="reveal mx-auto mb-16 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 backdrop-blur">
            <Sparkles size={13} className="text-cyan" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cyan">
              এন্ট্রি ০৩ · প্রসেস
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            আমি যেভাবে <span className="text-gradient">কাজ</span> করি।
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-on-navy-muted">
            প্রতিটা প্রজেক্টে একই ৪ ধাপের কাঠামো — যাতে ফলাফল অনুমেয় হয়।
          </p>
        </div>

        {/* Timeline */}
        <div className="reveal relative">
          {/* Horizontal dashed connector (desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[12%] right-[12%] top-[52px] hidden lg:block"
            style={{
              height: "2px",
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(34,211,238,0.35) 0 8px, transparent 8px 16px)",
            }}
          />

          <ol className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
            {data.process.map((step, i) => {
              const Icon = STEP_ICONS[i] || Compass;
              return (
                <li key={i} className="relative flex flex-col items-center text-center">
                  {/* Number badge (top) */}
                  <div className="group/num relative z-10">
                    <div className="absolute inset-0 rounded-full bg-cta-gradient opacity-0 blur-2xl transition-opacity duration-500 group-hover/num:opacity-40" />
                    <div
                      className="relative grid h-[104px] w-[104px] place-items-center rounded-full border border-white/15 bg-navy-2 shadow-xl transition-transform duration-300 group-hover/num:scale-110"
                    >
                      <EditableText
                        as="span"
                        className="block font-display text-4xl font-bold text-white transition-all duration-300 group-hover/num:bg-cta-gradient group-hover/num:bg-clip-text group-hover/num:text-transparent"
                        value={step.n}
                        onChange={(v) => updateStep(i, "n", v)}
                      />
                    </div>
                  </div>

                  {/* Vertical connector to next card (mobile / tablet only) */}
                  {i < data.process.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute left-1/2 top-[104px] h-8 w-px -translate-x-1/2 lg:hidden"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(180deg, rgba(34,211,238,0.4) 0 6px, transparent 6px 12px)",
                      }}
                    />
                  )}

                  {/* Card body */}
                  <div className="group mt-6 w-full flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:bg-white/[0.08] hover:shadow-glow">
                    {/* subtle hover glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                    />

                    <div className="relative">
                      {/* Small icon chip */}
                      <div className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-cyan transition-colors group-hover:border-cyan/50 group-hover:text-cyan">
                        <Icon size={20} strokeWidth={2} />
                      </div>

                      <EditableText
                        as="h3"
                        className="block font-display text-xl font-semibold text-white transition-colors group-hover:text-cyan"
                        value={step.title}
                        onChange={(v) => updateStep(i, "title", v)}
                      />
                      <EditableText
                        as="p"
                        className="mt-3 block text-sm leading-relaxed text-on-navy-muted"
                        value={step.desc}
                        onChange={(v) => updateStep(i, "desc", v)}
                        multiline
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
