import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 3 — The AI Answering  (12-24 s · 360 frames)
   Waveform answers, feature icons pop in one at a time.
   ────────────────────────────────────────────────── */

const FeatureIcon: React.FC<{
  icon: string;
  label: string;
  delay: number;
  x: number;
  y: number;
}> = ({ icon, label, delay, x, y }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame - delay, [0, 15], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const moveY = interpolate(frame - delay, [0, 15], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: op,
        transform: `scale(${scale}) translateY(${moveY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: theme.colors.bgCard,
          border: `1px solid ${theme.colors.primaryLight}30`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 40,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.body,
          textAlign: "center",
          maxWidth: 130,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const SceneAIAnswering: React.FC = () => {
  const frame = useCurrentFrame();

  // Background brightening
  const bgBrightness = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgColor = `rgb(${15 + bgBrightness * 8}, ${17 + bgBrightness * 10}, ${23 + bgBrightness * 15})`;

  // "AI Answers" title
  const titleOp = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [5, 25], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Waveform
  const waveOp = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOp = interpolate(frame, [340, 360], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const features = [
    { icon: "💬", label: "Answers Questions", delay: 80, x: 160, y: 480 },
    { icon: "📋", label: "Collects Info", delay: 120, x: 420, y: 480 },
    { icon: "✅", label: "Qualifies Leads", delay: 160, x: 680, y: 480 },
    { icon: "🔀", label: "Routes to Team", delay: 200, x: 940, y: 480 },
    { icon: "📞", label: "Transfers Calls", delay: 240, x: 1200, y: 480 },
    { icon: "📅", label: "Books Appointments", delay: 280, x: 1460, y: 480 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: bgColor,
        justifyContent: "flex-start",
        alignItems: "center",
        opacity: exitOp,
      }}
    >
      {/* Title */}
      <div
        style={{
          marginTop: 80,
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: theme.colors.accent,
            fontFamily: theme.fonts.body,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Now imagine
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            fontFamily: theme.fonts.heading,
            background: theme.colors.gradientPrimary,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Every call gets answered.
        </div>
      </div>

      {/* Waveform */}
      <div
        style={{
          marginTop: 50,
          display: "flex",
          gap: 5,
          alignItems: "center",
          opacity: waveOp,
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => {
          const h = interpolate(
            (frame + i * 4) % 40,
            [0, 20, 40],
            [15, 50, 15],
            { extrapolateRight: "clamp" },
          );
          return (
            <div
              key={i}
              style={{
                width: 6,
                height: h,
                borderRadius: 3,
                background: theme.colors.gradientPrimary,
              }}
            />
          );
        })}
      </div>

      {/* Subtitle below waveform */}
      <div
        style={{
          marginTop: 16,
          opacity: waveOp,
          fontSize: 20,
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.body,
        }}
      >
        AI Receptionist Active — 24/7
      </div>

      {/* Feature icons */}
      {features.map((f, i) => (
        <FeatureIcon key={i} {...f} />
      ))}

      {/* Bottom label row showing current feature being announced */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          gap: 16,
        }}
      >
        {features.map((f, i) => {
          const active = frame >= f.delay + 15;
          return (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: active
                  ? theme.colors.accent
                  : `${theme.colors.textMuted}40`,
                transition: "background 0.3s",
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
