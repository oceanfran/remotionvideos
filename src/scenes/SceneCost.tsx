import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 2 — The Cost  (6-12 s · 180 frames)
   Dollar amounts spring in large, drift up & dissolve.
   Apple keynote: dark bg, large bold numbers, clean.
   ────────────────────────────────────────────────── */

const FloatingAmount: React.FC<{
  amount: string;
  delay: number;
  y: number;
}> = ({ amount, delay, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
  const drift = interpolate(frame - delay, [0, 60], [0, -100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame - delay, [35, 55], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame - delay, [35, 55], [1, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const op = Math.min(enter, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: "50%",
        transform: `translateX(-50%) translateY(${drift}px) scale(${enter * scale})`,
        opacity: op,
        fontSize: 96,
        fontWeight: 800,
        color: theme.colors.danger,
        fontFamily: theme.fonts.display,
        letterSpacing: -2,
        textAlign: "center",
        filter: `blur(${interpolate(frame - delay, [40, 55], [0, 4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
      }}
    >
      {amount}
    </div>
  );
};

export const SceneCost: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({ frame: frame - 5, fps, config: { damping: 15, stiffness: 80 } });
  const textY = interpolate(textSpring, [0, 1], [50, 0]);

  // "Gone." punch
  const goneSpring = spring({ frame: frame - 25, fps, config: { damping: 10, stiffness: 150 } });

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
      {/* Top text */}
      <div
        style={{
          position: "absolute",
          top: 320,
          opacity: textSpring,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.display,
            lineHeight: 1.3,
          }}
        >
          They called the next
          <br />
          company on Google.
        </div>
      </div>

      {/* "Gone." — dramatic */}
      <div
        style={{
          position: "absolute",
          top: 560,
          left: "50%",
          transform: `translateX(-50%) scale(${goneSpring})`,
          opacity: goneSpring,
          fontSize: 80,
          fontWeight: 800,
          color: theme.colors.warning,
          fontFamily: theme.fonts.display,
          letterSpacing: -1,
        }}
      >
        Gone.
      </div>

      {/* Floating dollar amounts */}
      <FloatingAmount amount="$500" delay={35} y={780} />
      <FloatingAmount amount="$3,500" delay={65} y={980} />
      <FloatingAmount amount="$15,000" delay={95} y={1180} />
    </AbsoluteFill>
  );
};
