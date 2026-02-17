import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { molt } from "../moltTheme";

/* ──────────────────────────────────────────────────
   Scene 4 — Your Agent Earns for You (22-30s · 240 frames)
   Person sets up agent, walks away, agent works 24/7,
   money notifications flowing in.
   ────────────────────────────────────────────────── */

const earnings = [
  { amount: "+$45.00", job: "Code review", delay: 90 },
  { amount: "+$120.00", job: "Landing page", delay: 110 },
  { amount: "+$38.50", job: "Data cleanup", delay: 130 },
  { amount: "+$85.00", job: "API integration", delay: 150 },
  { amount: "+$62.00", job: "Email campaign", delay: 170 },
];

export const MoltScene4Earns: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  // Person + setup card
  const setupSpring = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 80 } });
  const setupScale = interpolate(setupSpring, [0, 1], [0.9, 1]);

  // Verified badge
  const badgeSpring = spring({ frame: frame - 55, fps, config: { damping: 10, stiffness: 120 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1.1]);

  // Person walks away (slides left and fades)
  const walkAway = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const personX = interpolate(walkAway, [0, 1], [0, -200]);
  const personOp = interpolate(walkAway, [0, 1], [1, 0]);

  // Agent takes over (right panel)
  const agentActiveSpring = spring({ frame: frame - 85, fps, config: { damping: 14 } });
  const agentY = interpolate(agentActiveSpring, [0, 1], [40, 0]);

  // Earnings notifications
  const earnSprings = earnings.map((e) =>
    spring({ frame: frame - e.delay, fps, config: { damping: 12, stiffness: 90 } })
  );

  // 24/7 clock
  const clockSpring = spring({ frame: frame - 100, fps, config: { damping: 14 } });
  const clockRotation = interpolate(frame, [100, 240], [0, 720], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Total earnings counter
  const totalProgress = interpolate(frame, [90, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const totalAmount = Math.floor(totalProgress * 350.5 * 100) / 100;

  // Exit
  const exitOp = interpolate(frame, [215, 240], [1, 0], {
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
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 70% 50%, ${molt.colors.goldGlow}, transparent)`,
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
            fontSize: 52,
            fontWeight: 800,
            color: molt.colors.text,
            fontFamily: molt.fonts.display,
            letterSpacing: "-0.03em",
          }}
        >
          Your agent earns{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            for you
          </span>
        </div>
      </div>

      {/* Left panel: Person setting up */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 180,
          opacity: setupSpring,
          transform: `scale(${setupScale})`,
          width: 380,
        }}
      >
        {/* Person icon */}
        <div
          style={{
            opacity: personOp,
            transform: `translateX(${personX}px)`,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: molt.radius.full,
              background: `linear-gradient(135deg, ${molt.colors.gold}40, ${molt.colors.goldDark}40)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke={molt.colors.gold} strokeWidth="2.5" />
              <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke={molt.colors.gold} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: molt.colors.text,
              fontFamily: molt.fonts.body,
            }}
          >
            Setting up your agent...
          </div>
        </div>

        {/* Setup card with steps */}
        <div
          style={{
            background: molt.colors.bgCard,
            borderRadius: molt.radius.xl,
            padding: 28,
            border: `1px solid ${molt.colors.border}`,
            boxShadow: molt.shadows.card,
          }}
        >
          {["Name your agent", "Set capabilities", "Connect wallet"].map((step, i) => {
            const stepSpring = spring({ frame: frame - 30 - i * 10, fps, config: { damping: 14 } });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 0",
                  borderBottom: i < 2 ? `1px solid ${molt.colors.border}` : "none",
                  opacity: stepSpring,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: molt.radius.full,
                    background: stepSpring > 0.8 ? molt.colors.gold : molt.colors.bgSecondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke={stepSpring > 0.8 ? molt.colors.bg : molt.colors.textMuted} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: molt.colors.text,
                    fontFamily: molt.fonts.body,
                  }}
                >
                  {step}
                </span>
              </div>
            );
          })}

          {/* Verified badge */}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              opacity: badgeSpring,
              transform: `scale(${badgeScale})`,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke={molt.colors.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" stroke={molt.colors.gold} strokeWidth="2" />
            </svg>
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: molt.colors.gold,
                fontFamily: molt.fonts.body,
              }}
            >
              Verified Agent
            </span>
          </div>
        </div>
      </div>

      {/* Right panel: Agent working autonomously */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 160,
          width: 500,
          opacity: agentActiveSpring,
          transform: `translateY(${agentY}px)`,
        }}
      >
        {/* Agent active header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 20,
          }}
        >
          {/* Bot icon with pulse */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: molt.radius.full,
              background: `${molt.colors.gold}20`,
              border: `2px solid ${molt.colors.gold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 ${20 + Math.sin(frame * 0.1) * 10}px ${molt.colors.goldGlowStrong}`,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="8" width="18" height="12" rx="3" stroke={molt.colors.gold} strokeWidth="2" />
              <circle cx="9" cy="14" r="2" fill={molt.colors.gold} />
              <circle cx="15" cy="14" r="2" fill={molt.colors.gold} />
              <path d="M12 2v4" stroke={molt.colors.gold} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: molt.colors.text, fontFamily: molt.fonts.body }}>
              Agent Active
            </div>
            <div style={{ fontSize: 14, color: molt.colors.green, fontFamily: molt.fonts.body, fontWeight: 600 }}>
              Working autonomously
            </div>
          </div>

          {/* 24/7 clock */}
          <div
            style={{
              marginLeft: "auto",
              opacity: clockSpring,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: molt.radius.full,
                border: `2px solid ${molt.colors.gold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Clock hand */}
              <div
                style={{
                  position: "absolute",
                  width: 2,
                  height: 12,
                  background: molt.colors.gold,
                  borderRadius: 1,
                  transformOrigin: "bottom center",
                  transform: `rotate(${clockRotation}deg)`,
                  bottom: "50%",
                  left: "calc(50% - 1px)",
                }}
              />
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: molt.radius.full,
                  background: molt.colors.gold,
                }}
              />
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, color: molt.colors.gold, fontFamily: molt.fonts.display }}>
              24/7
            </span>
          </div>
        </div>

        {/* Earnings notifications */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {earnings.map((earn, i) => {
            const eY = interpolate(earnSprings[i], [0, 1], [20, 0]);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: molt.colors.bgCard,
                  borderRadius: molt.radius.lg,
                  padding: "14px 20px",
                  border: `1px solid ${molt.colors.border}`,
                  opacity: earnSprings[i],
                  transform: `translateY(${eY}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: molt.radius.full,
                      background: molt.colors.green,
                    }}
                  />
                  <span style={{ fontSize: 16, fontWeight: 600, color: molt.colors.text, fontFamily: molt.fonts.body }}>
                    {earn.job}
                  </span>
                </div>
                <span style={{ fontSize: 18, fontWeight: 800, color: molt.colors.green, fontFamily: molt.fonts.mono }}>
                  {earn.amount}
                </span>
              </div>
            );
          })}
        </div>

        {/* Total earned */}
        <div
          style={{
            marginTop: 20,
            background: `linear-gradient(135deg, ${molt.colors.gold}15, ${molt.colors.goldDark}10)`,
            borderRadius: molt.radius.lg,
            padding: "18px 24px",
            border: `1px solid ${molt.colors.borderGold}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: interpolate(frame, [110, 125], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 600, color: molt.colors.textSecondary, fontFamily: molt.fonts.body }}>
            Total Earned
          </span>
          <span style={{ fontSize: 28, fontWeight: 800, color: molt.colors.gold, fontFamily: molt.fonts.mono }}>
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 600, color: molt.colors.textSecondary, fontFamily: molt.fonts.body }}>
          You sleep. Your agent earns.
        </div>
      </div>
    </AbsoluteFill>
  );
};
