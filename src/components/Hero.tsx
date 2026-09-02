import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Sparkles,
  User,
} from "lucide-react";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";
import { EditableImage } from "./admin/EditableImage";

export default function Hero() {
  const { data, setNestedField } = useSite();
  const h = data.hero;
  const c = data.contact;
  const waNumber = (c.whatsapp || "").replace(/\D/g, "");

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-16 text-on-navy sm:pt-32 sm:pb-24"
      style={{
        background:
          "linear-gradient(135deg, #0a0e1a 0%, #0f1730 50%, #131c2e 100%)",
      }}
    >
      {/* Soft radial glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-primary opacity-25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-16 h-[420px] w-[420px] rounded-full bg-cyan opacity-20 blur-[120px]"
      />
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* LEFT COLUMN */}
          <div className="reveal lg:col-span-7">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 backdrop-blur">
              <Sparkles size={13} className="text-cyan" />
              <EditableText
                as="span"
                className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cyan"
                value={h.eyebrow}
                onChange={(v) => setNestedField("hero.eyebrow", v)}
              />
            </div>

            {/* H1 — 2 lines, second line accent gradient */}
            <h1 className="mt-6 font-display text-[42px] font-bold leading-[1.05] sm:text-6xl lg:text-[72px]">
              <EditableText
                as="span"
                className="block text-white"
                value={`${h.titleLine1}`}
                onChange={(v) => setNestedField("hero.titleLine1", v)}
              />
              <span className="mt-1 block">
                <EditableText
                  as="span"
                  className="text-gradient"
                  value={h.titleAccent}
                  onChange={(v) => setNestedField("hero.titleAccent", v)}
                />{" "}
                <EditableText
                  as="span"
                  className="text-gradient"
                  value={h.titleLine2}
                  onChange={(v) => setNestedField("hero.titleLine2", v)}
                />
              </span>
            </h1>

            {/* Description */}
            <EditableText
              as="p"
              className="mt-6 block max-w-xl text-lg leading-relaxed text-on-navy-muted"
              value={h.description}
              onChange={(v) => setNestedField("hero.description", v)}
              multiline
            />

            {/* CTA + social */}
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href={`https://wa.me/88${waNumber}`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={16} />
                <EditableText
                  as="span"
                  value={h.waButtonText}
                  onChange={(v) => setNestedField("hero.waButtonText", v)}
                />
              </a>

              <div className="flex items-center gap-2">
                {[
                  {
                    icon: Facebook,
                    href: c.facebookUrl || "#",
                    label: "Facebook",
                  },
                  {
                    icon: Linkedin,
                    href: c.linkedinUrl || "#",
                    label: "LinkedIn",
                  },
                  {
                    icon: Instagram,
                    href: c.instagramUrl || "#",
                    label: "Instagram",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-on-navy backdrop-blur transition hover:border-cyan hover:bg-cyan/10 hover:text-cyan"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — profile image with glow */}
          <div className="reveal relative lg:col-span-5">
            <div className="relative mx-auto aspect-square w-[280px] sm:w-[340px] lg:w-[400px]">
              {/* Outer glow layers */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full bg-cta-gradient opacity-40 blur-[60px]"
              />
              <div
                aria-hidden
                className="absolute inset-4 rounded-full bg-cyan opacity-15 blur-[40px]"
              />

              {/* Dashed orbit ring */}
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 h-full w-full animate-spin-slow text-cyan/50"
                aria-hidden
              >
                <circle
                  cx="200"
                  cy="200"
                  r="195"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 8"
                />
                <circle cx="395" cy="200" r="5" fill="#22D3EE" />
              </svg>

              {/* Gradient border ring */}
              <div
                aria-hidden
                className="absolute inset-3 rounded-full p-[2px]"
                style={{
                  background:
                    "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
                }}
              >
                <div className="h-full w-full rounded-full bg-navy" />
              </div>

              {/* Portrait */}
              <div className="absolute inset-5 overflow-hidden rounded-full bg-navy-2">
                <EditableImage
                  src={h.profileImage}
                  alt="Ariful Islam profile"
                  onChange={(v) => setNestedField("hero.profileImage", v)}
                  containerClassName="relative w-full h-full"
                  className="h-full w-full object-cover"
                  fallbackIcon={
                    <div className="flex h-full w-full items-center justify-center text-on-navy-muted">
                      <div className="text-center">
                        <User size={64} className="mx-auto opacity-50" />
                        <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em]">
                          প্রোফাইল ছবি
                          <br />
                          <span className="text-on-navy-muted/60">
                            [placeholder]
                          </span>
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>

              {/* Available-for-work chip */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-navy/90 px-4 py-2 shadow-xl backdrop-blur">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
                  </span>
                  <EditableText
                    as="span"
                    value={h.statusText}
                    onChange={(v) => setNestedField("hero.statusText", v)}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAR — 3 cards */}
        <div className="reveal mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {[
            {
              value: h.yearsExp,
              label: "বছর অভিজ্ঞতা",
              onChange: (v: string) => setNestedField("hero.yearsExp", v),
              accent: false,
            },
            {
              value: h.clientsCount,
              label: "প্রতিষ্ঠান / ক্লায়েন্ট",
              onChange: (v: string) => setNestedField("hero.clientsCount", v),
              accent: false,
            },
            {
              value: h.successRate,
              label: "ফলাফল-ভিত্তিক",
              onChange: (v: string) => setNestedField("hero.successRate", v),
              accent: true,
            },
          ].map((s, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-white/[0.07]"
            >
              {/* subtle hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
              />
              <EditableText
                as="div"
                className={`font-display text-3xl font-bold sm:text-4xl ${
                  s.accent ? "text-gradient" : "text-white"
                }`}
                value={s.value}
                onChange={s.onChange}
              />
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
