import { BentoCard, BentoGrid } from "./ui/bento-grid";
import { CheckCircle2, Lock, Sparkles, Workflow } from "lucide-react";

export default function CoreFeatures() {
  return (
    <section id="features" className="relative w-full bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <h2 className="mb-6 text-center text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Core Features
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-neutral-300">
          Everything you need to match the right loan and apply with confidence.
        </p>

        <div className="relative">
          <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <BentoCard
              name="Smart Loan Matching"
              description="AI + bank criteria for tailored recommendations that fit your business."
              Icon={Sparkles}
              cta="Learn more"
              href="#"
              className="col-span-1 sm:col-span-2"
              background={<div className="absolute inset-0" />}
            />
            <BentoCard
              name="Loan Readiness Score"
              description="Instantly see what to improve before applying."
              Icon={CheckCircle2}
              cta="See details"
              href="#"
              className="col-span-1"
              background={<div className="absolute inset-0" />}
            />
            <BentoCard
              name="Secure Document Vault"
              description="Store once, reuse everywhere. Secure by design."
              Icon={Lock}
              cta="How it works"
              href="#"
              className="col-span-1"
              background={<div className="absolute inset-0" />}
            />
            <BentoCard
              name="Application Support"
              description="Guided steps and pre-filled forms to reduce errors."
              Icon={Workflow}
              cta="Start now"
              href="#"
              className="col-span-1 sm:col-span-2"
              background={<div className="absolute inset-0" />}
            />
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}


