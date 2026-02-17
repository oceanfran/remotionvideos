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
   Scene 5a — "Not just a freelance marketplace.
   This is where the future of hiring is going."
   Transition from "freelance" crossed out to
   "The future of hiring" in gold.
   ────────────────────────────────────────────────── */

export const MoltScene5a_FutureHiring: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  /* ── Entrance ── */
  const entranceOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Exit ── */
  const exitStart = durationInFrames - 25;
  const exitOp = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [exitStart, durationInFrames], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 1: "Not just a freelance marketplace" (0-80) ── */
  const phase1Spring = spring({
    frame,
    fps,
    config: { damping: 24, stiffness: 130 },
  });
  const phase1Y = interpolate(phase1Spring, [0, 1], [30, 0]);

  /* Strikethrough animation on "freelance" */
  const strikeProgress = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* "freelance" dims as strikethrough appears */
  const freelanceDim = interpolate(frame, [50, 70], [1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 2: "The future of hiring" reveal (70+) ── */
  const phase2Spring = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 22, stiffness: 140 },
  });
  const phase2Y = interpolate(phase2Spring, [0, 1], [40, 0]);

  /* Gold flash on "hiring" */
  const goldFlash = interpolate(frame, [80, 100, 120], [0, 0.2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: Math.min(entranceOp, exitOp),
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 50% 40% at 50% 45%, ${molt.colors.goldGlow}, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Centered content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          padding: "0 160px",
        }}
      >
        {/* Phase 1: "Not just a freelance marketplace" */}
        <div
          style={{
            opacity: phase1Spring,
            transform: `translateY(${phase1Y}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 50,
              fontWeight: 600,
              fontFamily: molt.fonts.display,
              color: molt.colors.textSecondary,
              letterSpacing: "-0.03em",
              lineHeight: 1.3,
            }}
          >
            Not just a{" "}
            <span
              style={{
                position: "relative",
                display: "inline-block",
                opacity: freelanceDim,
              }}
            >
              freelance marketplace
              {/* Animated strikethrough */}
              <div
                style={{
                  position: "absolute",
                  top: "55%",
                  left: 0,
                  height: 3,
                  width: `${strikeProgress * 100}%`,
                  background: molt.colors.red,
                  borderRadius: 2,
                }}
              />
            </span>
          </div>
        </div>

        {/* Phase 2: "The future of hiring" */}
        <div
          style={{
            opacity: phase2Spring,
            transform: `translateY(${phase2Y}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              color: molt.colors.text,
            }}
          >
            The future of{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold}, ${molt.colors.goldDark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              hiring
            </span>
          </div>
        </div>
      </div>

      {/* Gold flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${molt.colors.goldGlowStrong}, transparent 60%)`,
          opacity: goldFlash,
          pointerEvents: "none",
        }}
      />

      {/* Film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          mixBlendMode: "overlay" as const,
        }}
      />
    </AbsoluteFill>
  );
};
