import {
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Youtube,
} from "lucide-react";
import { useSite } from "../context/SiteContext";

const YEAR = new Date().getFullYear();

const NAV_LINKS: Array<[string, string]> = [
  ["#home", "হোম"],
  ["#services", "সার্ভিস"],
  ["#work", "পোর্টফোলিও"],
  ["#about", "সম্পর্কে"],
  ["#contact", "যোগাযোগ"],
];

export default function Footer() {
  const { data } = useSite();
  const c = data.contact;
  const waNumber = (c.whatsapp || "").replace(/\D/g, "");

  return (
    <footer
      className="relative overflow-hidden text-on-navy"
      style={{ backgroundColor: "#080b16" }}
    >
      {/* subtle top accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[300px] w-[720px] -translate-x-1/2 rounded-full bg-primary opacity-15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-40 h-[280px] w-[280px] rounded-full bg-cyan opacity-10 blur-[120px]"
      />
      {/* gradient hairline at top */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.5) 50%, transparent 100%)",
        }}
      />

      <div className="container-x relative">
        {/* Main grid */}
        <div className="grid gap-10 py-16 md:grid-cols-12">
          {/* LEFT — brand */}
          <div className="md:col-span-5">
            <a href="#home" className="inline-flex items-center gap-3">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-glow"
                style={{
                  background:
                    "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
                }}
              >
                <span className="font-display text-lg font-bold">A</span>
              </span>
              <span className="font-display text-xl font-bold text-white">
                Ariful<span className="text-cyan">.</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-on-navy-muted">
              ফ্রিল্যান্স ডিজিটাল মার্কেটার · {c.location || "ঢাকা, বাংলাদেশ"}। ব্র্যান্ড
              বাড়ানোর কাজে যেকোনো সময় নক দিন — Meta Ads, Google Ads, SEO, WordPress।
            </p>

            {/* Available chip */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan">
                Available for new projects
              </span>
            </div>
          </div>

          {/* MIDDLE — quick links */}
          <div className="md:col-span-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan">
              নেভিগেশন
            </div>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-2 text-[15px] text-on-navy-muted transition-colors hover:text-cyan"
                  >
                    <span className="h-[2px] w-2 rounded-full bg-white/20 transition-all group-hover:w-4 group-hover:bg-cyan" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — contact + social */}
          <div className="md:col-span-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan">
              যোগাযোগ
            </div>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li>
                <a
                  href={`https://wa.me/88${waNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-start gap-3 text-on-navy-muted transition-colors hover:text-cyan"
                >
                  <MessageCircle
                    size={16}
                    className="mt-[3px] flex-shrink-0 text-on-navy-muted transition-colors group-hover:text-cyan"
                  />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted/70">
                      WhatsApp
                    </span>
                    <span className="mt-0.5 block truncate text-white group-hover:text-cyan">
                      {c.whatsapp}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${c.email}`}
                  className="group inline-flex items-start gap-3 text-on-navy-muted transition-colors hover:text-cyan"
                >
                  <Mail
                    size={16}
                    className="mt-[3px] flex-shrink-0 text-on-navy-muted transition-colors group-hover:text-cyan"
                  />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted/70">
                      Email
                    </span>
                    <span className="mt-0.5 block truncate text-white group-hover:text-cyan">
                      {c.email}
                    </span>
                  </span>
                </a>
              </li>
              <li className="inline-flex items-start gap-3 text-on-navy-muted">
                <MapPin size={16} className="mt-[3px] flex-shrink-0" />
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted/70">
                    Location
                  </span>
                  <span className="mt-0.5 block text-white">{c.location}</span>
                </span>
              </li>
            </ul>

            {/* social row */}
            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: Facebook, label: "Facebook", href: c.facebookUrl },
                { icon: Instagram, label: "Instagram", href: c.instagramUrl },
                { icon: Linkedin, label: "LinkedIn", href: c.linkedinUrl },
                { icon: Youtube, label: "YouTube", href: c.youtubeUrl },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href || "#"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/5 text-on-navy backdrop-blur transition hover:border-cyan hover:bg-cyan/10 hover:text-cyan"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="relative border-t border-white/10">
          <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
            <p className="text-[12px] font-medium text-on-navy-muted">
              © {YEAR} <span className="text-white">Ariful Islam</span> · সব
              অধিকার সংরক্ষিত
            </p>
            <p className="inline-flex items-center gap-1.5 text-[12px] text-on-navy-muted">
              Crafted with{" "}
              <Heart size={12} className="fill-red-500 text-red-500" /> in{" "}
              {c.location || "Dhaka"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
