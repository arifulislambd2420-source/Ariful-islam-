import { Quote, Sparkles, Star } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
  "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
  "linear-gradient(135deg, #059669 0%, #22D3EE 100%)",
  "linear-gradient(135deg, #D97706 0%, #F43F5E 100%)",
];

export default function Testimonials() {
  const { data, updateData } = useSite();

  const updateTestimonial = (
    i: number,
    field: "text" | "name" | "role",
    val: string
  ) => {
    updateData((prev) => {
      const next = [...prev.testimonials];
      next[i] = { ...next[i], [field]: val };
      return { ...prev, testimonials: next };
    });
  };

  return (
    <section
      className="relative overflow-hidden py-24 text-on-navy sm:py-28"
      style={{
        background:
          "linear-gradient(180deg, #131c2e 0%, #0f1730 50%, #0a0e1a 100%)",
      }}
    >
      {/* soft accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-primary opacity-15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-16 h-[380px] w-[380px] rounded-full bg-cyan opacity-15 blur-[120px]"
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="reveal mx-auto mb-14 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 backdrop-blur">
            <Sparkles size={13} className="text-cyan" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cyan">
              এন্ট্রি ০৫ · রিভিউ
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            ক্লায়েন্টরা কী <span className="text-gradient">বলেন।</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-on-navy-muted">
            বাস্তব ক্লায়েন্টদের অভিজ্ঞতা ও রেজাল্ট।
          </p>
        </div>

        {/* Grid of testimonials */}
        <div className="reveal grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.testimonials.map((t, i) => {
            const initial = (t.name || "?").trim().charAt(0);
            const avatarBg = AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length];
            return (
              <figure
                key={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:bg-white/[0.08] hover:shadow-glow sm:p-8"
              >
                {/* subtle hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                />

                {/* Quote icon top-left + rating stars top-right */}
                <div className="relative flex items-start justify-between">
                  <div
                    className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-glow"
                    style={{ background: avatarBg }}
                  >
                    <Quote size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        size={14}
                        className="fill-cyan text-cyan"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </div>

                {/* Quote text */}
                <blockquote className="relative mt-6 flex-1 text-base leading-relaxed text-on-navy">
                  “
                  <EditableText
                    as="span"
                    value={t.text}
                    onChange={(v) => updateTestimonial(i, "text", v)}
                    multiline
                  />
                  ”
                </blockquote>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                {/* Author block */}
                <figcaption className="relative flex items-center gap-4">
                  {/* Avatar with initial */}
                  <div className="relative">
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-40 blur-lg"
                      style={{ background: avatarBg }}
                    />
                    <div
                      className="relative grid h-12 w-12 place-items-center rounded-full text-white shadow-lg"
                      style={{ background: avatarBg }}
                    >
                      <span className="font-display text-lg font-bold">
                        {initial}
                      </span>
                    </div>
                  </div>
                  {/* Name + role */}
                  <div className="min-w-0 flex-1">
                    <EditableText
                      as="div"
                      className="block truncate font-display text-base font-semibold text-white"
                      value={t.name}
                      onChange={(v) => updateTestimonial(i, "name", v)}
                    />
                    <EditableText
                      as="div"
                      className="mt-0.5 block truncate text-[12px] font-medium text-on-navy-muted"
                      value={t.role}
                      onChange={(v) => updateTestimonial(i, "role", v)}
                    />
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
