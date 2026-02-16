import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 5 — Flexibility  (28-34 s · 180 frames)
   Two stacked cards: "Answer Every Call" and "Overflow".
   Apple keynote: spring cards, depth, clean type.
   ────────────────────────────────────────────────── */

export const SceneFlexibility: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  const card1Spring = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 100 } });
  const card1Y = interpolate(card1Spring, [0, 1], [80, 0]);

  const card2Spring = spring({ frame: frame - 35, fps, config: { damping: 14, stiffness: 100 } });
  const card2Y = interpolate(card2Spring, [0, 1], [80, 0]);

  const subtitleSpring = spring({ frame: frame - 60, fps, config: { damping: 15 } });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);

  // Clock rotation
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
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 260,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            lineHeight: 1.2,
            letterSpacing: -1,
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
          width: 860,
          background: theme.colors.bgCard,
          borderRadius: 28,
          padding: "48px 56px",
          border: `1.5px solid ${theme.colors.accent}25`,
          display: "flex",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Spinning clock */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `3px solid ${theme.colors.accent}`,
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
              height: 32,
              background: theme.colors.accent,
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
              background: theme.colors.accent,
            }}
          />
        </div>

        <div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: theme.colors.accent,
              fontFamily: theme.fonts.display,
            }}
          >
            Answer Every Call
          </div>
          <div
            style={{
              fontSize: 26,
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
          width: 860,
          background: theme.colors.bgCard,
          borderRadius: 28,
          padding: "48px 56px",
          border: `1.5px solid ${theme.colors.textTertiary}30`,
          display: "flex",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Phone icon */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `3px solid ${theme.colors.textSecondary}`,
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
              fontSize: 40,
              fontWeight: 700,
              color: theme.colors.text,
              fontFamily: theme.fonts.display,
            }}
          >
            Overflow Only
          </div>
          <div
            style={{
              fontSize: 26,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body,
              marginTop: 8,
            }}
          >
            Only picks up when you can't
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 400,
          opacity: subtitleSpring,
          transform: `translateY(${subtitleY}px)`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.display,
            lineHeight: 1.4,
          }}
        >
          No more losing customers
          <br />
          to voicemail.
        </div>
      </div>
    </AbsoluteFill>
  );
};
