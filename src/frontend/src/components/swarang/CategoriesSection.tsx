import { useEffect, useRef } from "react";

const categories = [
  {
    icon: "💃",
    name: "Dance",
    description:
      "Showcase your moves — solo, duet, or group performances in any style.",
    color: "oklch(0.62 0.27 300)",
    borderColor: "oklch(0.62 0.27 300 / 0.35)",
    glow: "oklch(0.62 0.27 300 / 0.15)",
  },
  {
    icon: "🎤",
    name: "Singing",
    description:
      "Classical, folk, Bollywood, or indie — let your voice shine on stage.",
    color: "oklch(0.66 0.27 340)",
    borderColor: "oklch(0.66 0.27 340 / 0.35)",
    glow: "oklch(0.66 0.27 340 / 0.15)",
  },
  {
    icon: "🎸",
    name: "Music",
    description:
      "Instrumentals, bands, fusion — music in all its forms and genres.",
    color: "oklch(0.56 0.24 262)",
    borderColor: "oklch(0.56 0.24 262 / 0.35)",
    glow: "oklch(0.56 0.24 262 / 0.15)",
  },
  {
    icon: "🎧",
    name: "DJ",
    description: "Spin the decks and move the crowd — electrify the night.",
    color: "oklch(0.72 0.22 190)",
    borderColor: "oklch(0.72 0.22 190 / 0.35)",
    glow: "oklch(0.72 0.22 190 / 0.15)",
  },
];

export default function CategoriesSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

    const els = [titleRef.current, ...cardsRef.current].filter(Boolean);
    for (const el of els) {
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="categories"
      className="relative py-24 px-4 sm:px-8"
      style={{
        background: "linear-gradient(180deg, #000 0%, #030010 50%, #000 100%)",
      }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, oklch(0.56 0.24 262 / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-[1]">
        <h2
          ref={titleRef}
          className="section-title font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Event Categories
        </h2>
        <p
          className="font-body mb-12 text-base sm:text-lg"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Four stages. Infinite possibilities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className={`reveal reveal-delay-${i + 1} glass glass-hover rounded-2xl p-7 group`}
              style={{
                border: `1px solid ${cat.borderColor}`,
                boxShadow: `0 0 30px ${cat.glow}`,
              }}
            >
              {/* Icon */}
              <div
                className="mb-4 text-5xl"
                style={{
                  filter: `drop-shadow(0 0 15px ${cat.color})`,
                }}
              >
                {cat.icon}
              </div>

              {/* Name */}
              <h3
                className="font-display text-2xl font-black mb-3"
                style={{
                  color: cat.color,
                  filter: `drop-shadow(0 0 10px ${cat.color})`,
                  letterSpacing: "-0.01em",
                }}
              >
                {cat.name}
              </h3>

              {/* Description */}
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {cat.description}
              </p>

              {/* Bottom neon line */}
              <div
                className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, ${cat.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
