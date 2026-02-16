import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 1 — The Hook  (0-5s · 150 frames)
   "How many calls did your business miss this week?
   Be honest."
   ────────────────────────────────────────────────── */

const PulseRing: React.FC<{ delay: number; x: number; y: number }> = ({
  delay,
  x,
  y,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const ringProgress = Math.max(0, (frame - delay - 10) * 0.04);
  const ring1Scale = 1 + (ringProgress % 1) * 0.6;
  const ring1Op = 1 - (ringProgress % 1);
  const ring2Scale = 1 + ((ringProgress + 0.5) % 1) * 0.6;
  const ring2Op = 1 - ((ringProgress + 0.5) % 1);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${enter})`,
        opacity: enter,
      }}
    >
      {frame > delay + 10 && (
        <>
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              left: -60,
              top: -60,
              borderRadius: "50%",
              border: `3px solid ${theme.colors.primary}`,
              opacity: ring1Op * 0.4,
              transform: `scale(${ring1Scale})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              left: -60,
              top: -60,
              borderRadius: "50%",
              border: `3px solid ${theme.colors.primary}`,
              opacity: ring2Op * 0.4,
              transform: `scale(${ring2Scale})`,
            }}
          />
        </>
      )}

      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 8px 32px rgba(0,112,224,0.3)",
          position: "relative",
          left: -60,
          top: -60,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          top: -80,
          left: 20,
          background: theme.colors.danger,
          borderRadius: theme.radius.full,
          padding: "10px 28px",
          fontSize: 24,
          fontWeight: 700,
          color: "white",
          fontFamily: theme.fonts.body,
          opacity: interpolate(frame - delay, [20, 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${interpolate(frame - delay, [20, 28], [0.5, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })})`,
          boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
        }}
      >
        Missed
      </div>
    </div>
  );
};

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);

  const honestSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const honestY = interpolate(honestSpring, [0, 1], [40, 0]);

  const exitOp = interpolate(frame, [125, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        alignItems: "center",
        opacity: exitOp,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 50% 30%, hsl(210, 95%, 95%) 0%, transparent 60%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 340,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          padding: "0 80px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 82,
            fontWeight: 800,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          How many calls
          <br />
          did your business
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 800,
            fontFamily: theme.fonts.display,
            marginTop: 12,
            letterSpacing: "-0.03em",
            background: theme.colors.gradientText,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          miss this week?
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 780,
          opacity: honestSpring,
          transform: `translateY(${honestY}px)`,
          fontSize: 42,
          fontWeight: 600,
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.body,
          letterSpacing: "-0.01em",
          zIndex: 1,
        }}
      >
        Be honest.
      </div>

      <PulseRing delay={8} x={270} y={1100} />
      <PulseRing delay={22} x={540} y={1280} />
      <PulseRing delay={36} x={810} y={1100} />
    </AbsoluteFill>
  );
};
