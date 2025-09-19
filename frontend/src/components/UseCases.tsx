import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

export default function UseCases() {
  const items = [
    {
      title: "Small retailer",
      desc: "Needs working capital for inventory and seasonal demand.",
      points: ["Sync bank statements", "Instant readiness score", "Recommended lenders"],
    },
    {
      title: "Local manufacturer",
      desc: "Expanding production capacity with new equipment.",
      points: ["Compare term loans", "Preparation checklist", "Document vault"],
    },
    {
      title: "Service startup",
      desc: "Consolidating higher-interest debt to improve cash flow.",
      points: ["Cashflow view", "Smart matching", "Advisor handoff (optional)"]
    },
    {
      title: "Family shop",
      desc: "Short-term cash-flow support for operations.",
      points: ["Short-term offers", "One-time upload", "Track application status"],
    },
  ];

  return (
    <section id="use-cases" className="w-full bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 bg-black">
        <h2 className="mb-6 text-center text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Use cases
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-neutral-300">
          Concrete SME scenarios where FinCare saves time and improves outcomes.
        </p>
        <div className="bg-black grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <Card key={it.title} className="rounded-2xl border border-white/10 bg-transparent text-white">
              <CardHeader>
                <div className="mb-4 h-10 w-10 rounded-lg bg-white/10" />
                <CardTitle className="text-white text-lg">{it.title}</CardTitle>
                <CardDescription className="text-neutral-300">{it.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mt-2 space-y-2 text-sm text-neutral-300">
                  {it.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


