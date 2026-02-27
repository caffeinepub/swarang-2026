import { useState, useEffect, useRef } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const eventDate = new Date("2026-03-13T00:00:00").getTime();
  const now = Date.now();
  const diff = Math.max(0, eventDate - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface UnitCardProps {
  value: number;
  label: string;
  color: string;
  borderColor: string;
  glow: string;
}

function UnitCard({ value, label, color, borderColor, glow }: UnitCardProps) {
  return (
    <div
      className="glass rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center min-w-0"
      style={{
        border: `1px solid ${borderColor}`,
        boxShadow: `0 0 30px ${glow}`,
      }}
    >
      <span
        className="font-display font-black leading-none"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          color,
          filter: `drop-shadow(0 0 15px ${color})`,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className="font-body text-xs sm:text-sm tracking-widest uppercase mt-2"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    [titleRef.current, contentRef.current].forEach((el) => {
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const units = [
    {
      value: timeLeft.days,
      label: "Days",
      color: "oklch(0.62 0.27 300)",
      borderColor: "oklch(0.62 0.27 300 / 0.35)",
      glow: "oklch(0.62 0.27 300 / 0.15)",
    },
    {
      value: timeLeft.hours,
      label: "Hours",
      color: "oklch(0.56 0.24 262)",
      borderColor: "oklch(0.56 0.24 262 / 0.35)",
      glow: "oklch(0.56 0.24 262 / 0.15)",
    },
    {
      value: timeLeft.minutes,
      label: "Minutes",
      color: "oklch(0.66 0.27 340)",
      borderColor: "oklch(0.66 0.27 340 / 0.35)",
      glow: "oklch(0.66 0.27 340 / 0.15)",
    },
    {
      value: timeLeft.seconds,
      label: "Seconds",
      color: "oklch(0.72 0.22 190)",
      borderColor: "oklch(0.72 0.22 190 / 0.35)",
      glow: "oklch(0.72 0.22 190 / 0.15)",
    },
  ];

  return (
    <section
      id="countdown"
      className="relative py-24 px-4 sm:px-8"
      style={{
        background:
          "linear-gradient(180deg, #000 0%, #050005 50%, #000 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.62 0.27 300 / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-[1]">
        <h2
          ref={titleRef}
          className="section-title font-display text-3xl sm:text-4xl md:text-5xl font-black mb-3 text-white text-center"
          style={{ letterSpacing: "-0.02em" }}
        >
          Event Starts In
        </h2>
        <p
          className="text-center font-body text-sm mb-12"
          style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em" }}
        >
          13 MARCH 2026
        </p>

        <div
          ref={contentRef}
          className="reveal reveal-delay-1 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5"
        >
          {units.map((unit) => (
            <UnitCard key={unit.label} {...unit} />
          ))}
        </div>
      </div>
    </section>
  );
}
