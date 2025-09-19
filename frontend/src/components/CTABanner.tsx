"use client";
import { useState } from "react";

export default function CTABanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      setEmail("");
    } catch (e) {
      setStatus("error");
    }
  }

  return (
    <section id="early-access" className="w-full bg-black">
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="rounded-2xl border border-white/10 bg-transparent p-6 text-center backdrop-blur-sm md:p-10">
          <h3 className="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Ready to apply smarter?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-neutral-300">
            Join early access and be the first to experience FinCare.
          </p>
          <form onSubmit={onSubmit} className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 rounded-full border border-white/10 bg-transparent px-5 text-white outline-none placeholder:text-neutral-400 focus:border-emerald-600"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-12 shrink-0 rounded-full bg-white/10 px-6 text-sm font-medium text-white transition hover:bg-white/20 disabled:opacity-60"
            >
              {status === "loading" ? "Submitting..." : "Get Early Access"}
            </button>
          </form>
          {status === "success" && (
            <p className="mt-3 text-sm text-emerald-400">Thanks! We will be in touch soon.</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-red-400">Something went wrong. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
}


