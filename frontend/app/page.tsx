import { Button } from "@/components/ui/button"
import { ChevronRight, LineChart, ShieldCheck, Building2 } from "lucide-react"
import { teamMembers } from "@/components/team_member";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <style>
        {`
        @keyframes scroll-team {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll-team 60s linear infinite;
        }
        .hover\\:paused:hover {
          animation-play-state: paused;
        }
        `}
      </style>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Building2 className="h-6 w-6 text-primary" />
            <span>FinCare</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#main" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#our_team" className="text-muted-foreground hover:text-foreground transition-colors">
              Our People
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/login">
              <Button variant="outline">Log in</Button>
            </a>
            <a href="/register">
              <Button>Sign up</Button>
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1 " >
        <section id = "main" className="py-20 bg-muted/50 bg-gradient-to-r from-black/30 to-white">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
             Check SME Loan Applications
            </h1>
            <h1 className="text-4xl md:text-4xl font-bold tracking-tight max-w-2xl">
             Increase Your Approval Chances Today!
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              FinCare helps small and medium enterprises organize documents, find matching loan options, and get
              personalized insights to improve loan application success.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href="/register">
                <Button size="lg" className="gap-2">
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#how-it-works">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Document Management</h3>
                <p className="text-muted-foreground">
                  Securely upload, organize, and manage all your business documents in one place.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Intelligent Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your documents to match you with suitable loan options based on your business profile.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Profile Improvement</h3>
                <p className="text-muted-foreground">
                  Get personalized insights on how to improve your business profile for better loan approval chances.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Register</h3>
                <p className="text-muted-foreground">Create your secure account to get started.</p>
              </div>

              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Documents</h3>
                <p className="text-muted-foreground">Upload your business and financial documents.</p>
              </div>

              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Suggestions</h3>
                <p className="text-muted-foreground">Receive tailored loan options based on your profile.</p>
              </div>

              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-2">Apply & Improve</h3>
                <p className="text-muted-foreground">Submit applications and get insights to improve your profile.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="our_team" className="py-20 bg-background">
          <div className="">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="relative overflow-hidden w-full h-80">
              <div className="flex absolute top-0 left-0 w-[200%] h-full animate-scroll hover:paused">
                {teamMembers.concat(teamMembers).map((member, index) => (
                  <div key={index} className="flex-shrink-0 w-80 h-full p-4 flex flex-col items-center text-center justify-center">
                    <img src={member.avatar} alt={member.name} className="h-28 w-28 rounded-full mb-4 object-cover border-4 border-primary/20" />
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t py-10 bg-muted/30">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold">
            <Building2 className="h-5 w-5 text-primary" />
            <span>FinCare</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} FinCare. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </a>
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
