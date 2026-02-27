import { useEffect, useRef, useState } from "react";

// Bollywood party track — free to use, CORS-friendly
const TRACK_URL =
  "https://cdn.pixabay.com/audio/2023/07/17/audio_5ecbdaf29b.mp3";

export default function SoundToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const audio = new Audio();
    audio.src = TRACK_URL;
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
    audioRef.current = audio;

    // Try autoplay immediately
    const tryAutoplay = () => {
      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked — show tap-to-play prompt
        });
    };

    tryAutoplay();

    return () => {
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
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  if (!shown) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      title={playing ? "Mute music" : "Play music"}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        background: "rgba(0,0,0,0.65)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: "50%",
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "1.4rem",
        backdropFilter: "blur(8px)",
        boxShadow: playing
          ? "0 0 12px oklch(0.62 0.27 300 / 0.6)"
          : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {playing ? "🔊" : "🔇"}
    </button>
  );
}
