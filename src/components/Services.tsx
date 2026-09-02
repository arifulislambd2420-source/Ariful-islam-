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
  Sparkles,
  LucideIcon,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useSite } from "../context/SiteContext";
import { EditableText } from "./admin/EditableText";

const ICONS: Record<string, LucideIcon> = {
  Megaphone,
  Facebook,
  BarChart3,
  Search,
  Globe,
  Mail,
  PenLine,
  Target,
};

export default function Services() {
  const { data, updateData } = useSite();

  const updateService = (i: number, field: "title" | "desc", val: string) => {
    updateData((prev) => {
      const next = [...prev.services];
      next[i] = { ...next[i], [field]: val };
      return { ...prev, services: next };
    });
  };

  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeader
          entry="এন্ট্রি ০১ · সার্ভিস"
          title="যেসব কাজ ভালো পারি।"
          intro="ফুল-ফানেল ডিজিটাল মার্কেটিং — awareness থেকে conversion পর্যন্ত প্রতিটা স্টেজ কভার করি।"
        />

        <div className="reveal border-t border-border">
          {data.services.map((svc, i) => {
            const Icon = ICONS[svc.iconName] || Sparkles;
            return (
              <div
                key={i}
                className="group grid grid-cols-12 items-center gap-4 border-b border-border py-6 transition-colors hover:bg-surface sm:py-8"
              >
                <div className="col-span-2 text-[12px] font-semibold text-muted sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Icon
                    size={22}
                    className="text-muted transition-colors group-hover:text-primary"
                  />
                </div>
                <div className="col-span-8 sm:col-span-5">
                  <EditableText
                    as="h3"
                    className="font-display text-lg font-semibold text-ink sm:text-xl"
                    value={svc.title}
                    onChange={(v) => updateService(i, "title", v)}
                  />
                </div>
                <div className="col-span-12 text-muted sm:col-span-4 sm:text-right">
                  <EditableText
                    as="span"
                    value={svc.desc}
                    onChange={(v) => updateService(i, "desc", v)}
                    multiline
                  />
                </div>
                <div className="col-span-12 flex justify-end sm:col-span-1">
                  <a
                    href="#contact"
                    aria-label={`${svc.title}-এর জন্য যোগাযোগ`}
                    className="text-muted transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-primary"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
