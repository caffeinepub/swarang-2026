import { useEffect, useRef } from "react";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 1.2s ease";
      el.style.opacity = "1";
    });
  }, []);

  // Particle canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; r: number; speed: number; angle: number; hue: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        angle: Math.random() * Math.PI * 2,
        hue: [280, 260, 330, 200][Math.floor(Math.random() * 4)],
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.angle += (Math.random() - 0.5) * 0.02;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
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
      {/* Particle canvas background */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ background: "radial-gradient(ellipse at 30% 40%, #0d0020 0%, #000 60%)" }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.9 }}
        />
        {/* Stage light beams */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "conic-gradient(from 200deg at 20% 0%, oklch(0.62 0.27 300 / 0.12) 0deg, transparent 40deg, oklch(0.56 0.24 262 / 0.08) 80deg, transparent 120deg)",
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "conic-gradient(from 340deg at 80% 0%, oklch(0.66 0.27 340 / 0.12) 0deg, transparent 40deg, oklch(0.62 0.27 300 / 0.08) 80deg, transparent 120deg)",
        }} />
      </div>

      {/* Cinematic dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Animated ambient orbs */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "40vw",
            height: "40vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, oklch(0.62 0.27 300 / 0.15) 0%, transparent 70%)",
            animation: "pulseOrb 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: "35vw",
            height: "35vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, oklch(0.56 0.24 262 / 0.15) 0%, transparent 70%)",
            animation: "pulseOrb 7s ease-in-out infinite 2s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "30vw",
            height: "30vw",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, oklch(0.66 0.27 340 / 0.1) 0%, transparent 70%)",
            animation: "pulseOrb 8s ease-in-out infinite 1s",
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
          Swaminarayan Siddhanta Institute of Technology
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
          Institute of Technology
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
