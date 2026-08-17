import { Compass, Palette, Rocket, ShieldCheck } from "lucide-react";
import SectionHeader from "./SectionHeader";

const STEPS = [
  {
    n: "01",
    icon: Compass,
    title: "Strategy",
    desc: "লক্ষ্য, টার্গেট অডিয়েন্স ও সঠিক পথ ঠিক করা। রিসার্চ থেকে রোডম্যাপ।",
  },
  {
    n: "02",
    icon: Palette,
    title: "Design",
    desc: "কনভার্ট করার মতো ক্রিয়েটিভ ও মেসেজিং। ব্র্যান্ডের গলা ঠিকঠাক রেখে।",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Development",
    desc: "নির্ভুলতা ও স্বচ্ছতার সাথে ক্যাম্পেইন এক্সিকিউশন। বাজেট মেপে খরচ।",
  },
  {
    n: "04",
    icon: ShieldCheck,
    title: "Quality Check",
    desc: "রেজাল্ট রিভিউ, অপ্টিমাইজেশন, নিয়মিত রিপোর্টিং। ডেটা-ভিত্তিক ইটারেশন।",
  },
];

export default function Process() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          entry="এন্ট্রি ০৩ · প্রসেস"
          title="আমি যেভাবে কাজ করি।"
          intro="প্রতিটা প্রজেক্টে একই ৪ ধাপের কাঠামো — যাতে ফলাফল অনুমেয় হয়।"
        />

        <ol className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ n, icon: Icon, title, desc }) => (
            <li
              key={n}
              className="relative rounded-lg border border-hairline bg-panel/40 p-6 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-muted">
                  Step / {n}
                </span>
                <Icon size={20} className="text-accent" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-muted">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
