import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { molt } from "../moltTheme";

/* ──────────────────────────────────────────────────
   Scene 6 — Building for the Future (40-48s · 240 frames)
   Animated timeline: 2026 → 2028 → 2030
   Marketplace visualization grows at each milestone.
   ────────────────────────────────────────────────── */

const milestones = [
  {
    year: "2026",
    label: "Early Adopters",
    nodes: 6,
    color: molt.colors.gold,
    delay: 30,
  },
  {
    year: "2028",
    label: "Mainstream Adoption",
    nodes: 14,
    color: molt.colors.goldLight,
    delay: 80,
  },
  {
    year: "2030",
    label: "The New Normal",
    nodes: 24,
    color: molt.colors.goldLight,
    delay: 130,
  },
];

export const MoltScene6Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  // Timeline line progress
  const lineProgress = interpolate(frame, [25, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Milestone springs
  const mSprings = milestones.map((m) =>
    spring({ frame: frame - m.delay, fps, config: { damping: 12, stiffness: 80 } })
  );

  // Bottom text
  const bottomSpring = spring({ frame: frame - 175, fps, config: { damping: 14 } });
  const bottomY = interpolate(bottomSpring, [0, 1], [30, 0]);

  // Exit
  const exitOp = interpolate(frame, [215, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Timeline dimensions
  const tlLeft = 200;
  const tlRight = 1720;
  const tlY = 400;
  const tlWidth = tlRight - tlLeft;

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: exitOp,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${molt.colors.goldGlow}, transparent)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: molt.colors.gold,
            fontFamily: molt.fonts.body,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Building for the Future
        </div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 800,
            color: molt.colors.text,
            fontFamily: molt.fonts.display,
            letterSpacing: "-0.03em",
          }}
        >
          This is{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            inevitable
          </span>
        </div>
      </div>

      {/* Timeline base line */}
      <div
        style={{
          position: "absolute",
          left: tlLeft,
          top: tlY,
          width: tlWidth * lineProgress,
          height: 4,
          background: `linear-gradient(90deg, ${molt.colors.goldDark}, ${molt.colors.gold}, ${molt.colors.goldLight})`,
          borderRadius: 2,
          boxShadow: `0 0 20px ${molt.colors.goldGlow}`,
        }}
      />
      {/* Base line track */}
      <div
        style={{
          position: "absolute",
          left: tlLeft,
          top: tlY,
          width: tlWidth,
          height: 4,
          background: molt.colors.border,
          borderRadius: 2,
          zIndex: -1,
        }}
      />

      {/* Milestones */}
      {milestones.map((m, i) => {
        const mX = tlLeft + (tlWidth / 2) * i;
        const nScale = interpolate(mSprings[i], [0, 1], [0.5, 1]);
        const nY = interpolate(mSprings[i], [0, 1], [20, 0]);

        // Network visualization for each milestone
        const nodePositions: { x: number; y: number }[] = [];
        for (let n = 0; n < m.nodes; n++) {
          const angle = (n / m.nodes) * Math.PI * 2 + frame * 0.003;
          const radius = 30 + (n % 3) * 20 + Math.sin(n * 1.5) * 10;
          nodePositions.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
          });
        }

        return (
          <div key={i}>
            {/* Milestone dot on timeline */}
            <div
              style={{
                position: "absolute",
                left: mX - 10,
                top: tlY - 8,
                width: 20,
                height: 20,
                borderRadius: molt.radius.full,
                background: mSprings[i] > 0.5 ? m.color : molt.colors.border,
                border: `3px solid ${molt.colors.bg}`,
                boxShadow: mSprings[i] > 0.5 ? `0 0 15px ${m.color}50` : "none",
                opacity: mSprings[i],
                zIndex: 2,
              }}
            />

            {/* Year + label below */}
            <div
              style={{
                position: "absolute",
                left: mX,
                top: tlY + 30,
                transform: `translateX(-50%) translateY(${nY}px)`,
                opacity: mSprings[i],
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: m.color,
                  fontFamily: molt.fonts.display,
                  letterSpacing: "-0.02em",
                }}
              >
                {m.year}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: molt.colors.textSecondary,
                  fontFamily: molt.fonts.body,
                  marginTop: 4,
                }}
              >
                {m.label}
              </div>
            </div>

            {/* Network visualization above */}
            <div
              style={{
                position: "absolute",
                left: mX,
                top: tlY - 150,
                transform: `translate(-50%, 0) scale(${nScale})`,
                opacity: mSprings[i],
                width: 200,
                height: 200,
              }}
            >
              <svg width="200" height="200" viewBox="-100 -100 200 200">
                {/* Connections */}
                {nodePositions.map((pos, ni) =>
                  nodePositions.slice(ni + 1).map((pos2, ni2) => {
                    const dist = Math.sqrt((pos.x - pos2.x) ** 2 + (pos.y - pos2.y) ** 2);
                    if (dist < 60) {
                      return (
                        <line
                          key={`${ni}-${ni2}`}
                          x1={pos.x}
                          y1={pos.y}
                          x2={pos2.x}
                          y2={pos2.y}
                          stroke={m.color}
                          strokeWidth={1}
                          opacity={0.25}
                        />
                      );
                    }
                    return null;
                  })
                )}
                {/* Nodes */}
                {nodePositions.map((pos, ni) => (
                  <circle
                    key={ni}
                    cx={pos.x}
                    cy={pos.y}
                    r={4}
                    fill={m.color}
                    opacity={0.7 + Math.sin(frame * 0.05 + ni) * 0.3}
                  />
                ))}
                {/* Center hub */}
                <circle cx={0} cy={0} r={8} fill={m.color} opacity={0.9} />
              </svg>
            </div>
          </div>
        );
      })}

      {/* Bottom message */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: bottomSpring,
          transform: `translateY(${bottomY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: molt.colors.text,
            fontFamily: molt.fonts.display,
            letterSpacing: "-0.02em",
          }}
        >
          The platforms that establish themselves early{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            define the market
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
