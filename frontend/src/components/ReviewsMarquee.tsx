"use client";
import Image from "next/image";

type Review = {
  name: string;
  role: string;
  avatar: string;
  text: string;
};

const reviews: Review[] = [
  { name: "Lan", role: "Retail owner", avatar: "/vercel.svg", text: "Fast and clear. Got matched in minutes." },
  { name: "Minh", role: "Manufacturer", avatar: "/next.svg", text: "Helped us prep docs properly." },
  { name: "Phuong", role: "Founder", avatar: "/globe.svg", text: "Clean UI, easy to compare options." },
  { name: "Huy", role: "Family shop", avatar: "/window.svg", text: "Saved us days of back-and-forth." },
  { name: "An", role: "SME", avatar: "/vercel.svg", text: "Great guidance through application." },
];

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="flex min-w-[320px] max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-transparent p-4">
      <div className="h-10 w-10 overflow-hidden rounded-full">
        <Image src={r.avatar} alt={r.name} width={40} height={40} className="h-10 w-10 object-cover" />
      </div>
      <div className="flex-1">
        <div className="text-sm text-neutral-300">{r.text}</div>
        <div className="mt-1 text-xs text-neutral-400">{r.name} · {r.role}</div>
      </div>
    </div>
  );
}

export default function ReviewsMarquee() {
  return (
    <section aria-label="Reviews" className="w-full bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <h2 className="mb-6 text-center text-3xl font-semibold tracking-tight text-white md:text-4xl">What customers say</h2>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center gap-4 animate-marquee will-change-transform">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-4">
                {reviews.map((r, idx) => (
                  <ReviewCard key={`${i}-a-${idx}`} r={r} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center gap-4 animate-marquee-reverse will-change-transform">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-4">
                {reviews.slice().reverse().map((r, idx) => (
                  <ReviewCard key={`${i}-b-${idx}`} r={r} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        @keyframes marqueeReverse { 0% { transform: translateX(-50%) } 100% { transform: translateX(0) } }
        :global(.animate-marquee) { animation: marquee 30s linear infinite; }
        :global(.animate-marquee-reverse) { animation: marqueeReverse 30s linear infinite; }
      `}</style>
    </section>
  );
}


