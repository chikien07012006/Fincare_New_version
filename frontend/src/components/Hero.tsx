"use client";
import { Safari } from "./ui/safari";
import { BorderBeam } from "./ui/border-beam";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-black">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-6">
          <h1 className="max-w-5xl text-6xl font-semibold leading-[1.1] tracking-tight text-white sm:text-7xl">
            AI‑Powered Loans
            <br /> For SMEs
          </h1>
          <p className="max-w-2xl text-lg text-neutral-300">
            Create clarity in your loan journey. Save time, reduce effort, and find the right bank loan with confidence.
          </p>
          <div className="flex items-center justify-center">
            <InteractiveHoverButton
              className="border-white/10 bg-white/5 text-white"
              onClick={() => {
                const el = document.querySelector('#early-access');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Early Access
            </InteractiveHoverButton>
          </div>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-x-0 z-20 -bottom-6 mx-auto h-10 max-w-4xl rounded-full blur-2xl" style={{ background: "linear-gradient(90deg, rgba(6,95,70,0.25) 0%, rgba(16,185,129,0.25) 100%)" }} />

          <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur supports-[backdrop-filter]:bg-white/5">
            <div className="relative overflow-hidden rounded-xl">
              <Safari url="fincare.app/preview" imageSrc="/window.svg" className="h-auto w-full" />
              
            </div>
              <BorderBeam size={500} borderWidth={3} className="opacity-60" duration={8} colorFrom="#10b981" colorTo="#34d399" />
            </div>
          </div>
      </div>
    </section>
  );
}


