import SectionHeader from "./SectionHeader";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

export default function Work() {
  const { data, updateData } = useSite();

  const updateWork = (
    i: number,
    field: "role" | "company" | "period" | "summary",
    val: string
  ) => {
    updateData((prev) => {
      const next = [...prev.works];
      next[i] = { ...next[i], [field]: val };
      return { ...prev, works: next };
    });
  };

  return (
    <section id="work" className="border-t border-border bg-surface py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          entry="এন্ট্রি ০২ · কেস / অভিজ্ঞতা"
          title="যেসব ব্র্যান্ডের সাথে কাজ করেছি।"
          intro="বাস্তব ব্যবসার জন্য বাস্তব রেজাল্ট — ছোট শপ থেকে পাবলিকেশন হাউস পর্যন্ত।"
        />

        <ol className="reveal border-t border-border">
          {data.works.map((w, i) => (
            <li
              key={i}
              className="grid grid-cols-12 gap-4 border-b border-border py-8"
            >
              <div className="col-span-12 sm:col-span-2">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  কেস — {String(i + 1).padStart(2, "0")}
                </div>
                <EditableText
                  as="div"
                  className="mt-2 text-[13px] text-muted"
                  value={w.period}
                  onChange={(v) => updateWork(i, "period", v)}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <EditableText
                  as="h3"
                  className="font-display text-2xl font-semibold text-ink"
                  value={w.company}
                  onChange={(v) => updateWork(i, "company", v)}
                />
                <EditableText
                  as="div"
                  className="mt-1 text-muted"
                  value={w.role}
                  onChange={(v) => updateWork(i, "role", v)}
                />
                <EditableText
                  as="p"
                  className="mt-3 block max-w-lg text-ink"
                  value={w.summary}
                  onChange={(v) => updateWork(i, "summary", v)}
                  multiline
                />
              </div>
              <div className="col-span-12 flex flex-wrap items-start gap-2 sm:col-span-4 sm:justify-end">
                {w.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-bg px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-muted/70">
          [ নোট — বিস্তারিত কেস স্টাডি ও রেজাল্ট মেট্রিক পরে যোগ করা হবে ]
        </p>
      </div>
    </section>
  );
}
