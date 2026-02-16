import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 2 — The Cost  (5-14s · 270 frames)
   "Every one of those callers didn't leave a voicemail
   — they called the next company on Google.
   $500 to $15,000 per missed call. Gone."
   ────────────────────────────────────────────────── */

const AnimatedDollar: React.FC<{
  amount: string;
  delay: number;
  color: string;
}> = ({ amount, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const y = interpolate(s, [0, 1], [60, 0]);
  const float = frame > delay + 15 ? Math.sin((frame - delay) * 0.06) * 5 : 0;

  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${y + float}px) scale(${interpolate(s, [0, 1], [0.8, 1])})`,
        fontSize: 110,
        fontWeight: 800,
        color,
        fontFamily: theme.fonts.display,
        letterSpacing: "-0.04em",
        textAlign: "center",
        filter: `drop-shadow(0 4px 20px ${color}30)`,
      }}
    >
      {amount}
    </div>
  );
};

export const SceneCost: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const textY = interpolate(textSpring, [0, 1], [60, 0]);

  const dollarsVisible = frame >= 60;

  const goneDelay = 180;
  const goneSpring = spring({
    frame: frame - goneDelay,
    fps,
    config: { damping: 8, stiffness: 150 },
  });
  const goneScale = interpolate(goneSpring, [0, 1], [0.3, 1]);

  const bgTransition = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOp = interpolate(frame, [245, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textFadeOut = interpolate(frame, [55, 75], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg,
          hsl(0, 0%, ${interpolate(bgTransition, [0, 1], [100, 98])}%) 0%,
          hsl(210, ${interpolate(bgTransition, [0, 1], [0, 40])}%, ${interpolate(bgTransition, [0, 1], [100, 96])}%) 100%)`,
        alignItems: "center",
        opacity: exitOp,
      }}
    >
      {/* Phase 1: "They called the next company" */}
      <div
        style={{
          position: "absolute",
          top: 460,
          opacity: textSpring * textFadeOut,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          They called the
          <br />
          <span style={{ color: theme.colors.primary }}>next company</span>
          <br />
          on Google.
        </div>
      </div>

      {/* Phase 2: Dollar amounts */}
      {dollarsVisible && (
        <div
          style={{
            position: "absolute",
            top: 360,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body,
              opacity: interpolate(frame, [60, 75], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Per missed call
          </div>

          <AnimatedDollar amount="$500" delay={75} color={theme.colors.warning} />
          <div
            style={{
              fontSize: 36,
              color: theme.colors.textMuted,
              fontFamily: theme.fonts.body,
              opacity: interpolate(frame, [100, 110], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            to
          </div>
          <AnimatedDollar amount="$15,000" delay={110} color={theme.colors.danger} />
        </div>
      )}

      {/* "Gone." */}
      <div
        style={{
          position: "absolute",
          bottom: 360,
          opacity: goneSpring,
          transform: `scale(${goneScale})`,
          fontSize: 96,
          fontWeight: 900,
          color: theme.colors.text,
          fontFamily: theme.fonts.display,
          letterSpacing: "-0.04em",
        }}
      >
        Gone.
      </div>
    </AbsoluteFill>
  );
};
