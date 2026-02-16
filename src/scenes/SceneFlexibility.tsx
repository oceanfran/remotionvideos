import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 5 — Flexibility  (28-34 s · 180 frames)
   Split screen: 24/7 clock vs overflow answering.
   Business owner relaxed in the middle.
   ────────────────────────────────────────────────── */

export const SceneFlexibility: React.FC = () => {
  const frame = useCurrentFrame();

  // Left panel
  const leftOp = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leftX = interpolate(frame, [5, 25], [-60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right panel
  const rightOp = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightX = interpolate(frame, [20, 40], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Center character
  const centerOp = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const centerScale = interpolate(frame, [50, 70], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating call bubbles around center character
  const bubble1Op = interpolate(frame, [80, 95], [0, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bubble2Op = interpolate(frame, [95, 110], [0, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bubble3Op = interpolate(frame, [110, 125], [0, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Clock rotation for 24/7
  const clockRotation = (frame * 3) % 360;

  const exitOp = interpolate(frame, [160, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bgDark,
        opacity: exitOp,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          padding: "0 80px",
          gap: 40,
        }}
      >
        {/* Left: Answer Every Call */}
        <div
          style={{
            flex: 1,
            opacity: leftOp,
            transform: `translateX(${leftX}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            background: theme.colors.bgCard,
            borderRadius: 24,
            padding: "48px 36px",
            border: `1px solid ${theme.colors.accent}30`,
          }}
        >
          {/* Spinning clock */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: `4px solid ${theme.colors.accent}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Clock hand */}
            <div
              style={{
                position: "absolute",
                width: 3,
                height: 36,
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
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: theme.colors.accent,
              fontFamily: theme.fonts.heading,
            }}
          >
            24/7
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.heading,
              textAlign: "center",
            }}
          >
            Answer Every Call
          </div>
          <div
            style={{
              fontSize: 16,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body,
              textAlign: "center",
            }}
          >
            Nights, weekends, holidays
          </div>
        </div>

        {/* Center: Relaxed business owner */}
        <div
          style={{
            flex: 1,
            opacity: centerOp,
            transform: `scale(${centerScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
        >
          {/* Person silhouette */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `${theme.colors.primaryLight}40`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 50,
            }}
          >
            😌
          </div>
          <div
            style={{
              width: 130,
              height: 160,
              borderRadius: "24px 24px 0 0",
              background: theme.colors.bgCard,
              border: `1px solid ${theme.colors.primaryLight}20`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 16,
            }}
          >
            <div
              style={{
                width: 70,
                height: 50,
                borderRadius: 8,
                background: theme.colors.bgMid,
                border: `1px solid ${theme.colors.primaryLight}15`,
              }}
            />
          </div>

          {/* Floating call bubbles */}
          {[
            { op: bubble1Op, x: -120, y: -40 },
            { op: bubble2Op, x: 120, y: -20 },
            { op: bubble3Op, x: -100, y: 80 },
          ].map((b, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `calc(50% + ${b.x}px)`,
                top: `calc(30% + ${b.y}px)`,
                opacity: b.op,
                background: `${theme.colors.success}20`,
                border: `1px solid ${theme.colors.success}40`,
                borderRadius: 12,
                padding: "6px 14px",
                fontSize: 13,
                fontWeight: 600,
                color: theme.colors.success,
                fontFamily: theme.fonts.body,
                whiteSpace: "nowrap",
              }}
            >
              📞 Handled
            </div>
          ))}

          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            You focus on your business.
            <br />
            We handle the calls.
          </div>
        </div>

        {/* Right: Answer When You Can't */}
        <div
          style={{
            flex: 1,
            opacity: rightOp,
            transform: `translateX(${rightX}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            background: theme.colors.bgCard,
            borderRadius: 24,
            padding: "48px 36px",
            border: `1px solid ${theme.colors.primaryLight}30`,
          }}
        >
          <div style={{ fontSize: 64 }}>📱</div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.heading,
              textAlign: "center",
            }}
          >
            ➡️ Overflow
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.heading,
              textAlign: "center",
            }}
          >
            Answer When You Can't
          </div>
          <div
            style={{
              fontSize: 16,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body,
              textAlign: "center",
            }}
          >
            Only picks up missed calls
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
