import { useState, FormEvent } from "react";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Youtube } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
};

const SERVICES = [
  "Social Media Marketing",
  "Facebook Ads",
  "Google Ads (PPC)",
  "SEO Optimization",
  "WordPress Design",
  "Email Marketing",
  "Content Marketing",
  "Lead Generation",
  "অন্যান্য",
];

const BUDGETS = [
  "৳১০,০০০ এর কম",
  "৳১০,০০০ – ৳৩০,০০০",
  "৳৩০,০০০ – ৳৬০,০০০",
  "৳৬০,০০০ – ৳১,০০,০০০",
  "৳১,০০,০০০+",
];

const TIMELINES = ["এখনই শুরু", "১-২ সপ্তাহের মধ্যে", "১ মাসের মধ্যে", "শুধু আলাপ / পরামর্শ"];

const errClass = "mt-1 text-xs text-red-500";

export default function Contact() {
  const { data, setNestedField } = useSite();
  const c = data.contact;
  const waNumber = (c.whatsapp || "").replace(/\D/g, "");
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function validate(f: FormState) {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!f.name.trim()) e.name = "নাম দিন";
    if (!f.email.trim()) e.email = "ইমেইল দিন";
    else if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "সঠিক ইমেইল দিন";
    if (!f.message.trim()) e.message = "প্রজেক্ট সম্পর্কে সংক্ষেপে লিখুন";
    return e;
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;
    setSent(true);
  }

  return (
    <section id="contact" className="border-t border-border bg-surface py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          entry="এন্ট্রি ০৬ · যোগাযোগ"
          title="চলুন কাজ শুরু করি।"
          intro={c.formIntro}
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left — quick contact */}
          <aside className="reveal space-y-6 lg:col-span-4">
            <a
              href={`https://wa.me/88${waNumber}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-bg p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
            >
              <MessageCircle size={22} className="mt-0.5 text-primary" />
              <div>
                <div className="eyebrow">WhatsApp</div>
                <EditableText
                  as="div"
                  className="mt-1 font-display text-lg font-semibold text-ink group-hover:text-primary"
                  value={c.whatsapp}
                  onChange={(v) => setNestedField("contact.whatsapp", v)}
                />
              </div>
            </a>

            <a
              href={`mailto:${c.email}`}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-bg p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
            >
              <Mail size={22} className="mt-0.5 text-primary" />
              <div>
                <div className="eyebrow">Email</div>
                <EditableText
                  as="div"
                  className="mt-1 font-display text-lg font-semibold text-ink group-hover:text-primary"
                  value={c.email}
                  onChange={(v) => setNestedField("contact.email", v)}
                />
              </div>
            </a>

            <div className="rounded-2xl border border-border bg-bg p-5 shadow-card">
              <div className="eyebrow">সোশ্যাল</div>
              <div className="mt-4 flex items-center gap-3">
                {[
                  { icon: Facebook, href: c.facebookUrl, label: "Facebook" },
                  { icon: Instagram, href: c.instagramUrl, label: "Instagram" },
                  { icon: Linkedin, href: c.linkedinUrl, label: "LinkedIn" },
                  { icon: Youtube, href: c.youtubeUrl, label: "YouTube" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted transition hover:border-primary hover:text-primary"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted/70">
                [ সোশ্যাল URL অ্যাডমিন বার / JSON export থেকে আপডেট করুন ]
              </p>
            </div>
          </aside>

          {/* Right — form */}
          <form
            noValidate
            onSubmit={onSubmit}
            className="reveal rounded-2xl border border-border bg-bg p-6 shadow-card sm:p-8 lg:col-span-8"
          >
            {sent ? (
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink">ধন্যবাদ!</h3>
                <p className="mt-2 text-muted">
                  আপনার বার্তা পেয়েছি। ২৪ ঘণ্টার মধ্যে যোগাযোগ করবো।
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted/70">
                  [ ফ্রন্টএন্ড validation — backend পরে যোগ হবে ]
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initial);
                    setSent(false);
                  }}
                  className="btn-outline mt-6"
                >
                  আরেকটা বার্তা পাঠান
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="name">
                      নাম *
                    </label>
                    <input
                      id="name"
                      className="field"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="আপনার পুরো নাম"
                    />
                    {errors.name && <p className={errClass}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label" htmlFor="email">
                      ইমেইল *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="field"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className={errClass}>{errors.email}</p>}
                  </div>
                  <div>
                    <label className="label" htmlFor="phone">
                      ফোন / WhatsApp
                    </label>
                    <input
                      id="phone"
                      className="field"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="company">
                      কোম্পানি / ব্র্যান্ড
                    </label>
                    <input
                      id="company"
                      className="field"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="যদি থাকে"
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="service">
                      সার্ভিস
                    </label>
                    <select
                      id="service"
                      className="field"
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                    >
                      <option value="">সার্ভিস নির্বাচন</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label" htmlFor="budget">
                      মাসিক বাজেট
                    </label>
                    <select
                      id="budget"
                      className="field"
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                    >
                      <option value="">বাজেট নির্বাচন</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="timeline">
                      টাইমলাইন
                    </label>
                    <select
                      id="timeline"
                      className="field"
                      value={form.timeline}
                      onChange={(e) => update("timeline", e.target.value)}
                    >
                      <option value="">কখন শুরু করতে চান</option>
                      {TIMELINES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="message">
                      প্রজেক্ট বিবরণ *
                    </label>
                    <textarea
                      id="message"
                      className="field min-h-[140px] resize-y"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="আপনার ব্র্যান্ড, লক্ষ্য ও চ্যালেঞ্জ সংক্ষেপে লিখুন..."
                    />
                    {errors.message && <p className={errClass}>{errors.message}</p>}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button type="submit" className="btn-primary">
                    বার্তা পাঠান
                  </button>
                  <a
                    href={`https://wa.me/88${waNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-wa"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                  <a href={`mailto:${c.email}`} className="btn-outline">
                    <Mail size={16} />
                    Email
                  </a>
                </div>
                <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted/70">
                  [ এই ফর্ম এখন শুধু frontend validation করে — backend পরে যোগ হবে ]
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
