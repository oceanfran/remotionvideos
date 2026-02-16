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

   Blue gradient bg, big title, animated waveform,
   feature cards animate in with stagger.
   ────────────────────────────────────────────────── */

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
    config: { damping: 12, stiffness: 90 },
  });
  const y = interpolate(s, [0, 1], [50, 0]);

  // Subtle float after entering
  const float =
    frame > delay + 20 ? Math.sin((frame - delay + index * 10) * 0.05) * 3 : 0;

  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${y + float}px)`,
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(20px)",
        borderRadius: theme.radius.lg,
        padding: "28px 36px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: theme.radius.md,
          background: "rgba(255,255,255,0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 28,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 34,
          fontWeight: 600,
          color: "white",
          fontFamily: theme.fonts.body,
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const SceneAIAnswering: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);

  const waveOp = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOp = interpolate(frame, [420, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated gradient shift
  const gradientShift = interpolate(frame, [0, 450], [0, 30], {
    extrapolateRight: "clamp",
  });

  const features = [
    { icon: "💬", label: "Answers questions", delay: 90 },
    { icon: "📋", label: "Collects info", delay: 120 },
    { icon: "✅", label: "Qualifies leads", delay: 150 },
    { icon: "🔀", label: "Transfers calls", delay: 180 },
    { icon: "📅", label: "Books to your calendar", delay: 210 },
    { icon: "🔔", label: "Sends reminders", delay: 240 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${170 + gradientShift}deg,
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
          width: 600,
          height: 600,
          top: 100,
          left: -100,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          bottom: 200,
          right: -100,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(90,200,250,0.12), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 180,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "rgba(255,255,255,0.7)",
            fontFamily: theme.fonts.body,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Now imagine
        </div>
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

      {/* Waveform */}
      <div
        style={{
          position: "absolute",
          top: 530,
          display: "flex",
          gap: 5,
          alignItems: "center",
          opacity: waveOp,
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => {
          const h = interpolate(
            (frame + i * 3) % 36,
            [0, 18, 36],
            [8, 50, 8],
            { extrapolateRight: "clamp" },
          );
          const barOp = interpolate(Math.abs(i - 20), [0, 20], [1, 0.25], {
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                width: 7,
                height: h,
                borderRadius: 4,
                background: "white",
                opacity: barOp,
              }}
            />
          );
        })}
      </div>

      {/* "24/7" label */}
      <div
        style={{
          position: "absolute",
          top: 600,
          opacity: waveOp,
          fontSize: 24,
          fontWeight: 600,
          color: "rgba(255,255,255,0.6)",
          fontFamily: theme.fonts.body,
          letterSpacing: "0.15em",
        }}
      >
        AI RECEPTIONIST — 24/7
      </div>

      {/* Feature cards */}
      <div
        style={{
          position: "absolute",
          top: 690,
          left: 60,
          right: 60,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
