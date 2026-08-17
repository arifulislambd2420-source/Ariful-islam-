import { Quote } from "lucide-react";
import SectionHeader from "./SectionHeader";

const NOTES = [
  {
    text: "আরিফুল আমাদের Facebook Ads সম্পূর্ণ নতুনভাবে সাজিয়েছে — ৩ মাসে লিডের মান আর সংখ্যা দুটোই বেড়েছে। কাজের রিপোর্টিং স্পষ্ট, কমিটমেন্টে ঠিক।",
    name: "নমুনা ক্লায়েন্ট",
    role: "প্রতিষ্ঠান / ব্র্যান্ড",
  },
  {
    text: "SEO আর কনটেন্ট প্ল্যান — দুই জায়গায় আরিফুলের ইনপুট আমাদের অর্গানিক ট্রাফিকে বড় পরিবর্তন এনেছে। সহজ ভাষায় স্ট্র্যাটেজি বুঝিয়ে দেন।",
    name: "নমুনা ক্লায়েন্ট",
    role: "প্রতিষ্ঠান / ব্র্যান্ড",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          entry="এন্ট্রি ০৫ · রিভিউ"
          title="ক্লায়েন্টরা কী বলেন।"
          intro="[ নমুনা কোট — বাস্তব রিভিউ দিয়ে পরে বদলানো হবে ]"
        />

        <div className="reveal grid gap-6 md:grid-cols-2">
          {NOTES.map((n, i) => (
            <figure
              key={i}
              className="relative rounded-lg border border-hairline bg-panel/40 p-8"
            >
              <Quote size={28} className="text-accent/60" />
              <blockquote className="mt-4 text-lg leading-relaxed text-text">
                “{n.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                <div>
                  <div className="font-display text-base font-semibold">{n.name}</div>
                  <div className="font-mono text-[11px] uppercase tracking-widest2 text-muted">
                    {n.role}
                  </div>
                </div>
                <span className="rounded-full border border-dashed border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-muted/70">
                  placeholder
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
