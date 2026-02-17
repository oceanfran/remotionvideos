import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 3 — AI Answering  (14-29s · 450 frames)
   "Now imagine every single call gets answered — 24/7.
   AI receptionist picks up, answers questions, collects
   info, qualifies leads, transfers, books, sends reminders."

   Blue gradient bg, glowing AI waveform with pulse orb,
   feature cards with animated check-marks and glow effects,
   staggered cascade entrance, floating particles.
   ────────────────────────────────────────────────── */

/* ─── Animated feature card with check-mark reveal ─── */
const FeatureCard: React.FC<{
  icon: string;
  label: string;
  delay: number;
  index: number;
}> = ({ icon, label, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const y = interpolate(s, [0, 1], [40, 0]);
  const x = interpolate(s, [0, 1], [index % 2 === 0 ? -30 : 30, 0]);

  // Subtle float after entering
  const float =
    frame > delay + 20 ? Math.sin((frame - delay + index * 10) * 0.05) * 3 : 0;

  // Glow pulse on entrance
  const glowIntensity = interpolate(
    frame - delay,
    [8, 18, 30],
    [0, 0.5, 0.15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Check-mark reveal
  const checkSpring = spring({
    frame: frame - delay - 15,
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${y + float}px) translateX(${x}px)`,
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(24px)",
        borderRadius: theme.radius.lg,
        padding: "26px 32px",
        display: "flex",
        alignItems: "center",
        gap: 20,
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: `0 4px 20px rgba(0,0,0,0.1), 0 0 ${glowIntensity * 40}px rgba(125,211,252,${glowIntensity * 0.5})`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shimmer sweep on entrance */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
          transform: `translateX(${interpolate(frame - delay, [5, 25], [-200, 400], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}%)`,
          opacity: interpolate(frame - delay, [5, 25], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Icon container */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: theme.radius.md,
          background: "rgba(255,255,255,0.15)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 26,
          flexShrink: 0,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {icon}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 600,
          color: "white",
          fontFamily: theme.fonts.body,
          letterSpacing: "-0.01em",
          flex: 1,
        }}
      >
        {label}
      </div>

      {/* Animated check-mark */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `rgba(34, 197, 94, ${checkSpring * 0.9})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${checkSpring})`,
          flexShrink: 0,
          boxShadow: `0 0 ${checkSpring * 12}px rgba(34,197,94,0.3)`,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="24"
            strokeDashoffset={24 - checkSpring * 24}
          />
        </svg>
      </div>
    </div>
  );
};

/* ─── Floating particle ─── */
const Particle: React.FC<{
  x: number;
  y: number;
  delay: number;
  size: number;
}> = ({ x, y, delay, size }) => {
  const frame = useCurrentFrame();

  const drift = (frame - delay) * 0.3;
  const float = Math.sin((frame - delay) * 0.04 + x) * 20;
  const op = interpolate(frame - delay, [0, 15, 100, 130], [0, 0.6, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - drift,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.5)",
        opacity: op,
        transform: `translateX(${float}px)`,
        filter: "blur(1px)",
      }}
    />
  );
};

export const SceneAIAnswering: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);

  // Overline label
  const labelSpring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const waveOp = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOp = interpolate(frame, [420, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated gradient shift
  const gradientShift = interpolate(frame, [0, 450], [0, 40], {
    extrapolateRight: "clamp",
  });

  // Pulsing glow orb behind waveform
  const orbPulse = 0.8 + Math.sin(frame * 0.06) * 0.2;
  const orbScale = 1 + Math.sin(frame * 0.04) * 0.08;

  const features = [
    { icon: "💬", label: "Answers questions", delay: 80 },
    { icon: "📋", label: "Collects caller info", delay: 108 },
    { icon: "✅", label: "Qualifies leads", delay: 136 },
    { icon: "🔀", label: "Transfers calls", delay: 164 },
    { icon: "📅", label: "Books appointments", delay: 192 },
    { icon: "🔔", label: "Sends reminders", delay: 220 },
  ];

  // Particles
  const particles = [
    { x: 120, y: 600, delay: 25, size: 4 },
    { x: 350, y: 550, delay: 40, size: 3 },
    { x: 700, y: 580, delay: 55, size: 5 },
    { x: 900, y: 620, delay: 35, size: 3 },
    { x: 200, y: 640, delay: 70, size: 4 },
    { x: 800, y: 500, delay: 50, size: 3 },
    { x: 500, y: 560, delay: 85, size: 4 },
    { x: 150, y: 700, delay: 100, size: 3 },
    { x: 950, y: 680, delay: 60, size: 4 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${168 + gradientShift}deg,
          hsl(215, 100%, 58%) 0%,
          hsl(210, 100%, 44%) 40%,
          hsl(220, 90%, 35%) 100%)`,
        alignItems: "center",
        opacity: exitOp,
      }}
    >
      {/* Ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          top: 50,
          left: -150,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08), transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          bottom: 150,
          right: -100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(90,200,250,0.12), transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Pulsing orb behind waveform */}
      <div
        style={{
          position: "absolute",
          top: 450,
          left: "50%",
          transform: `translate(-50%, -50%) scale(${orbScale})`,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(125,211,252,${orbPulse * 0.15}), transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Overline label */}
      <div
        style={{
          position: "absolute",
          top: 170,
          opacity: labelSpring,
          transform: `translateY(${interpolate(labelSpring, [0, 1], [20, 0])}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            fontFamily: theme.fonts.body,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Now imagine
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 220,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: "white",
            fontFamily: theme.fonts.display,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Every call
          <br />
          gets answered.
        </div>
      </div>

      {/* Waveform with glow */}
      <div
        style={{
          position: "absolute",
          top: 480,
          display: "flex",
          gap: 5,
          alignItems: "center",
          opacity: waveOp,
        }}
      >
        {Array.from({ length: 44 }).map((_, i) => {
          const h = interpolate(
            (frame + i * 3) % 36,
            [0, 18, 36],
            [8, 55, 8],
            { extrapolateRight: "clamp" },
          );
          const barOp = interpolate(Math.abs(i - 22), [0, 22], [1, 0.2], {
            extrapolateRight: "clamp",
          });
          // Color shift: center bars are brighter cyan
          const centerDist = Math.abs(i - 22) / 22;
          const r = Math.round(255 - centerDist * 30);
          const g = Math.round(255 - centerDist * 10);
          const b = 255;

          return (
            <div
              key={i}
              style={{
                width: 6,
                height: h,
                borderRadius: 3,
                background: `rgb(${r}, ${g}, ${b})`,
                opacity: barOp,
                boxShadow:
                  centerDist < 0.4
                    ? `0 0 ${8 - centerDist * 16}px rgba(125,211,252,0.4)`
                    : "none",
              }}
            />
          );
        })}
      </div>

      {/* "24/7" badge */}
      <div
        style={{
          position: "absolute",
          top: 555,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: waveOp,
        }}
      >
        {/* Pulsing dot */}
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#22C55E",
            boxShadow: `0 0 ${6 + Math.sin(frame * 0.15) * 4}px rgba(34,197,94,0.6)`,
          }}
        />
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            fontFamily: theme.fonts.body,
            letterSpacing: "0.15em",
          }}
        >
          AI RECEPTIONIST — 24/7
        </div>
      </div>

      {/* Feature cards */}
      <div
        style={{
          position: "absolute",
          top: 630,
          left: 55,
          right: 55,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
