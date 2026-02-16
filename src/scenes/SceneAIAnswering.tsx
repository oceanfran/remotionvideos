import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 3 — The AI Answering  (12-24 s · 360 frames)
   Big title springs in, waveform animates, features
   list in vertically. Apple keynote: clean depth.
   ────────────────────────────────────────────────── */

const FeatureRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  delay: number;
}> = ({ icon, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 100 } });
  const x = interpolate(s, [0, 1], [60, 0]);

  return (
    <div
      style={{
        opacity: s,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "20px 0",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: `${theme.colors.accent}12`,
          border: `1.5px solid ${theme.colors.accent}30`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 600,
          color: theme.colors.text,
          fontFamily: theme.fonts.body,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const FeatureIcon: React.FC<{ d: string }> = ({ d }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d={d} stroke={theme.colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SceneAIAnswering: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);

  const waveOp = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOp = interpolate(frame, [335, 360], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const features = [
    { icon: <FeatureIcon d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />, label: "Answers questions", delay: 80 },
    { icon: <FeatureIcon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />, label: "Collects info", delay: 120 },
    { icon: <FeatureIcon d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />, label: "Qualifies leads", delay: 160 },
    { icon: <FeatureIcon d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />, label: "Routes & transfers", delay: 200 },
    { icon: <FeatureIcon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />, label: "Books appointments", delay: 240 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        alignItems: "center",
        opacity: exitOp,
      }}
    >
      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 200,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: theme.colors.accent,
            fontFamily: theme.fonts.body,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Now imagine
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            fontFamily: theme.fonts.display,
            background: theme.colors.gradientAccent,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          Every call
          <br />
          gets answered.
        </div>
      </div>

      {/* Waveform */}
      <div
        style={{
          position: "absolute",
          top: 600,
          display: "flex",
          gap: 6,
          alignItems: "center",
          opacity: waveOp,
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => {
          const h = interpolate(
            (frame + i * 3) % 36,
            [0, 18, 36],
            [12, 60, 12],
            { extrapolateRight: "clamp" },
          );
          const barOp = interpolate(Math.abs(i - 20), [0, 20], [1, 0.3], {
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                width: 8,
                height: h,
                borderRadius: 4,
                background: theme.colors.accent,
                opacity: barOp,
              }}
            />
          );
        })}
      </div>

      {/* Active label */}
      <div
        style={{
          position: "absolute",
          top: 690,
          opacity: waveOp,
          fontSize: 22,
          fontWeight: 500,
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.body,
          letterSpacing: 2,
        }}
      >
        AI RECEPTIONIST — 24/7
      </div>

      {/* Feature list */}
      <div
        style={{
          position: "absolute",
          top: 800,
          left: 100,
          right: 100,
        }}
      >
        {features.map((f, i) => (
          <FeatureRow key={i} {...f} />
        ))}
      </div>

      {/* Progress dots */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          display: "flex",
          gap: 14,
        }}
      >
        {features.map((f, i) => {
          const active = frame >= f.delay + 15;
          return (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: active ? theme.colors.accent : theme.colors.textTertiary,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
