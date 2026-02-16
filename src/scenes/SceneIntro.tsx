import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 1 — The Hook  (0-6 s · 180 frames)
   Three phones ring, nobody answers, "Missed Call"
   bubbles stack up fast.
   ────────────────────────────────────────────────── */

const Phone: React.FC<{
  x: number;
  y: number;
  ringStart: number;
  missStart: number;
  label: string;
}> = ({ x, y, ringStart, missStart, label }) => {
  const frame = useCurrentFrame();

  // phone appears
  const phoneOp = interpolate(frame, [ringStart, ringStart + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ringing vibration
  const vibrate =
    frame >= ringStart && frame < missStart
      ? Math.sin((frame - ringStart) * 1.8) * 4
      : 0;

  // missed-call badge
  const badgeOp = interpolate(frame, [missStart, missStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badgeY = interpolate(frame, [missStart, missStart + 10], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: phoneOp,
        transform: `translateX(${vibrate}px)`,
      }}
    >
      {/* phone body */}
      <div
        style={{
          width: 120,
          height: 200,
          borderRadius: 20,
          background: theme.colors.bgCard,
          border: `2px solid ${theme.colors.primaryLight}30`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          position: "relative",
        }}
      >
        {/* notch */}
        <div
          style={{
            position: "absolute",
            top: 10,
            width: 50,
            height: 8,
            borderRadius: 4,
            background: theme.colors.bgDark,
          }}
        />
        {/* ring icon */}
        <div style={{ fontSize: 40 }}>📱</div>
        <div
          style={{
            fontSize: 14,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.body,
          }}
        >
          {label}
        </div>
      </div>

      {/* missed call badge */}
      <div
        style={{
          position: "absolute",
          top: -18,
          right: -30,
          opacity: badgeOp,
          transform: `translateY(${badgeY}px)`,
          background: theme.colors.danger,
          borderRadius: 12,
          padding: "6px 14px",
          fontSize: 13,
          fontWeight: 700,
          color: "white",
          fontFamily: theme.fonts.body,
          whiteSpace: "nowrap",
        }}
      >
        Missed Call
      </div>
    </div>
  );
};

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();

  // Title
  const titleOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Counter that stacks up
  const missedCount = Math.min(
    3,
    frame < 50 ? 0 : frame < 90 ? 1 : frame < 130 ? 2 : 3,
  );

  // Exit
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
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 100,
          opacity: titleOp,
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.heading,
          }}
        >
          How many calls did your business
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: theme.colors.danger,
            fontFamily: theme.fonts.heading,
          }}
        >
          miss this week?
        </div>
      </div>

      {/* Three phones */}
      <Phone
        x={300}
        y={340}
        ringStart={20}
        missStart={50}
        label="Office"
      />
      <Phone
        x={900}
        y={360}
        ringStart={55}
        missStart={90}
        label="Front Desk"
      />
      <Phone
        x={1500}
        y={340}
        ringStart={95}
        missStart={130}
        label="Mobile"
      />

      {/* Stacking missed-call counter */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          display: "flex",
          gap: 20,
          zIndex: 2,
        }}
      >
        {missedCount > 0 && (
          <div
            style={{
              background: `${theme.colors.danger}20`,
              border: `1px solid ${theme.colors.danger}60`,
              borderRadius: 16,
              padding: "12px 28px",
              fontSize: 20,
              fontWeight: 600,
              color: theme.colors.dangerLight,
              fontFamily: theme.fonts.body,
            }}
          >
            {missedCount} Missed Call{missedCount > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
