export default function HackathonSection() {
  return (
    <section
      id="hackathon"
      style={{
        padding: "80px 0",
        background:
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,0,20,0.8) 50%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Coming Soon Badge */}
        <div className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full"
            style={{
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.4)",
              color: "oklch(0.72 0.2 300)",
              letterSpacing: "0.15em",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "oklch(0.72 0.2 300)",
                display: "inline-block",
                animation: "pulse 2s infinite",
              }}
            />
            Coming Soon
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-4xl sm:text-5xl font-black mb-3"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.62 0.27 300), oklch(0.56 0.24 262), oklch(0.66 0.27 340))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.04em",
            fontFamily: "var(--font-display, sans-serif)",
          }}
        >
          HACKATHON
        </h2>

        {/* Collaboration */}
        <p
          className="text-base sm:text-lg mb-8"
          style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}
        >
          In collaboration with
        </p>

        {/* Hack2Skill Badge */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.12))",
              border: "1px solid rgba(139,92,246,0.35)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <span
              className="text-2xl sm:text-3xl font-black"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.22 262), oklch(0.66 0.27 340))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.06em",
              }}
            >
              Hack2Skill
            </span>
          </div>
        </div>

        {/* TBA Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Date", value: "TBA" },
            { label: "Prizes", value: "TBA" },
            { label: "Problem Statements", value: "TBA" },
            { label: "Registration", value: "TBA" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-4 flex flex-col gap-2 items-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.1em",
                }}
              >
                {item.label}
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Stay tuned message */}
        <p
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}
        >
          Details will be announced soon. Stay tuned!
        </p>
      </div>
    </section>
  );
}
