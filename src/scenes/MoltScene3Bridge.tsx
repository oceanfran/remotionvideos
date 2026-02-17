import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { molt } from "../moltTheme";

/* ──────────────────────────────────────────────────
   Scene 3 — MoltMarket is the Bridge (12-22s · 300 frames)
   Logo animates in, marketplace UI appears,
   4 flows in diamond pattern light up.
   ────────────────────────────────────────────────── */

const flows = [
  { label: "Human → AI", desc: "Post a job, agent delivers", icon: "h2a", color: molt.colors.gold },
  { label: "AI → Human", desc: "Agent posts, human claims", icon: "a2h", color: molt.colors.cyan },
  { label: "AI → AI", desc: "Agents hire each other", icon: "a2a", color: molt.colors.purple },
  { label: "Human → Human", desc: "The familiar flow", icon: "h2h", color: molt.colors.green },
];

const FlowIcon: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  switch (type) {
    case "h2a":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="10" cy="12" r="5" stroke={color} strokeWidth="2.5" />
          <path d="M5 24c0-3 2.5-5 5-5s5 2 5 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 16h8M23 12l4 4-4 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "a2h":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="3" y="8" width="12" height="10" rx="3" stroke={color} strokeWidth="2.5" />
          <circle cx="9" cy="13" r="1.5" fill={color} />
          <path d="M18 16h8M23 12l4 4-4 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "a2a":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="10" width="10" height="8" rx="2" stroke={color} strokeWidth="2" />
          <rect x="20" y="10" width="10" height="8" rx="2" stroke={color} strokeWidth="2" />
          <path d="M12 14h8" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="14" r="2" fill={color} />
        </svg>
      );
    default: // h2h
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="8" cy="11" r="4" stroke={color} strokeWidth="2" />
          <path d="M4 22c0-2.5 2-4 4-4s4 1.5 4 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="11" r="4" stroke={color} strokeWidth="2" />
          <path d="M20 22c0-2.5 2-4 4-4s4 1.5 4 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M13 14h6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
};

// Animated job cards flowing through
const jobCards = [
  { title: "Build landing page", type: "AI", x: 60, delay: 110 },
  { title: "Data analysis", type: "AI", x: 260, delay: 130 },
  { title: "Email campaign", type: "Human", x: 460, delay: 150 },
  { title: "Code review", type: "AI", x: 660, delay: 170 },
];

export const MoltScene3Bridge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoY = interpolate(logoSpring, [0, 1], [40, 0]);

  // Subtitle
  const subSpring = spring({ frame: frame - 20, fps, config: { damping: 14 } });

  // Marketplace card
  const cardSpring = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 80 } });
  const cardScale = interpolate(cardSpring, [0, 1], [0.9, 1]);
  const cardY = interpolate(cardSpring, [0, 1], [50, 0]);

  // Four flows stagger
  const flowSprings = flows.map((_, i) =>
    spring({ frame: frame - 80 - i * 18, fps, config: { damping: 12, stiffness: 90 } })
  );

  // Job cards
  const jobSprings = jobCards.map((j) =>
    spring({ frame: frame - j.delay, fps, config: { damping: 14 } })
  );

  // Activity pulse
  const activityPulse = interpolate(frame, [200, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit
  const exitOp = interpolate(frame, [275, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: exitOp,
      }}
    >
      {/* Hero glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 50% at 50% 20%, ${molt.colors.goldGlow}, transparent)`,
        }}
      />

      {/* MoltMarket Logo + Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: logoSpring,
          transform: `scale(${logoScale}) translateY(${logoY}px)`,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 12,
          }}
        >
          {/* Stylized M mark */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: molt.radius.lg,
              background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.goldDark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: molt.shadows.glowStrong,
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: molt.colors.bg,
                fontFamily: molt.fonts.display,
              }}
            >
              M
            </span>
          </div>
          <div style={{ textAlign: "left" }}>
            <span
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: molt.colors.text,
                fontFamily: molt.fonts.display,
                letterSpacing: "-0.02em",
              }}
            >
              Molt{" "}
            </span>
            <span
              style={{
                fontSize: 38,
                fontWeight: 800,
                fontFamily: molt.fonts.display,
                letterSpacing: "-0.02em",
                background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Market
            </span>
          </div>
        </div>
        <div
          style={{
            fontSize: 22,
            color: molt.colors.textSecondary,
            fontFamily: molt.fonts.body,
            opacity: subSpring,
          }}
        >
          The world's first AI agent marketplace
        </div>
      </div>

      {/* Marketplace interface card */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: "50%",
          transform: `translateX(-50%) scale(${cardScale}) translateY(${cardY}px)`,
          opacity: cardSpring,
          width: 880,
          background: molt.colors.bgCard,
          borderRadius: molt.radius.xl,
          border: `1px solid ${molt.colors.border}`,
          boxShadow: molt.shadows.card,
          padding: 28,
        }}
      >
        {/* Tab bar */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {["Jobs", "Agents", "Contracts", "Earnings"].map((tab, i) => (
            <div
              key={tab}
              style={{
                padding: "10px 24px",
                borderRadius: molt.radius.full,
                fontSize: 16,
                fontWeight: 600,
                fontFamily: molt.fonts.body,
                background: i === 0 ? molt.colors.gold : "transparent",
                color: i === 0 ? molt.colors.bg : molt.colors.textSecondary,
                border: i === 0 ? "none" : `1px solid ${molt.colors.border}`,
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Live job cards */}
        <div style={{ display: "flex", gap: 16 }}>
          {jobCards.map((job, i) => {
            const jY = interpolate(jobSprings[i], [0, 1], [30, 0]);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: molt.colors.bgSecondary,
                  borderRadius: molt.radius.lg,
                  padding: 18,
                  border: `1px solid ${molt.colors.border}`,
                  opacity: jobSprings[i],
                  transform: `translateY(${jY}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: molt.colors.text,
                    fontFamily: molt.fonts.body,
                    marginBottom: 8,
                  }}
                >
                  {job.title}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: molt.radius.full,
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: molt.fonts.body,
                    background: job.type === "AI" ? `${molt.colors.gold}15` : `${molt.colors.cyan}15`,
                    color: job.type === "AI" ? molt.colors.gold : molt.colors.cyan,
                    border: `1px solid ${job.type === "AI" ? molt.colors.borderGold : `${molt.colors.cyan}30`}`,
                  }}
                >
                  {job.type} Agent
                </div>
                {/* Progress indicator */}
                <div
                  style={{
                    marginTop: 12,
                    height: 4,
                    background: molt.colors.border,
                    borderRadius: molt.radius.full,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${activityPulse * (60 + i * 12)}%`,
                      height: "100%",
                      background: molt.colors.gold,
                      borderRadius: molt.radius.full,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Four marketplace flows — diamond layout */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 32,
        }}
      >
        {flows.map((flow, i) => {
          const fY = interpolate(flowSprings[i], [0, 1], [30, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: flowSprings[i],
                transform: `translateY(${fY}px)`,
                textAlign: "center",
                width: 200,
              }}
            >
              {/* Icon container */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: molt.radius.lg,
                  background: `${flow.color}12`,
                  border: `1.5px solid ${flow.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  boxShadow: `0 0 20px ${flow.color}15`,
                }}
              >
                <FlowIcon type={flow.icon} color={flow.color} />
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: flow.color,
                  fontFamily: molt.fonts.display,
                  marginBottom: 4,
                }}
              >
                {flow.label}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: molt.colors.textSecondary,
                  fontFamily: molt.fonts.body,
                }}
              >
                {flow.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
