import { useEffect, useRef } from "react";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 1.2s ease";
      el.style.opacity = "1";
    });
  }, []);

  const scrollToRegister = () => {
    const el = document.getElementById("registration");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Neon ambient orbs background */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "5%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, oklch(0.62 0.27 300 / 0.18) 0%, transparent 70%)",
            animation: "pulseOrb 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "45vw",
            height: "45vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, oklch(0.56 0.24 262 / 0.18) 0%, transparent 70%)",
            animation: "pulseOrb 7s ease-in-out infinite 2s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, oklch(0.66 0.27 340 / 0.08) 0%, transparent 65%)",
            animation: "pulseOrb 9s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[3] text-center px-4 sm:px-8 max-w-5xl mx-auto">
        {/* College badge */}
        <div
          className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs sm:text-sm font-body tracking-widest uppercase"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
            animation: "fadeInUp 0.8s ease 0.2s both",
          }}
        >
          Swaminarayan Siddhanta Institute of Technology, Nagpur
        </div>

        {/* Main title */}
        <h1
          className="font-display block leading-none mb-4"
          style={{
            fontSize: "clamp(3rem, 12vw, 8rem)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            background:
              "linear-gradient(135deg, #fff 0%, oklch(0.62 0.27 300) 40%, oklch(0.56 0.24 262) 70%, oklch(0.66 0.27 340) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter:
              "drop-shadow(0 0 40px oklch(0.62 0.27 300 / 0.6)) drop-shadow(0 0 80px oklch(0.56 0.24 262 / 0.3))",
            animation: "fadeInUp 0.9s ease 0.4s both",
          }}
        >
          SWARANG
          <br />
          <span
            style={{
              fontSize: "0.55em",
              background:
                "linear-gradient(135deg, oklch(0.66 0.27 340), oklch(0.62 0.27 300))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            2026
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-body mb-6"
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.4rem)",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.75)",
            fontWeight: 300,
            animation: "fadeInUp 0.9s ease 0.6s both",
          }}
        >
          DANCE&nbsp;&nbsp;|&nbsp;&nbsp;SINGING&nbsp;&nbsp;|&nbsp;&nbsp;MUSIC&nbsp;&nbsp;|&nbsp;&nbsp;DJ
        </p>

        {/* Auditions badge */}
        <div
          className="inline-block mb-8 px-6 py-2 rounded-full font-body font-semibold tracking-wider text-sm sm:text-base"
          style={{
            border: "1px solid oklch(0.62 0.27 300 / 0.7)",
            color: "oklch(0.62 0.27 300)",
            background: "oklch(0.62 0.27 300 / 0.1)",
            animation:
              "fadeInUp 0.9s ease 0.8s both, pulseNeon 2.5s ease-in-out infinite 1.8s",
          }}
        >
          🎤 Auditions Now Open
        </div>

        {/* CTA Button */}
        <div
          style={{
            animation: "fadeInUp 0.9s ease 1s both",
          }}
        >
          <button
            onClick={scrollToRegister}
            type="button"
            className="btn-neon font-display font-bold text-white rounded-full cursor-pointer border-0 outline-none"
            style={{
              padding: "1rem 3rem",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              letterSpacing: "0.1em",
              display: "inline-block",
            }}
          >
            REGISTER NOW
          </button>
        </div>

        {/* Event details */}
        <p
          className="font-body mt-8 text-sm sm:text-base"
          style={{
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.1em",
            animation: "fadeInUp 0.9s ease 1.2s both",
          }}
        >
          13–14 March 2026&nbsp;&nbsp;•&nbsp;&nbsp;Swaminarayan Siddhanta
          Institute of Technology, Nagpur
        </p>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToAbout}
        className="absolute bottom-8 cursor-pointer border-0 bg-transparent outline-none"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          animation: "bounceArrow 2s ease-in-out infinite",
          zIndex: 3,
        }}
        aria-label="Scroll down"
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRight: "2px solid rgba(255,255,255,0.5)",
            borderBottom: "2px solid rgba(255,255,255,0.5)",
            transform: "rotate(45deg)",
            margin: "0 auto",
          }}
        />
      </button>
    </section>
  );
}
