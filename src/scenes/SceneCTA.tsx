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
   typed URL with pill glow, sparkle particles,
   animated CTA button with pulsing glow,
   final tagline. Blue gradient bg with dynamic
   ambient lighting.
   ────────────────────────────────────────────────── */

/* ─── Sparkle particle ─── */
const Sparkle: React.FC<{
  x: number;
  y: number;
  delay: number;
  size: number;
}> = ({ x, y, delay, size }) => {
  const frame = useCurrentFrame();

  const lifeProgress = (frame - delay) * 0.02;
  const op = interpolate(
    frame - delay,
    [0, 10, 40, 60],
    [0, 0.8, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const drift = Math.sin((frame - delay) * 0.05 + x * 0.1) * 15;
  const rise = (frame - delay) * 0.4;

  return (
    <div
      style={{
        position: "absolute",
        left: x + drift,
        top: y - rise,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "white",
        opacity: op,
        boxShadow: `0 0 ${size * 2}px rgba(255,255,255,0.6)`,
        transform: `scale(${1 + Math.sin(lifeProgress * 3) * 0.3})`,
      }}
    />
  );
};

// Crecimos waveform logo — animated bars with glow
const CrecimosLogo: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const float = Math.sin(frame * 0.04) * 5;

  // Bar heights for the waveform (matching Crecimos brand)
  const baseHeights = [24, 40, 56, 72, 64, 48, 36, 28];

  // Logo glow pulse
  const glowPulse = 0.3 + Math.sin(frame * 0.06) * 0.1;

  return (
    <div
      style={{
        opacity: enterSpring,
        transform: `scale(${interpolate(enterSpring, [0, 1], [0.7, 1])}) translateY(${float}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
        filter: `drop-shadow(0 0 ${20 + Math.sin(frame * 0.08) * 8}px rgba(125,211,252,${glowPulse}))`,
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
          const waveOffset = Math.sin(frame * 0.08 + i * 0.7) * 14;
          const h = Math.max(16, baseH + waveOffset);

          // Staggered bar entrance
          const barSpring = spring({
            frame: frame - 8 - i * 3,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          return (
            <div
              key={i}
              style={{
                width: 14,
                height: h * barSpring,
                borderRadius: 7,
                background: `linear-gradient(180deg, #FFFFFF, hsl(${200 + i * 5}, 90%, 75%))`,
                boxShadow: `0 0 ${6 + Math.sin(frame * 0.08 + i) * 3}px rgba(125,211,252,0.3)`,
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
          background: "linear-gradient(135deg, #FFFFFF, #7DD3FC, #FFFFFF)",
          backgroundSize: "200% 100%",
          backgroundPosition: `${50 + Math.sin(frame * 0.03) * 30}% 0%`,
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
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const signUpY = interpolate(signUpSpring, [0, 1], [25, 0]);

  // URL typing — "Crecimos.com"
  const url = "Crecimos.com";
  const typedLength = Math.min(
    url.length,
    Math.floor(
      interpolate(frame, [45, 85], [0, url.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
  const urlOp = interpolate(frame, [40, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL pill glow when typing completes
  const urlGlow = interpolate(frame, [85, 100, 130], [0, 0.6, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor blink
  const cursorOp =
    frame >= 45 && frame < 130
      ? Math.floor(frame / 8) % 2 === 0
        ? 1
        : 0
      : 0;

  // CTA Button
  const buttonSpring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const buttonY = interpolate(buttonSpring, [0, 1], [30, 0]);
  const buttonGlow = 25 + Math.sin(frame * 0.08) * 12;

  // Final tagline
  const tagSpring = spring({
    frame: frame - 130,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const tagY = interpolate(tagSpring, [0, 1], [25, 0]);

  // Fade to black
  const fadeOut = interpolate(frame, [185, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated gradient
  const gradientAngle = interpolate(frame, [0, 210], [160, 200], {
    extrapolateRight: "clamp",
  });

  // Sparkle particles
  const sparkles = [
    { x: 150, y: 400, delay: 30, size: 4 },
    { x: 800, y: 350, delay: 45, size: 3 },
    { x: 300, y: 700, delay: 60, size: 5 },
    { x: 900, y: 600, delay: 40, size: 3 },
    { x: 500, y: 300, delay: 55, size: 4 },
    { x: 700, y: 800, delay: 70, size: 3 },
    { x: 200, y: 900, delay: 85, size: 4 },
    { x: 850, y: 450, delay: 50, size: 3 },
    { x: 400, y: 1000, delay: 95, size: 4 },
    { x: 650, y: 500, delay: 75, size: 5 },
    { x: 100, y: 600, delay: 110, size: 3 },
    { x: 950, y: 750, delay: 65, size: 4 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg,
          hsl(215, 100%, 58%) 0%,
          hsl(210, 100%, 50%) 35%,
          hsl(220, 90%, 40%) 100%)`,
      }}
    >
      {/* Ambient glow — center */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          left: "50%",
          top: "35%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12), transparent 55%)",
          filter: "blur(60px)",
        }}
      />
      {/* Accent glow — bottom */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          left: "50%",
          bottom: -100,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(90,200,250,0.08), transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      {/* Sparkle particles */}
      {sparkles.map((s, i) => (
        <Sparkle key={i} {...s} />
      ))}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 28,
          zIndex: 1,
        }}
      >
        {/* Crecimos Logo */}
        <CrecimosLogo frame={frame} fps={fps} />

        {/* "Sign up today" */}
        <div
          style={{
            opacity: signUpSpring,
            transform: `translateY(${signUpY}px)`,
            fontSize: 38,
            fontWeight: 600,
            color: "rgba(255,255,255,0.8)",
            fontFamily: theme.fonts.display,
            marginTop: 16,
            letterSpacing: "-0.01em",
          }}
        >
          Sign up today.
        </div>

        {/* Crecimos.com — typed with glow pill */}
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
            boxShadow: `0 0 ${urlGlow * 50}px rgba(125,211,252,${urlGlow * 0.4})`,
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

        {/* CTA Button */}
        <div
          style={{
            opacity: buttonSpring,
            transform: `translateY(${buttonY}px) scale(${interpolate(buttonSpring, [0, 1], [0.8, 1])})`,
            marginTop: 8,
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))",
              backdropFilter: "blur(16px)",
              borderRadius: theme.radius.full,
              padding: "22px 56px",
              border: "1.5px solid rgba(255,255,255,0.3)",
              boxShadow: `0 0 ${buttonGlow}px rgba(125,211,252,0.3), 0 4px 20px rgba(0,0,0,0.15)`,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            {/* Arrow icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "white",
                fontFamily: theme.fonts.display,
                letterSpacing: "-0.01em",
              }}
            >
              Get Started Free
            </span>
          </div>
        </div>

        {/* Final tagline */}
        <div
          style={{
            opacity: tagSpring,
            transform: `translateY(${tagY}px)`,
            marginTop: 32,
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
