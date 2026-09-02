import { useState, FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  XCircle,
  Youtube,
} from "lucide-react";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

// ─── Formspree endpoint ─────────────────────────────────────────────
// TODO: Replace YOUR_FORM_ID with the real Formspree form ID after
// creating a form at https://formspree.io — no other code change needed.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
// ─────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  message: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

const initial: FormState = { name: "", email: "", message: "" };
const errClass = "mt-1.5 text-xs font-medium text-red-400";

export default function Contact() {
  const { data, setNestedField } = useSite();
  const c = data.contact;
  const waNumber = (c.whatsapp || "").replace(/\D/g, "");

  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const sent = status === "success";

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
  }

  function validate(f: FormState) {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!f.name.trim()) e.name = "নাম দিন";
    if (!f.email.trim()) e.email = "ইমেইল দিন";
    else if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "সঠিক ইমেইল দিন";
    if (!f.message.trim()) e.message = "প্রজেক্ট সম্পর্কে সংক্ষেপে লিখুন";
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `নতুন লিড: ${form.name}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      // Formspree returns JSON with `errors` array on validation failure
      let msg = "বার্তা পাঠানো যায়নি — আবার চেষ্টা করুন।";
      try {
        const body = await res.json();
        if (body?.errors?.length) {
          msg = body.errors.map((x: { message?: string }) => x.message).filter(Boolean).join(" · ") || msg;
        }
      } catch {
        /* non-JSON response */
      }
      setStatus("error");
      setErrorMsg(msg);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "নেটওয়ার্ক এরর — ইন্টারনেট কানেকশন চেক করে আবার চেষ্টা করুন।"
      );
    }
  }

  const isLoading = status === "loading";
  const hasError = status === "error";

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 text-on-navy sm:py-28"
      style={{
        background:
          "linear-gradient(180deg, #0a0e1a 0%, #0f1730 50%, #131c2e 100%)",
      }}
    >
      {/* soft accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[440px] w-[440px] rounded-full bg-primary opacity-15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-20 h-[380px] w-[380px] rounded-full bg-cyan opacity-15 blur-[120px]"
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="reveal mx-auto mb-14 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 backdrop-blur">
            <Sparkles size={13} className="text-cyan" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cyan">
              এন্ট্রি ০৬ · যোগাযোগ
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            চলুন কাজ <span className="text-gradient">শুরু</span> করি।
          </h2>
          <EditableText
            as="p"
            className="mx-auto mt-4 block max-w-xl text-on-navy-muted"
            value={c.formIntro}
            onChange={(v) => setNestedField("contact.formIntro", v)}
            multiline
          />
        </div>

        <div className="reveal grid gap-6 lg:grid-cols-12">
          {/* ─── LEFT: Form ─── */}
          <form
            noValidate
            onSubmit={onSubmit}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8 lg:col-span-7"
          >
            {sent ? (
              <div className="py-16 text-center">
                <div
                  className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full text-white shadow-glow"
                  style={{
                    background:
                      "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
                  }}
                >
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  ধন্যবাদ!
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-on-navy-muted">
                  আপনার বার্তা পেয়েছি। ২৪ ঘণ্টার মধ্যে যোগাযোগ করবো।
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initial);
                    setStatus("idle");
                    setErrorMsg("");
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan hover:bg-cyan/10 hover:text-cyan"
                >
                  আরেকটা বার্তা পাঠান
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-on-navy-muted"
                    >
                      নাম *
                    </label>
                    <input
                      id="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="আপনার পুরো নাম"
                      disabled={isLoading}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-on-navy-muted/60 backdrop-blur transition focus:border-cyan focus:outline-none focus:ring-4 focus:ring-cyan/20 disabled:opacity-50"
                    />
                    {errors.name && <p className={errClass}>{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-on-navy-muted"
                    >
                      ইমেইল *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      disabled={isLoading}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-on-navy-muted/60 backdrop-blur transition focus:border-cyan focus:outline-none focus:ring-4 focus:ring-cyan/20 disabled:opacity-50"
                    />
                    {errors.email && <p className={errClass}>{errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-on-navy-muted"
                    >
                      প্রজেক্ট বিবরণ *
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="আপনার ব্র্যান্ড, লক্ষ্য ও চ্যালেঞ্জ সংক্ষেপে লিখুন..."
                      disabled={isLoading}
                      className="min-h-[160px] w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-on-navy-muted/60 backdrop-blur transition focus:border-cyan focus:outline-none focus:ring-4 focus:ring-cyan/20 disabled:opacity-50"
                    />
                    {errors.message && <p className={errClass}>{errors.message}</p>}
                  </div>
                </div>

                {/* Error banner */}
                {hasError && (
                  <div
                    role="alert"
                    className="mt-5 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 backdrop-blur"
                  >
                    <XCircle
                      size={18}
                      className="mt-0.5 flex-shrink-0 text-red-400"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-red-400">
                        পাঠানো যায়নি
                      </div>
                      <p className="mt-0.5 text-[13px] text-on-navy-muted">
                        {errorMsg}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        পাঠানো হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        বার্তা পাঠান
                      </>
                    )}
                  </button>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-on-navy-muted/70">
                    Powered by Formspree
                  </p>
                </div>
              </>
            )}
          </form>

          {/* ─── RIGHT: Info card ─── */}
          <aside className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-7 lg:col-span-5">
            {/* subtle glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary opacity-30 blur-3xl"
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
                </span>
                Available for new projects
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                সরাসরি যোগাযোগ
              </h3>
              <p className="mt-1 text-sm text-on-navy-muted">
                দ্রুততম রেসপন্স — সাধারণত ২৪ ঘণ্টার মধ্যে।
              </p>
            </div>

            {/* Contact rows */}
            <div className="relative mt-6 space-y-3">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/88${waNumber}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 transition hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-white/[0.08]"
              >
                <div
                  className="grid h-10 w-10 place-items-center rounded-lg text-white shadow-glow"
                  style={{ background: "linear-gradient(135deg, #059669 0%, #34D399 100%)" }}
                >
                  <MessageCircle size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted">
                    WhatsApp
                  </div>
                  <EditableText
                    as="div"
                    className="mt-0.5 block truncate text-[15px] font-semibold text-white transition-colors group-hover:text-cyan"
                    value={c.whatsapp}
                    onChange={(v) => setNestedField("contact.whatsapp", v)}
                  />
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${c.email}`}
                className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 transition hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-white/[0.08]"
              >
                <div
                  className="grid h-10 w-10 place-items-center rounded-lg text-white shadow-glow"
                  style={{ background: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)" }}
                >
                  <Mail size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted">
                    Email
                  </div>
                  <EditableText
                    as="div"
                    className="mt-0.5 block truncate text-[15px] font-semibold text-white transition-colors group-hover:text-cyan"
                    value={c.email}
                    onChange={(v) => setNestedField("contact.email", v)}
                  />
                </div>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
                <div
                  className="grid h-10 w-10 place-items-center rounded-lg text-white shadow-glow"
                  style={{ background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)" }}
                >
                  <MapPin size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted">
                    Location
                  </div>
                  <EditableText
                    as="div"
                    className="mt-0.5 block text-[15px] font-semibold text-white"
                    value={c.location}
                    onChange={(v) => setNestedField("contact.location", v)}
                  />
                </div>
              </div>
            </div>

            {/* Divider + socials */}
            <div className="relative mt-6 border-t border-white/10 pt-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-on-navy-muted">
                সোশ্যাল
              </div>
              <div className="mt-3 flex items-center gap-2">
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
                    className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/5 text-on-navy backdrop-blur transition hover:border-cyan hover:bg-cyan/10 hover:text-cyan"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
