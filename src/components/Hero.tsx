import { ArrowRight, MessageCircle, User } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      {/* subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#F2ECDD 1px, transparent 1px), linear-gradient(90deg, #F2ECDD 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="reveal lg:col-span-7">
          <p className="eyebrow">ফ্রিল্যান্স ডিজিটাল মার্কেটার · ঢাকা, বাংলাদেশ</p>
          <h1 className="mt-5 font-display text-[44px] leading-[1.05] font-bold sm:text-6xl lg:text-[76px]">
            ব্র্যান্ড বাড়াই, <br />
            <span className="text-accent">ব্যবসা</span> বাড়াই।
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-muted">
            Facebook Ads, Google Ads, SEO, WordPress ও Lead Generation দিয়ে ব্র্যান্ডের
            ফুল-ফানেল গ্রোথ। ৪+ বছর ধরে ছোট-বড় ব্যবসায়ের জন্য কাজ করছি।
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/8801874783819"
              target="_blank"
              rel="noreferrer"
              className="btn-wa"
            >
              <MessageCircle size={16} />
              WhatsApp-এ যোগাযোগ
            </a>
            <a href="#work" className="btn-ghost">
              পোর্টফোলিও দেখুন
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 border-t border-hairline pt-6">
            <div>
              <div className="font-display text-2xl font-bold text-text">৪+</div>
              <div className="eyebrow mt-1">বছর অভিজ্ঞতা</div>
            </div>
            <div className="h-8 w-px bg-hairline" />
            <div>
              <div className="font-display text-2xl font-bold text-text">৮+</div>
              <div className="eyebrow mt-1">ক্লায়েন্ট</div>
            </div>
            <div className="h-8 w-px bg-hairline" />
            <div>
              <div className="font-display text-2xl font-bold text-accent">১০০%</div>
              <div className="eyebrow mt-1">ফলাফল-ভিত্তিক</div>
            </div>
          </div>
        </div>

        {/* Portrait with orbit ring */}
        <div className="reveal relative lg:col-span-5">
          <div className="relative mx-auto aspect-square w-[280px] sm:w-[360px] lg:w-[420px]">
            {/* dashed orbit ring */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 h-full w-full animate-spin-slow text-accent/60"
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
              <circle cx="388" cy="200" r="4" fill="#E4A94E" />
            </svg>

            {/* inner ring */}
            <div className="absolute inset-6 rounded-full border border-hairline" />

            {/* portrait placeholder */}
            <div className="absolute inset-10 overflow-hidden rounded-full bg-panel">
              <div className="flex h-full w-full items-center justify-center text-muted">
                <div className="text-center">
                  <User size={56} className="mx-auto opacity-60" />
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-widest2">
                    প্রোফাইল ছবি
                    <br />
                    <span className="text-muted/60">[placeholder]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* status chip */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-hairline bg-bg/95 px-4 py-2 backdrop-blur">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-text">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for work
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
