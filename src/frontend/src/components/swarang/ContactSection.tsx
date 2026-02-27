export default function ContactSection() {
  return (
    <footer
      id="contact"
      className="relative py-10 px-4 sm:px-8"
      style={{
        background: "linear-gradient(180deg, #000 0%, #020005 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-5xl mx-auto">
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
            <p
              className="font-body text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Annual Cultural Festival • Swaminarayan Siddhanta Institute of
              Technology
            </p>
          </div>
          <p
            className="font-body text-xs text-center"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            © {new Date().getFullYear()} SWARANG | Swaminarayan Siddhanta
            Institute of Technology. <br className="sm:hidden" />
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "oklch(0.62 0.27 300 / 0.6)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "oklch(0.62 0.27 300)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "oklch(0.62 0.27 300 / 0.6)";
              }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
