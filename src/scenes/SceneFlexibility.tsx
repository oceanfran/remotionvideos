import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 4 — Flexibility  (29-35s · 180 frames)
   "Set it to answer every call, or just the ones you
   can't get to. No more losing customers to voicemail."

   Two option cards on white bg, then tagline.
   ────────────────────────────────────────────────── */

export const SceneFlexibility: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);

  const card1Spring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 90 },
  });
  const card1Y = interpolate(card1Spring, [0, 1], [80, 0]);

  const card2Spring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 90 },
  });
  const card2Y = interpolate(card2Spring, [0, 1], [80, 0]);

  const subtitleSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14 },
  });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);

  const clockRotation = (frame * 4) % 360;

  const exitOp = interpolate(frame, [155, 180], [1, 0], {
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
      {/* Subtle bg */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 95%, 96%) 0%, transparent 50%)",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 260,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          padding: "0 60px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Your choice.
        </div>
      </div>

      {/* Card 1: Answer Every Call */}
      <div
        style={{
          position: "absolute",
          top: 480,
          opacity: card1Spring,
          transform: `translateY(${card1Y}px)`,
          width: 900,
          background: theme.colors.bgCard,
          borderRadius: theme.radius.xl,
          padding: "48px 52px",
          border: `2px solid ${theme.colors.primary}20`,
          display: "flex",
          alignItems: "center",
          gap: 36,
          boxShadow: theme.shadows.cardLg,
          zIndex: 1,
        }}
      >
        {/* Spinning clock */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.primaryLight}15)`,
            border: `3px solid ${theme.colors.primary}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 3,
              height: 30,
              background: theme.colors.primary,
              borderRadius: 2,
              transformOrigin: "bottom center",
              transform: `rotate(${clockRotation}deg)`,
              bottom: "50%",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: theme.colors.primary,
            }}
          />
        </div>

        <div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              fontFamily: theme.fonts.display,
              letterSpacing: "-0.02em",
              background: theme.colors.gradientText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Answer Every Call
          </div>
          <div
            style={{
              fontSize: 28,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body,
              marginTop: 8,
            }}
          >
            24/7 — nights, weekends, holidays
          </div>
        </div>
      </div>

      {/* Card 2: Overflow */}
      <div
        style={{
          position: "absolute",
          top: 740,
          opacity: card2Spring,
          transform: `translateY(${card2Y}px)`,
          width: 900,
          background: theme.colors.bgCard,
          borderRadius: theme.radius.xl,
          padding: "48px 52px",
          border: `1px solid ${theme.colors.border}`,
          display: "flex",
          alignItems: "center",
          gap: 36,
          boxShadow: theme.shadows.card,
          zIndex: 1,
        }}
      >
        {/* Phone icon */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: theme.colors.bgSubtle,
            border: `2px solid ${theme.colors.border}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
              stroke={theme.colors.textSecondary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: theme.colors.text,
              fontFamily: theme.fonts.display,
              letterSpacing: "-0.02em",
            }}
          >
            Overflow Only
          </div>
          <div
            style={{
              fontSize: 28,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body,
              marginTop: 8,
            }}
          >
            Only picks up when you can't
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 360,
          opacity: subtitleSpring,
          transform: `translateY(${subtitleY}px)`,
          textAlign: "center",
          padding: "0 80px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
          }}
        >
          No more losing customers
          <br />
          <span style={{ color: theme.colors.primary }}>to voicemail.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
