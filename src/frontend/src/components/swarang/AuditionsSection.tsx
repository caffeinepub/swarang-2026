import { useEffect, useRef } from "react";
import { CalendarDays, MapPin, CheckCircle, Mic2 } from "lucide-react";

interface Props {
  dates?: string;
  location?: string;
}

const rules = [
  "Open to all currently enrolled students",
  "Solo, duo, and group performances welcome",
  "Original content and covers both accepted",
  "Pre-registration required before auditions",
  "Judges' decisions will be final and binding",
];

export default function AuditionsSection({ dates, location }: Props) {
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

    const els = [titleRef.current, ...itemsRef.current].filter(Boolean);
    els.forEach((el) => {
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="auditions"
      className="relative py-24 px-4 sm:px-8"
      style={{ background: "#000" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, oklch(0.66 0.27 340 / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-[1]">
        <h2
          ref={titleRef}
          className="section-title font-display text-3xl sm:text-4xl md:text-5xl font-black mb-12 text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Audition Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status cards */}
          <div className="flex flex-col gap-5">
            {/* Auditions open */}
            <div
              ref={(el) => { if (el) itemsRef.current[0] = el; }}
              className="reveal reveal-delay-1 glass rounded-2xl p-6 flex items-start gap-4"
              style={{
                border: "1px solid oklch(0.62 0.27 300 / 0.3)",
                boxShadow: "0 0 25px oklch(0.62 0.27 300 / 0.1)",
              }}
            >
              <div
                className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.62 0.27 300 / 0.15)" }}
              >
                <Mic2 size={22} style={{ color: "oklch(0.62 0.27 300)" }} />
              </div>
              <div>
                <p className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Status
                </p>
                <h3 className="font-display text-xl font-bold" style={{ color: "oklch(0.62 0.27 300)" }}>
                  Auditions Now Open
                </h3>
                <p className="font-body text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Register and book your audition slot today
                </p>
              </div>
            </div>

            {/* Event dates */}
            <div
              ref={(el) => { if (el) itemsRef.current[1] = el; }}
              className="reveal reveal-delay-2 glass rounded-2xl p-6 flex items-start gap-4"
              style={{
                border: "1px solid oklch(0.56 0.24 262 / 0.3)",
                boxShadow: "0 0 25px oklch(0.56 0.24 262 / 0.1)",
              }}
            >
              <div
                className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.56 0.24 262 / 0.15)" }}
              >
                <CalendarDays size={22} style={{ color: "oklch(0.56 0.24 262)" }} />
              </div>
              <div>
                <p className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Event Dates
                </p>
                <h3 className="font-display text-xl font-bold text-white">
                  {dates || "13–14 March 2026"}
                </h3>
                <p className="font-body text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Two full days of performances
                </p>
              </div>
            </div>

            {/* Venue */}
            <div
              ref={(el) => { if (el) itemsRef.current[2] = el; }}
              className="reveal reveal-delay-3 glass rounded-2xl p-6 flex items-start gap-4"
              style={{
                border: "1px solid oklch(0.66 0.27 340 / 0.3)",
                boxShadow: "0 0 25px oklch(0.66 0.27 340 / 0.1)",
              }}
            >
              <div
                className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.66 0.27 340 / 0.15)" }}
              >
                <MapPin size={22} style={{ color: "oklch(0.66 0.27 340)" }} />
              </div>
              <div>
                <p className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Venue
                </p>
                <h3 className="font-display text-lg font-bold text-white">
                  {location || "Swaminarayan Siddhanta Institute of Technology"}
                </h3>
              </div>
            </div>
          </div>

          {/* Rules card */}
          <div
            ref={(el) => { if (el) itemsRef.current[3] = el; }}
            className="reveal reveal-delay-2 glass rounded-2xl p-7"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3 className="font-display text-xl font-black text-white mb-5" style={{ letterSpacing: "-0.01em" }}>
              Participation Rules
            </h3>
            <ul className="space-y-3">
              {rules.map((rule) => (
                <li key={rule} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: "oklch(0.62 0.27 300)" }}
                  />
                  <span className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
