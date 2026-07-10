import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const sentinel = document.getElementById("navbar-scroll-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: [0] }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll sentinel to toggle sticky header background using Intersection Observer */}
      <div id="navbar-scroll-sentinel" className="absolute top-0 left-0 w-full h-px pointer-events-none" />
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "border-border/70 bg-background/80 backdrop-blur-md shadow-sm"
            : "border-transparent bg-transparent"
        }`}
      >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full pb-1"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 md:flex">
          <button
            onClick={() => navigate("/login")}
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-all duration-250 hover:text-foreground hover:-translate-y-0.5 active:translate-y-0"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/sign-up")}
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all duration-250 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0"
          >
            Get started
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-lg text-foreground/80 transition-colors hover:bg-secondary md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-background/75 backdrop-blur-2xl flex flex-col justify-between p-6 md:hidden"
          >
            {/* Top header bar */}
            <div className="flex items-center justify-between">
              <div onClick={() => setOpen(false)}>
                <Logo />
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full text-foreground/80 hover:bg-secondary transition-colors cursor-pointer"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Glowing background styling */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px]" />
            </div>

            {/* Centered navigation links with large text */}
            <div className="flex flex-col gap-6 items-center justify-center flex-1 my-auto">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl font-bold text-foreground transition-all duration-250 hover:text-primary py-2 tracking-tight hover:scale-105 active:scale-95"
                >
                  {l.label}
                </a>
              ))}
            </div>
            
            {/* Bottom action buttons */}
            <div className="flex flex-col gap-3 w-full border-t border-border pt-8">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="w-full h-[52px] rounded-full border border-border text-lg font-bold text-foreground transition-all duration-250 hover:bg-secondary cursor-pointer"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/sign-up");
                }}
                className="w-full h-[52px] rounded-full bg-primary text-lg font-bold text-primary-foreground transition-all duration-250 hover:bg-primary/95 cursor-pointer"
              >
                Get started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
