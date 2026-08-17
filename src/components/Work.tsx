import SectionHeader from "./SectionHeader";

const WORK = [
  {
    role: "Digital Marketer",
    company: "Itminan Publication",
    period: "২০২৪ – বর্তমান",
    summary: "কনটেন্ট স্ট্র্যাটেজি, SEO ও সোশ্যাল মিডিয়া ক্যাম্পেইন",
    tags: ["SEO", "Content", "Social"],
  },
  {
    role: "Digital Marketer",
    company: "Amar Shop BD",
    period: "২০২২ – ২০২৪",
    summary: "ই-কমার্স মার্কেটিং, Facebook ও Google Ads ম্যানেজমেন্ট",
    tags: ["E-commerce", "Meta Ads", "Google Ads"],
  },
  {
    role: "Digital Marketer",
    company: "Sunn Shop",
    period: "৭ মাস · ২০২২",
    summary: "সোশ্যাল মিডিয়া ম্যানেজমেন্ট ও ব্র্যান্ড বিল্ডিং",
    tags: ["Social", "Branding"],
  },
];

export default function Work() {
  return (
    <section id="work" className="border-t border-hairline bg-panel/30 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          entry="এন্ট্রি ০২ · কেস / অভিজ্ঞতা"
          title="যেসব ব্র্যান্ডের সাথে কাজ করেছি।"
          intro="বাস্তব ব্যবসার জন্য বাস্তব রেজাল্ট — ছোট শপ থেকে পাবলিকেশন হাউস পর্যন্ত।"
        />

        <ol className="reveal border-t border-hairline">
          {WORK.map((w, i) => (
            <li
              key={w.company}
              className="grid grid-cols-12 gap-4 border-b border-hairline py-8"
            >
              <div className="col-span-12 sm:col-span-2">
                <div className="font-mono text-[11px] uppercase tracking-widest2 text-muted">
                  কেস — {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-mono text-[12px] text-muted">{w.period}</div>
              </div>
              <div className="col-span-12 sm:col-span-6">
                <h3 className="font-display text-2xl font-semibold text-text">
                  {w.company}
                </h3>
                <div className="mt-1 text-muted">{w.role}</div>
                <p className="mt-3 max-w-lg">{w.summary}</p>
              </div>
              <div className="col-span-12 flex flex-wrap items-start gap-2 sm:col-span-4 sm:justify-end">
                {w.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] uppercase tracking-widest2 text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-widest2 text-muted/70">
          [ নোট — বিস্তারিত কেস স্টাডি ও রেজাল্ট মেট্রিক পরে যোগ করা হবে ]
        </p>
      </div>
    </section>
  );
}
