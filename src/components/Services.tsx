import {
  BarChart3,
  Facebook,
  Globe,
  Mail,
  Megaphone,
  PenLine,
  Search,
  Target,
  ArrowUpRight,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

const SERVICES = [
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    desc: "কনটেন্ট ক্রিয়েশন, শিডিউলিং, কমিউনিটি ম্যানেজমেন্ট",
  },
  {
    icon: Facebook,
    title: "Facebook Ads Expert",
    desc: "টার্গেটেড ক্যাম্পেইন, অডিয়েন্স রিসার্চ, রিটার্গেটিং ফানেল",
  },
  {
    icon: BarChart3,
    title: "Google Ads (PPC)",
    desc: "সার্চ / ডিসপ্লে / ইউটিউব অ্যাড, কনভার্সন ট্র্যাকিং",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    desc: "অন-পেজ SEO, কীওয়ার্ড রিসার্চ, র‍্যাংকিং স্ট্র্যাটেজি",
  },
  {
    icon: Globe,
    title: "WordPress Design",
    desc: "কাস্টম থিম, প্লাগইন, স্পিড অপ্টিমাইজেশন",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "ক্যাম্পেইন ডিজাইন, সেগমেন্টেশন, অটোমেশন",
  },
  {
    icon: PenLine,
    title: "Content Marketing",
    desc: "এডিটোরিয়াল ক্যালেন্ডার, ব্র্যান্ড স্টোরিটেলিং",
  },
  {
    icon: Target,
    title: "Lead Generation",
    desc: "প্রসপেক্ট টার্গেটিং, লিড ফানেল, নার্চার সিকোয়েন্স",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          entry="এন্ট্রি ০১ · সার্ভিস"
          title="যেসব কাজ ভালো পারি।"
          intro="ফুল-ফানেল ডিজিটাল মার্কেটিং — awareness থেকে conversion পর্যন্ত প্রতিটা স্টেজ কভার করি।"
        />

        <div className="reveal border-t border-hairline">
          {SERVICES.map(({ icon: Icon, title, desc }, i) => (
            <a
              key={title}
              href="#contact"
              className="group grid grid-cols-12 items-center gap-4 border-b border-hairline py-6 transition-colors hover:bg-panel/40 sm:py-8"
            >
              <div className="col-span-2 font-mono text-[11px] text-muted sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Icon
                  size={22}
                  className="text-muted transition-colors group-hover:text-accent"
                />
              </div>
              <div className="col-span-8 sm:col-span-5">
                <h3 className="font-display text-lg font-semibold text-text sm:text-xl">
                  {title}
                </h3>
              </div>
              <div className="col-span-12 text-muted sm:col-span-4 sm:text-right">
                {desc}
              </div>
              <div className="col-span-12 flex justify-end sm:col-span-1">
                <ArrowUpRight
                  size={18}
                  className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
