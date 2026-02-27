import { useEffect, useRef } from "react";
import type { EventInfo } from "../../backend.d";

interface Props {
  eventInfo?: EventInfo;
}

export default function AboutSection({ eventInfo }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
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
      { threshold: 0.15 }
    );

    const els = [titleRef.current, ...(itemsRef.current || [])].filter(Boolean);
    els.forEach((el) => {
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const aboutText =
    eventInfo?.about ||
    "SWARANG 2026 is the annual cultural extravaganza of Swaminarayan Siddhanta Institute of Technology. A celebration of talent, creativity, and performance arts — bringing together the best performers from across campus to showcase their skill in Dance, Singing, Music, and DJ.";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 px-4 sm:px-8"
      style={{ background: "#000" }}
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, oklch(0.62 0.27 300 / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-[1]">
        {/* Section title */}
        <h2
          ref={titleRef}
          className="section-title font-display text-3xl sm:text-4xl md:text-5xl font-black mb-12 text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          About the Event
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About text card */}
          <div
            ref={(el) => {
              if (el) itemsRef.current[0] = el;
            }}
            className="reveal reveal-delay-1 glass rounded-2xl p-8 md:col-span-2"
          >
            <p
              className="font-body text-base sm:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {aboutText}
            </p>
            <p
              className="font-body text-sm mt-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              📍 {eventInfo?.location || "Swaminarayan Siddhanta Institute of Technology"}
            </p>
            <p
              className="font-body text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              📅 {eventInfo?.dates || "13–14 March 2026"}
            </p>
          </div>

          {/* Stats column */}
          <div className="flex flex-col gap-6">
            <div
              ref={(el) => {
                if (el) itemsRef.current[1] = el;
              }}
              className="reveal reveal-delay-2 glass rounded-2xl p-6 flex flex-col items-center justify-center text-center"
              style={{
                border: "1px solid oklch(0.62 0.27 300 / 0.3)",
                boxShadow: "0 0 30px oklch(0.62 0.27 300 / 0.1)",
              }}
            >
              <span
                className="font-display font-black mb-1"
                style={{
                  fontSize: "4rem",
                  lineHeight: 1,
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.27 300), oklch(0.66 0.27 340))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 20px oklch(0.62 0.27 300 / 0.5))",
                }}
              >
                2
              </span>
              <span
                className="font-body text-sm tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Days of Performances
              </span>
            </div>

            <div
              ref={(el) => {
                if (el) itemsRef.current[2] = el;
              }}
              className="reveal reveal-delay-3 glass rounded-2xl p-6 flex flex-col items-center justify-center text-center"
              style={{
                border: "1px solid oklch(0.56 0.24 262 / 0.3)",
                boxShadow: "0 0 30px oklch(0.56 0.24 262 / 0.1)",
              }}
            >
              <span
                className="font-display font-black mb-1"
                style={{
                  fontSize: "4rem",
                  lineHeight: 1,
                  background:
                    "linear-gradient(135deg, oklch(0.56 0.24 262), oklch(0.62 0.27 300))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 20px oklch(0.56 0.24 262 / 0.5))",
                }}
              >
                4
              </span>
              <span
                className="font-body text-sm tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Art Categories
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
