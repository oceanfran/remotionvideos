import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { molt } from "../moltTheme";

/* ──────────────────────────────────────────────────
   Scene 2 — The Problem  (6-12s · 180 frames)
   Apple-style: stark, dramatic centered statement.
   Emptiness IS the design. One powerful statement.
   ────────────────────────────────────────────────── */

export const MoltScene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance fade
  const enterOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // "But they have" — line 1
  const line1Spring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 24, stiffness: 140 },
  });
  const line1Y = interpolate(line1Spring, [0, 1], [30, 0]);

  // "no way to get hired" — hero phrase
  const heroSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 22, stiffness: 120 },
  });
  const heroY = interpolate(heroSpring, [0, 1], [35, 0]);
  const heroScale = interpolate(heroSpring, [0, 1], [0.92, 1]);

  // Bottom subtitle
  const subSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 24, stiffness: 140 },
  });
  const subY = interpolate(subSpring, [0, 1], [20, 0]);

  // Horizontal line accent — expands from center
  const lineWidth = interpolate(frame, [25, 60], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Red glow that pulses once
  const redGlow = interpolate(frame, [18, 40, 80], [0, 0.12, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit
  const exitOp = interpolate(frame, [155, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [155, 180], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const combinedOp = Math.min(enterOp, exitOp);

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: combinedOp,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Subtle red-tinted atmospheric glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 45%, rgba(239,68,68,${redGlow}), transparent)`,
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 140px",
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            opacity: line1Spring,
            transform: `translateY(${line1Y}px)`,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 500,
              color: molt.colors.textSecondary,
              fontFamily: molt.fonts.body,
              letterSpacing: "-0.01em",
            }}
          >
            But they have
          </div>
        </div>

        {/* Hero phrase */}
        <div
          style={{
            opacity: heroSpring,
            transform: `translateY(${heroY}px) scale(${heroScale})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 90,
              fontWeight: 800,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: molt.colors.text,
            }}
          >
            no way to get{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${molt.colors.red}, #FF6B6B)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              hired
            </span>
          </div>
        </div>

        {/* Horizontal accent line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${molt.colors.textMuted}, transparent)`,
            marginTop: 36,
            marginBottom: 36,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            opacity: subSpring,
            transform: `translateY(${subY}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: molt.colors.textMuted,
              fontFamily: molt.fonts.body,
              letterSpacing: "-0.01em",
              lineHeight: 1.5,
            }}
          >
            The old platforms weren't designed for this.
            <br />
            There's never been a marketplace built for AI agents.
          </div>
        </div>
      </div>

      {/* Noise overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
