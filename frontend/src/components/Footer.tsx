export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 text-sm text-neutral-400 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-white/10" />
            <span>FinCare</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-white">Product</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#early-access" className="hover:text-white">Contact</a>
          </div>
          <div>© {new Date().getFullYear()} FinCare. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}


