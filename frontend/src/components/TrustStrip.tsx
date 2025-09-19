"use client";
import Image from "next/image";

const logos = [
  "/placeholders/bank-logo-1.svg",
  "/placeholders/bank-logo-2.svg",
  "/placeholders/bank-logo-3.svg",
  "/placeholders/bank-logo-4.svg",
  "/placeholders/bank-logo-2.svg",
  "/placeholders/bank-logo-3.svg",
];

export default function TrustStrip() {
  return (
    <section aria-label="Partners" className="w-full border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-6 md:py-8">
        <p className="mb-3 text-center text-base font-medium text-neutral-200 md:text-xl">
          Trusted by 24+ banks and SMEs
        </p>

        <div
          className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="flex items-center gap-12 animate-marquee will-change-transform">
            {[...Array(2)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex shrink-0 items-center gap-12">
                {logos.map((src, idx) => (
                  <div key={`${loopIdx}-${idx}`} className="flex items-center justify-center">
                    <Image
                      src={src}
                      alt={`Bank logo ${idx + 1}`}
                      width={220}
                      height={80}
                      className="h-14 w-auto grayscale opacity-90 md:h-16"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        :global(.animate-marquee) {
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </section>
  );
}


