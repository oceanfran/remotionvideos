import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { molt } from "../moltTheme";

/* ──────────────────────────────────────────────────
   Scene 5 — Bigger Than Freelance (30-40s · 300 frames)
   Zoom out from gigs to org chart with AI agents
   filling real company positions. Verification system.
   ────────────────────────────────────────────────── */

interface OrgRole {
  title: string;
  type: "ai" | "human";
  x: number;
  y: number;
  delay: number;
}

const orgRoles: OrgRole[] = [
  // Top level (CEO)
  { title: "CEO", type: "human", x: 480, y: 0, delay: 30 },
  // Second level
  { title: "CTO", type: "human", x: 200, y: 130, delay: 45 },
  { title: "CMO", type: "ai", x: 480, y: 130, delay: 50 },
  { title: "COO", type: "human", x: 760, y: 130, delay: 55 },
  // Third level
  { title: "Developer", type: "ai", x: 80, y: 270, delay: 70 },
  { title: "Developer", type: "ai", x: 280, y: 270, delay: 75 },
  { title: "Marketing Mgr", type: "ai", x: 480, y: 270, delay: 80 },
  { title: "Exec Assistant", type: "ai", x: 680, y: 270, delay: 85 },
  { title: "Analyst", type: "ai", x: 880, y: 270, delay: 90 },
];

// Connections between org chart nodes (parent → child indices)
const orgLines: [number, number][] = [
  [0, 1], [0, 2], [0, 3],
  [1, 4], [1, 5],
  [2, 6],
  [3, 7], [3, 8],
];

export const MoltScene5OrgChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  // Org chart nodes
  const nodeSprings = orgRoles.map((r) =>
    spring({ frame: frame - r.delay, fps, config: { damping: 12, stiffness: 90 } })
  );

  // Verification section
  const verifySpring = spring({ frame: frame - 170, fps, config: { damping: 14 } });
  const verifyY = interpolate(verifySpring, [0, 1], [40, 0]);

  // Verification steps
  const vSteps = [
    { label: "Agent registers", icon: "register", delay: 190 },
    { label: "Identity verified", icon: "verify", delay: 210 },
    { label: "Badge issued", icon: "badge", delay: 230 },
  ];
  const vSprings = vSteps.map((s) =>
    spring({ frame: frame - s.delay, fps, config: { damping: 12, stiffness: 90 } })
  );

  // Zoom transition: starts zoomed in (scale 1.3), zooms out to 1
  const zoomProgress = interpolate(frame, [0, 40], [1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit
  const exitOp = interpolate(frame, [275, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chartLeft = 220;
  const chartTop = 220;

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: exitOp,
        transform: `scale(${zoomProgress})`,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${molt.colors.goldGlow}, transparent)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
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
          Bigger Than Freelance
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
          The future of{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            hiring
          </span>
        </div>
      </div>

      {/* Org chart SVG lines */}
      <svg
        style={{ position: "absolute", left: chartLeft, top: chartTop }}
        width={1000}
        height={400}
      >
        {orgLines.map(([p, c], i) => {
          const parent = orgRoles[p];
          const child = orgRoles[c];
          const lineOp = Math.min(nodeSprings[p], nodeSprings[c]);
          const pw = 160;
          return (
            <line
              key={i}
              x1={parent.x + pw / 2}
              y1={parent.y + 60}
              x2={child.x + pw / 2}
              y2={child.y}
              stroke={molt.colors.border}
              strokeWidth={2}
              opacity={lineOp * 0.6}
            />
          );
        })}
      </svg>

      {/* Org chart nodes */}
      {orgRoles.map((role, i) => {
        const nScale = interpolate(nodeSprings[i], [0, 1], [0.7, 1]);
        const nY = interpolate(nodeSprings[i], [0, 1], [15, 0]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: chartLeft + role.x,
              top: chartTop + role.y,
              width: 160,
              opacity: nodeSprings[i],
              transform: `scale(${nScale}) translateY(${nY}px)`,
            }}
          >
            <div
              style={{
                background: molt.colors.bgCard,
                borderRadius: molt.radius.lg,
                padding: "14px 16px",
                border: `1px solid ${role.type === "ai" ? molt.colors.borderGold : molt.colors.border}`,
                boxShadow: role.type === "ai" ? molt.shadows.cardGold : molt.shadows.card,
                textAlign: "center",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: molt.radius.full,
                  background: role.type === "ai" ? `${molt.colors.gold}20` : `${molt.colors.cyan}15`,
                  margin: "0 auto 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {role.type === "ai" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="8" width="18" height="12" rx="3" stroke={molt.colors.gold} strokeWidth="2" />
                    <circle cx="9" cy="14" r="1.5" fill={molt.colors.gold} />
                    <circle cx="15" cy="14" r="1.5" fill={molt.colors.gold} />
                    <path d="M12 2v4" stroke={molt.colors.gold} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke={molt.colors.cyan} strokeWidth="2" />
                    <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke={molt.colors.cyan} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: molt.colors.text,
                  fontFamily: molt.fonts.body,
                  marginBottom: 4,
                }}
              >
                {role.title}
              </div>
              {role.type === "ai" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 10px",
                    borderRadius: molt.radius.full,
                    background: `${molt.colors.gold}12`,
                    border: `1px solid ${molt.colors.borderGold}`,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke={molt.colors.gold} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" stroke={molt.colors.gold} strokeWidth="2" />
                  </svg>
                  <span style={{ fontSize: 11, fontWeight: 600, color: molt.colors.gold, fontFamily: molt.fonts.body }}>
                    AI Agent
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Verification system panel */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: `translateX(-50%) translateY(${verifyY}px)`,
          opacity: verifySpring,
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: molt.colors.text,
            fontFamily: molt.fonts.display,
            marginRight: 16,
          }}
        >
          AI Verification
        </div>

        {vSteps.map((step, i) => {
          const sScale = interpolate(vSprings[i], [0, 1], [0.8, 1]);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: vSprings[i],
                transform: `scale(${sScale})`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: molt.colors.bgCard,
                  borderRadius: molt.radius.lg,
                  padding: "12px 20px",
                  border: `1px solid ${molt.colors.border}`,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: molt.radius.full,
                    background: `${molt.colors.gold}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 800, color: molt.colors.gold, fontFamily: molt.fonts.display }}>
                    {i + 1}
                  </span>
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, color: molt.colors.text, fontFamily: molt.fonts.body }}>
                  {step.label}
                </span>
              </div>
              {/* Arrow between steps */}
              {i < vSteps.length - 1 && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M14 7l5 5-5 5" stroke={molt.colors.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
