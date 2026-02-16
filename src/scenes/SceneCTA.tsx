import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 7 — CTA  (49-56s · 210 frames)
   "Sign up today at Crecimos.com."

   Crecimos waveform logo (SVG) + wordmark,
   typed URL, final tagline. Blue gradient bg.
   ────────────────────────────────────────────────── */

// Crecimos waveform logo — 8 vertical bars with rounded ends
const CrecimosLogo: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const float = Math.sin(frame * 0.04) * 6;

  // Bar heights for the waveform (matching Crecimos brand)
  const baseHeights = [24, 40, 56, 72, 64, 48, 36, 28];

  return (
    <div
      style={{
        opacity: enterSpring,
        transform: `scale(${enterSpring}) translateY(${float}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
      }}
    >
      {/* Waveform icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 80,
        }}
      >
        {baseHeights.map((baseH, i) => {
          // Animated wave: each bar oscillates with staggered timing
          const waveOffset = Math.sin((frame * 0.08) + i * 0.7) * 12;
          const h = Math.max(16, baseH + waveOffset);

          return (
            <div
              key={i}
              style={{
                width: 14,
                height: h,
                borderRadius: 7,
                background: "linear-gradient(180deg, #FFFFFF, #7DD3FC)",
              }}
            />
          );
        })}
      </div>

      {/* "Crecimos" wordmark */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          fontFamily: theme.fonts.display,
          letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #FFFFFF, #93C5FD)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Crecimos
      </div>
    </div>
  );
};

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Sign up today" text
  const signUpSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14 },
  });
  const signUpY = interpolate(signUpSpring, [0, 1], [30, 0]);

  // URL typing — "Crecimos.com"
  const url = "Crecimos.com";
  const typedLength = Math.min(
    url.length,
    Math.floor(
      interpolate(frame, [50, 90], [0, url.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
  const urlOp = interpolate(frame, [45, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor blink
  const cursorOp =
    frame >= 50 && frame < 130
      ? Math.floor(frame / 8) % 2 === 0
        ? 1
        : 0
      : 0;

  // Final tagline
  const tagSpring = spring({
    frame: frame - 110,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const tagY = interpolate(tagSpring, [0, 1], [30, 0]);

  // Fade to black
  const fadeOut = interpolate(frame, [185, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated gradient
  const gradientAngle = interpolate(frame, [0, 210], [160, 200], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg,
          hsl(215, 100%, 58%) 0%,
          hsl(210, 100%, 50%) 35%,
          hsl(220, 90%, 40%) 100%)`,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          left: "50%",
          top: "30%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1), transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 32,
          zIndex: 1,
        }}
      >
        {/* Crecimos Logo (inline SVG — always renders) */}
        <CrecimosLogo frame={frame} fps={fps} />

        {/* "Sign up today" */}
        <div
          style={{
            opacity: signUpSpring,
            transform: `translateY(${signUpY}px)`,
            fontSize: 40,
            fontWeight: 600,
            color: "rgba(255,255,255,0.8)",
            fontFamily: theme.fonts.display,
            marginTop: 20,
          }}
        >
          Sign up today.
        </div>

        {/* Crecimos.com — typed */}
        <div
          style={{
            opacity: urlOp,
            display: "flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            borderRadius: theme.radius.full,
            padding: "24px 60px",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              fontFamily: theme.fonts.display,
              letterSpacing: "-0.03em",
            }}
          >
            {url.slice(0, typedLength)}
          </span>
          <span
            style={{
              display: "inline-block",
              width: 4,
              height: 64,
              background: "white",
              marginLeft: 4,
              opacity: cursorOp,
              borderRadius: 2,
            }}
          />
        </div>

        {/* Final tagline */}
        <div
          style={{
            opacity: tagSpring,
            transform: `translateY(${tagY}px)`,
            marginTop: 40,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "white",
              fontFamily: theme.fonts.display,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Never miss
            <br />
            another call.
          </div>
        </div>
      </div>

      {/* Fade to black */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "black",
          opacity: fadeOut,
          zIndex: 10,
        }}
      />
    </AbsoluteFill>
  );
};
