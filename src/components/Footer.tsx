import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { data } = useSite();
  const c = data.contact;
  const waNumber = (c.whatsapp || "").replace(/\D/g, "");

  return (
    <footer className="border-t border-border bg-navy text-on-navy">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2 font-display text-xl font-bold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-cta-gradient text-white shadow-glow">
              A
            </span>
            Ariful<span className="text-cyan">.</span>
          </div>
          <p className="mt-4 max-w-sm text-on-navy-muted">
            ফ্রিল্যান্স ডিজিটাল মার্কেটার · {c.location || "ঢাকা, বাংলাদেশ"}। ব্র্যান্ড
            বাড়ানোর কাজে যেকোনো সময় নক দিন।
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow-on-navy mb-4">নেভিগেশন</div>
          <ul className="space-y-2 text-on-navy-muted">
            {[
              ["#home", "হোম"],
              ["#services", "সার্ভিস"],
              ["#work", "পোর্টফোলিও"],
              ["#about", "সম্পর্কে"],
              ["#contact", "যোগাযোগ"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-cyan">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="eyebrow-on-navy mb-4">যোগাযোগ</div>
          <ul className="space-y-2 text-on-navy-muted">
            <li>
              <a
                href={`https://wa.me/88${waNumber}`}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-cyan"
              >
                WhatsApp —{" "}
                <EditableText
                  as="span"
                  value={c.whatsapp}
                  onChange={() => {
                    /* editable via Contact section — noop here */
                  }}
                />
              </a>
            </li>
            <li>
              <a href={`mailto:${c.email}`} className="transition-colors hover:text-cyan">
                {c.email}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex items-center gap-2">
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
                className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-on-navy-muted transition hover:border-cyan hover:text-cyan"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-on-navy-muted">
            © {YEAR} Ariful Islam · সব অধিকার সংরক্ষিত
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-on-navy-muted">
            Freelance Digital Marketer · {c.location || "Dhaka"}
          </p>
        </div>
      </div>
    </footer>
  );
}
