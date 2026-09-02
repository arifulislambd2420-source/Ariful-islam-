import { Quote } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

export default function Testimonials() {
  const { data, updateData } = useSite();

  const updateTestimonial = (
    i: number,
    field: "text" | "name" | "role",
    val: string
  ) => {
    updateData((prev) => {
      const next = [...prev.testimonials];
      next[i] = { ...next[i], [field]: val };
      return { ...prev, testimonials: next };
    });
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          entry="এন্ট্রি ০৫ · রিভিউ"
          title="ক্লায়েন্টরা কী বলেন।"
          intro="বাস্তব ক্লায়েন্টদের অভিজ্ঞতা ও রেজাল্ট।"
        />

        <div className="reveal grid gap-6 md:grid-cols-2">
          {data.testimonials.map((n, i) => (
            <figure
              key={i}
              className="relative rounded-2xl border border-border bg-bg p-8 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <Quote size={32} className="text-primary/60" />
              <blockquote className="mt-4 text-lg leading-relaxed text-ink">
                “
                <EditableText
                  as="span"
                  value={n.text}
                  onChange={(v) => updateTestimonial(i, "text", v)}
                  multiline
                />
                ”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <EditableText
                  as="div"
                  className="font-display text-base font-semibold text-ink"
                  value={n.name}
                  onChange={(v) => updateTestimonial(i, "name", v)}
                />
                <EditableText
                  as="div"
                  className="text-[12px] font-medium text-muted"
                  value={n.role}
                  onChange={(v) => updateTestimonial(i, "role", v)}
                />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
