import { useEffect, useRef } from "react";

const FORMS = [
  {
    label: "Anchoring",
    emoji: "🎤",
    directUrl: "https://forms.gle/EKXHHYuFGfwG3g167",
    description: "Register for Anchoring / Hosting",
  },
  {
    label: "Dance",
    emoji: "💃",
    directUrl:
      "https://docs.google.com/forms/d/1gOUbnZ4OZV1f-rg2Xxnw04-53iWla74nwg8UhQhJSnA/viewform",
    description: "Register for Dance competition",
  },
  {
    label: "Singing",
    emoji: "🎵",
    directUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd9uvYADzhf1vgKk0AdHjTm_4MFNeYtfWnztBq3vcaujy9oRw/viewform",
    description: "Register for Singing competition",
  },
];

export default function RegistrationSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );

    for (const el of [titleRef.current, cardsRef.current]) {
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="registration"
      className="relative py-24 px-4 sm:px-8"
      style={{ background: "#000" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, oklch(0.56 0.24 262 / 0.07) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-[1]">
        <h2
          ref={titleRef}
          className="section-title font-display text-3xl sm:text-4xl md:text-5xl font-black mb-3 text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Register Now
        </h2>
        <p
          className="font-body text-base mb-10"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Click on your category to open the registration form
        </p>

        <div
          ref={cardsRef}
          className="reveal reveal-delay-1 grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {FORMS.map((form) => (
            <a
              key={form.label}
              href={form.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-8 flex flex-col items-center gap-4 no-underline cursor-pointer transition-all duration-300 group"
              style={{
                border: "1px solid oklch(0.62 0.27 300 / 0.25)",
                boxShadow: "0 0 30px oklch(0.62 0.27 300 / 0.08)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 50px oklch(0.62 0.27 300 / 0.25)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "oklch(0.62 0.27 300 / 0.6)";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 30px oklch(0.62 0.27 300 / 0.08)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "oklch(0.62 0.27 300 / 0.25)";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(0)";
              }}
            >
              <span className="text-5xl">{form.emoji}</span>
              <div className="text-center">
                <p
                  className="font-display font-black text-xl text-white mb-1"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {form.label}
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {form.description}
                </p>
              </div>
              <span
                className="font-body text-xs px-4 py-1.5 rounded-full mt-1"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.27 300), oklch(0.56 0.24 262))",
                  color: "#fff",
                  boxShadow: "0 0 15px oklch(0.62 0.27 300 / 0.3)",
                }}
              >
                Register →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
