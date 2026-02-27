import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import type { EventInfo } from "../../backend.d";

interface Props {
  eventInfo?: EventInfo;
}

export default function ContactSection({ eventInfo }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    [titleRef.current, ...itemsRef.current].filter(Boolean).forEach((el) => {
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const contactItems = [
    {
      icon: <Mail size={22} />,
      label: "Email Us",
      value: eventInfo?.contactEmail || "shinganesumit80@gmail.com",
      href: `mailto:${eventInfo?.contactEmail || "shinganesumit80@gmail.com"}`,
      color: "oklch(0.62 0.27 300)",
      borderColor: "oklch(0.62 0.27 300 / 0.3)",
      glow: "oklch(0.62 0.27 300 / 0.1)",
    },
    {
      icon: <Phone size={22} />,
      label: "Call Us",
      value: eventInfo?.contactPhone || "7709582571",
      href: `tel:${(eventInfo?.contactPhone || "7709582571").replace(/\s/g, "")}`,
      color: "oklch(0.56 0.24 262)",
      borderColor: "oklch(0.56 0.24 262 / 0.3)",
      glow: "oklch(0.56 0.24 262 / 0.1)",
    },
    {
      icon: <MapPin size={22} />,
      label: "Find Us",
      value: eventInfo?.location || "Swaminarayan Siddhanta Institute of Technology",
      href: `https://maps.google.com/?q=${encodeURIComponent(eventInfo?.location || "Swaminarayan Siddhanta Institute of Technology")}`,
      color: "oklch(0.66 0.27 340)",
      borderColor: "oklch(0.66 0.27 340 / 0.3)",
      glow: "oklch(0.66 0.27 340 / 0.1)",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-8"
      style={{
        background: "linear-gradient(180deg, #000 0%, #020005 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, oklch(0.62 0.27 300 / 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-[1]">
        <h2
          ref={titleRef}
          className="section-title font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Get In Touch
        </h2>
        <p
          className="font-body text-base mb-12"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Have questions? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {contactItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("https") ? "_blank" : undefined}
              rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
              ref={(el) => { if (el) itemsRef.current[i] = el as unknown as HTMLDivElement; }}
              className={`reveal reveal-delay-${i + 1} glass glass-hover rounded-2xl p-6 flex flex-col items-start gap-3 no-underline`}
              style={{
                border: `1px solid ${item.borderColor}`,
                boxShadow: `0 0 25px ${item.glow}`,
                textDecoration: "none",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: `${item.color.replace(")", " / 0.15)")}`, color: item.color }}
              >
                {item.icon}
              </div>
              <div>
                <p className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {item.label}
                </p>
                <p className="font-body text-sm font-medium text-white leading-snug">
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          className="pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p
                className="font-display font-black text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.27 300), oklch(0.56 0.24 262), oklch(0.66 0.27 340))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                SWARANG 2026
              </p>
              <p className="font-body text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                Annual Cultural Festival • Swaminarayan Siddhanta Institute of Technology
              </p>
            </div>
            <p className="font-body text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
              © {new Date().getFullYear()} SWARANG | Swaminarayan Siddhanta Institute of Technology.{" "}
              <br className="sm:hidden" />
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(0.62 0.27 300 / 0.6)", textDecoration: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.62 0.27 300)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.62 0.27 300 / 0.6)"; }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
