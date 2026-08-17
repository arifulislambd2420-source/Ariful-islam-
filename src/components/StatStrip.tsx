import { useCountUp } from "../lib/useCountUp";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: v, nodeRef } = useCountUp(value);
  return (
    <div className="flex flex-col items-start gap-2 py-8">
      <div
        ref={nodeRef as React.RefObject<HTMLDivElement>}
        className="font-display text-4xl font-bold text-text sm:text-5xl"
      >
        {v}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="eyebrow">{label}</div>
    </div>
  );
}

export default function StatStrip() {
  return (
    <section className="border-y border-hairline bg-panel/40">
      <div className="container-x grid grid-cols-2 gap-x-8 md:grid-cols-4 md:divide-x md:divide-hairline">
        <div className="md:pr-8">
          <Stat value={4} suffix="+" label="বছর অভিজ্ঞতা" />
        </div>
        <div className="md:px-8">
          <Stat value={8} suffix="+" label="প্রতিষ্ঠান / ক্লায়েন্ট" />
        </div>
        <div className="md:px-8">
          <Stat value={6} suffix="+" label="সার্ভিস" />
        </div>
        <div className="md:pl-8">
          <Stat value={100} suffix="%" label="ফলাফল-ভিত্তিক" />
        </div>
      </div>
    </section>
  );
}
