import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Categories", href: "#categories" },
  { label: "Auditions", href: "#auditions" },
  { label: "Countdown", href: "#countdown" },
  { label: "Register", href: "#registration" },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.3)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("#hero")}
            className="font-display font-black text-lg sm:text-xl cursor-pointer border-0 bg-transparent outline-none"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.27 300), oklch(0.56 0.24 262), oklch(0.66 0.27 340))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.05em",
            }}
          >
            SWARANG 2026
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="font-body text-sm font-medium transition-colors duration-200 cursor-pointer border-0 bg-transparent outline-none"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "oklch(0.62 0.27 300)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(255,255,255,0.65)";
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 border-0 bg-transparent outline-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: "rgba(255,255,255,0.75)" }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 flex flex-col gap-3"
          style={{
            background: "rgba(0,0,0,0.95)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => {
                scrollToSection(link.href);
                setIsOpen(false);
              }}
              className="text-left font-body text-sm py-2 border-0 bg-transparent outline-none cursor-pointer w-full"
              style={{
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.05em",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
