"use client";

export default function FAQ() {
  const items = [
    {
      q: "Is FinCare for me?",
      a: "Designed for SMEs in Vietnam without a dedicated finance team.",
    },
    {
      q: "Is my data safe?",
      a: "We use secure storage (Supabase) and best practices to protect your data.",
    },
    {
      q: "How much does it cost?",
      a: "Pricing packages coming soon—join early access to be first to know.",
    },
    {
      q: "Which banks do you support?",
      a: "We work with a growing list of partner banks and MFIs in Vietnam.",
    },
    {
      q: "Can I reuse uploaded documents?",
      a: "Yes. Store once in the document vault and reuse across applications.",
    },
    {
      q: "Do you submit applications on my behalf?",
      a: "Guided prep now; direct submissions coming soon with select partners.",
    },
  ];

  return (
    <section id="faq" className="w-full bg-black">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <h2 className="mb-6 text-center text-3xl font-semibold tracking-tight text-white md:text-4xl">
          FAQ
        </h2>
        <div className="divide-y divide-white/10">
          {items.map((it, idx) => (
            <details key={idx} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-left text-white">
                <span className="text-base font-medium">{it.q}</span>
                <span className="text-neutral-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="pb-5 text-neutral-300">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}


