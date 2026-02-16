import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 2 — The Cost  (6-12 s · 180 frames)
   Dollar amounts float up and vanish like smoke.
   ────────────────────────────────────────────────── */

const FloatingDollar: React.FC<{
  amount: string;
  delay: number;
  x: number;
}> = ({ amount, delay, x }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame - delay, [0, 15, 35, 50], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame - delay, [0, 50], [0, -120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame - delay, [35, 50], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 480,
        opacity: op,
        transform: `translateY(${y}px) scale(${scale})`,
        fontSize: 64,
        fontWeight: 800,
        color: theme.colors.danger,
        fontFamily: theme.fonts.heading,
        textShadow: `0 0 40px ${theme.colors.danger}60`,
      }}
    >
      {amount}
    </div>
  );
};

export const SceneCost: React.FC = () => {
  const frame = useCurrentFrame();

  // Character + Google animation
  const charOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text
  const textOp = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [5, 25], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOp = interpolate(frame, [160, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bgDark,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOp,
      }}
    >
      {/* Top text */}
      <div
        style={{
          position: "absolute",
          top: 120,
          opacity: textOp,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.heading,
          }}
        >
          They called the next company on Google.
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: theme.colors.warning,
            fontFamily: theme.fonts.heading,
            marginTop: 12,
          }}
        >
          That revenue? Gone.
        </div>
      </div>

      {/* Generic character with phone */}
      <div
        style={{
          opacity: charOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: 300,
          zIndex: 1,
        }}
      >
        {/* head */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: theme.colors.textMuted,
          }}
        />
        {/* body */}
        <div
          style={{
            width: 100,
            height: 120,
            borderRadius: "20px 20px 0 0",
            background: theme.colors.bgCard,
            marginTop: -10,
            display: "flex",
            justifyContent: "center",
            paddingTop: 30,
          }}
        >
          {/* phone in hand */}
          <div
            style={{
              width: 40,
              height: 60,
              borderRadius: 8,
              background: theme.colors.textMuted,
              border: `2px solid ${theme.colors.textSecondary}`,
            }}
          />
        </div>
      </div>

      {/* Floating dollar amounts */}
      <FloatingDollar amount="$800" delay={40} x={350} />
      <FloatingDollar amount="$3,500" delay={75} x={850} />
      <FloatingDollar amount="$12,000" delay={110} x={1300} />
    </AbsoluteFill>
  );
};
