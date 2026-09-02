import { ArrowRight, MessageCircle, User } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";
import { EditableImage } from "./admin/EditableImage";

export default function Hero() {
  const { data, setNestedField } = useSite();
  const h = data.hero;
  const c = data.contact;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy pt-28 pb-20 text-on-navy sm:pt-32 sm:pb-28"
    >
      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary opacity-20 blur-[120px]"
      />

      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="reveal lg:col-span-7">
          <EditableText
            as="p"
            className="eyebrow-on-navy"
            value={h.eyebrow}
            onChange={(v) => setNestedField("hero.eyebrow", v)}
          />

          <h1 className="mt-5 font-display text-[44px] font-bold leading-[1.05] text-white sm:text-6xl lg:text-[76px]">
            <EditableText
              as="span"
              value={h.titleLine1}
              onChange={(v) => setNestedField("hero.titleLine1", v)}
            />{" "}
            <br />
            <EditableText
              as="span"
              className="text-gradient"
              value={h.titleAccent}
              onChange={(v) => setNestedField("hero.titleAccent", v)}
            />{" "}
            <EditableText
              as="span"
              value={h.titleLine2}
              onChange={(v) => setNestedField("hero.titleLine2", v)}
            />
          </h1>

          <EditableText
            as="p"
            className="mt-6 block max-w-xl font-body text-lg leading-relaxed text-on-navy-muted"
            value={h.description}
            onChange={(v) => setNestedField("hero.description", v)}
            multiline
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/88${(c.whatsapp || "").replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="btn-wa"
            >
              <MessageCircle size={16} />
              <EditableText
                as="span"
                value={h.waButtonText}
                onChange={(v) => setNestedField("hero.waButtonText", v)}
              />
            </a>
            <a href="#work" className="btn-outline-on-navy">
              <EditableText
                as="span"
                value={h.portfolioButtonText}
                onChange={(v) => setNestedField("hero.portfolioButtonText", v)}
              />
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6">
            <div>
              <EditableText
                as="div"
                className="font-display text-2xl font-bold text-white"
                value={h.yearsExp}
                onChange={(v) => setNestedField("hero.yearsExp", v)}
              />
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted">
                বছর অভিজ্ঞতা
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <EditableText
                as="div"
                className="font-display text-2xl font-bold text-white"
                value={h.clientsCount}
                onChange={(v) => setNestedField("hero.clientsCount", v)}
              />
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted">
                ক্লায়েন্ট
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <EditableText
                as="div"
                className="font-display text-2xl font-bold text-cyan"
                value={h.successRate}
                onChange={(v) => setNestedField("hero.successRate", v)}
              />
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted">
                ফলাফল-ভিত্তিক
              </div>
            </div>
          </div>
        </div>

        {/* Portrait with orbit ring */}
        <div className="reveal relative lg:col-span-5">
          <div className="relative mx-auto aspect-square w-[280px] sm:w-[360px] lg:w-[420px]">
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 h-full w-full animate-spin-slow text-cyan/60"
              aria-hidden
            >
              <circle
                cx="200"
                cy="200"
                r="188"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <circle cx="388" cy="200" r="4" fill="#22D3EE" />
            </svg>

            <div className="absolute inset-6 rounded-full border border-white/10" />

            {/* portrait — editable */}
            <div className="absolute inset-10 overflow-hidden rounded-full bg-navy-2">
              <EditableImage
                src={h.profileImage}
                alt="Ariful Islam profile"
                onChange={(v) => setNestedField("hero.profileImage", v)}
                containerClassName="relative w-full h-full"
                className="h-full w-full object-cover"
                fallbackIcon={
                  <div className="flex h-full w-full items-center justify-center text-on-navy-muted">
                    <div className="text-center">
                      <User size={56} className="mx-auto opacity-60" />
                      <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em]">
                        প্রোফাইল ছবি
                        <br />
                        <span className="text-on-navy-muted/60">[placeholder]</span>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>

            {/* status chip */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-navy-2/95 px-4 py-2 backdrop-blur">
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
    </section>
  );
}
