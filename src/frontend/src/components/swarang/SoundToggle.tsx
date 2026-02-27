import { useEffect, useRef, useState } from "react";

// Multiple fallback tracks — tries each in order until one works
// Primary: Upbeat Party track from Pixabay (pixabay.com/music/dance-party-upbeat-upbeat-party-upbeat-music-party-488386/)
const TRACK_URLS = [
  "https://cdn.pixabay.com/audio/2025/01/15/audio_f0e5ef4a93.mp3",
  "https://cdn.pixabay.com/audio/2024/12/09/audio_c4b2c97d95.mp3",
  "https://cdn.pixabay.com/audio/2022/10/25/audio_946b4f5e7e.mp3",
  "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3",
];

export default function SoundToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackIndexRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [everPlayed, setEverPlayed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "none"; // Don't auto-load — wait for user click
    audioRef.current = audio;

    // Handle audio errors by trying the next fallback URL
    const handleError = () => {
      const nextIndex = trackIndexRef.current + 1;
      if (nextIndex < TRACK_URLS.length) {
        trackIndexRef.current = nextIndex;
        audio.src = TRACK_URLS[nextIndex];
        audio.load();
        audio
          .play()
          .then(() => {
            setPlaying(true);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
        setPlaying(false);
      }
    };

    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      setLoading(true);
      // Set the first track URL if not set yet
      if (!audio.src || audio.src === window.location.href) {
        trackIndexRef.current = 0;
        audio.src = TRACK_URLS[0];
      }
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setEverPlayed(true);
          setLoading(false);
        })
        .catch(() => {
          // Try next fallback
          const nextIndex = trackIndexRef.current + 1;
          if (nextIndex < TRACK_URLS.length) {
            trackIndexRef.current = nextIndex;
            audio.src = TRACK_URLS[nextIndex];
            audio.load();
            audio
              .play()
              .then(() => {
                setPlaying(true);
                setEverPlayed(true);
                setLoading(false);
              })
              .catch(() => {
                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        });
    }
  };

  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 10px 2px rgba(180, 60, 255, 0.5),
                        0 0 20px 4px rgba(100, 80, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 20px 6px rgba(180, 60, 255, 0.8),
                        0 0 40px 10px rgba(100, 80, 255, 0.5),
                        0 0 60px 14px rgba(255, 60, 180, 0.3);
          }
        }
        @keyframes playing-glow {
          0%, 100% {
            box-shadow: 0 0 8px 2px rgba(100, 220, 255, 0.6),
                        0 0 16px 4px rgba(60, 180, 255, 0.4);
          }
          50% {
            box-shadow: 0 0 16px 5px rgba(100, 220, 255, 0.9),
                        0 0 30px 8px rgba(60, 180, 255, 0.6);
          }
        }
        @keyframes tap-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.9; }
          50% { transform: translateY(-3px); opacity: 1; }
        }
        .sound-btn-idle {
          animation: pulse-glow 1.8s ease-in-out infinite;
        }
        .sound-btn-playing {
          animation: playing-glow 2.5s ease-in-out infinite;
        }
        .tap-label {
          animation: tap-bounce 1.5s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          userSelect: "none",
        }}
      >
        {/* TAP TO PLAY label — only shown before first play */}
        {!everPlayed && (
          <span
            className="tap-label"
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.85)",
              textTransform: "uppercase",
              textShadow: "0 0 8px rgba(180,60,255,0.8)",
              whiteSpace: "nowrap",
            }}
          >
            TAP TO PLAY
          </span>
        )}

        <button
          type="button"
          onClick={toggle}
          title={playing ? "Pause music" : "Play music"}
          className={playing ? "sound-btn-playing" : "sound-btn-idle"}
          style={{
            background: playing
              ? "rgba(0, 20, 40, 0.75)"
              : "rgba(30, 0, 60, 0.8)",
            border: playing
              ? "1.5px solid rgba(100, 220, 255, 0.5)"
              : "1.5px solid rgba(180, 60, 255, 0.6)",
            borderRadius: "50%",
            width: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "1.5rem",
            backdropFilter: "blur(10px)",
            transition:
              "background 0.3s ease, border 0.3s ease, transform 0.15s ease",
            outline: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(0.94)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.12)";
          }}
        >
          {loading ? "⏳" : playing ? "🔊" : "🔇"}
        </button>
      </div>
    </>
  );
}
