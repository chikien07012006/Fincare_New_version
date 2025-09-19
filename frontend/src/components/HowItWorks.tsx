"use client";
import { useEffect, useRef, useState } from "react";
import { Safari } from "./ui/safari";

const steps = [
  {
    key: "upload",
    title: "Upload Documents",
    desc: "Securely upload bank statements and financials.",
  },
  { key: "score", title: "Get Your Score", desc: "See readiness and gaps instantly." },
  {
    key: "match",
    title: "Find Loan Options",
    desc: "Compare tailored options from partner banks.",
  },
  { key: "apply", title: "Prepare & Apply", desc: "Guided steps and pre-filled forms." },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll("[data-step]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0.01 }
    );

    items.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how" className="w-full bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight text-white md:text-3xl">
          How it works
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-neutral-300">
          Four simple steps. The preview stays in place while you scroll.
        </p>

        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12">
          <div ref={containerRef} className="space-y-10">
            {steps.map((s, idx) => {
              const isActive = idx === active;
              return (
                <div
                  key={s.key}
                  data-step
                  data-index={idx}
                  className={
                    "relative rounded-2xl p-5 bg-transparent backdrop-blur-sm border-4 " +
                    (isActive ? "border-emerald-500/60" : "border-white/10")
                  }
                >
                  <div className="absolute -top-4 -left-4 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold tracking-wide text-white shadow">
                    Step {idx + 1}
                  </div>
                  <div className="mb-2 text-sm uppercase tracking-wide text-neutral-400"></div>
                  <h3
                    className={
                      "mb-2 text-lg font-medium transition-colors " +
                      (isActive ? "text-white" : "text-neutral-300")
                    }
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-neutral-400">{s.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="sticky top-24">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
              <div className="relative overflow-hidden rounded-xl">
                <Safari url={`fincare.app/${steps[active].key}`}
                  imageSrc={
                    active === 0 ? "/window.svg" :
                    active === 1 ? "/next.svg" :
                    active === 2 ? "/globe.svg" :
                    "/vercel.svg"
                  }
                  className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
        {null}
      </div>
    </section>
  );
}


