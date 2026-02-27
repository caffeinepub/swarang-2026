import { useEffect, useRef } from "react";
import { useGoogleFormUrl } from "../../hooks/useQueries";
import { ExternalLink } from "lucide-react";

export default function RegistrationSection() {
  const { data: formUrl, isLoading } = useGoogleFormUrl();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

    [titleRef.current, contentRef.current].forEach((el) => {
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    });

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
          className="font-body text-base mb-12"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Fill out the form below to register for SWARANG 2026
        </p>

        <div
          ref={contentRef}
          className="reveal reveal-delay-1"
        >
          {isLoading ? (
            <div
              className="glass rounded-2xl h-64 flex items-center justify-center"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: "oklch(0.62 0.27 300)", borderTopColor: "transparent" }}
                />
                <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Loading form...
                </span>
              </div>
            </div>
          ) : formUrl && formUrl.trim() !== "" ? (
            <div
              className="glass rounded-2xl overflow-hidden"
              style={{
                border: "1px solid oklch(0.62 0.27 300 / 0.25)",
                boxShadow: "0 0 40px oklch(0.62 0.27 300 / 0.1)",
              }}
            >
              <iframe
                src={formUrl}
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="SWARANG 2026 Registration Form"
                style={{ display: "block" }}
              >
                Loading form...
              </iframe>
            </div>
          ) : (
            <div
              className="glass rounded-2xl p-12 flex flex-col items-center justify-center text-center"
              style={{
                border: "1px solid oklch(0.62 0.27 300 / 0.2)",
                boxShadow: "0 0 40px oklch(0.62 0.27 300 / 0.08)",
                minHeight: 300,
              }}
            >
              <div
                className="text-6xl mb-5"
                style={{ filter: "drop-shadow(0 0 20px oklch(0.62 0.27 300 / 0.5))" }}
              >
                📋
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                Registration Coming Soon
              </h3>
              <p
                className="font-body text-sm max-w-sm"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                The registration form will be available shortly. Check back soon or contact us for details.
              </p>
              <div
                className="mt-6 px-5 py-2 rounded-full font-body text-xs tracking-widest uppercase flex items-center gap-2"
                style={{
                  border: "1px solid oklch(0.62 0.27 300 / 0.3)",
                  color: "oklch(0.62 0.27 300)",
                  animation: "pulseNeon 2.5s ease-in-out infinite",
                }}
              >
                <ExternalLink size={14} />
                Stay Tuned
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
