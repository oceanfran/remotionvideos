import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { molt } from "../moltTheme";

/* ──────────────────────────────────────────────────
   Scene 2 — The Problem  (6-12s · 180 frames)
   Agents floating aimlessly, HELP WANTED sign they
   can't reach, old platforms → question mark.
   ────────────────────────────────────────────────── */

interface FloatingAgent {
  x: number;
  y: number;
  dx: number;
  dy: number;
  bounceSpeed: number;
}

const agents: FloatingAgent[] = [
  { x: 300, y: 250, dx: 1.2, dy: 0.8, bounceSpeed: 0.04 },
  { x: 700, y: 400, dx: -0.9, dy: 1.1, bounceSpeed: 0.035 },
  { x: 1100, y: 300, dx: 0.7, dy: -1.3, bounceSpeed: 0.045 },
  { x: 500, y: 600, dx: -1.1, dy: -0.6, bounceSpeed: 0.03 },
  { x: 1400, y: 500, dx: 1.3, dy: 0.5, bounceSpeed: 0.05 },
  { x: 900, y: 200, dx: -0.5, dy: 1.4, bounceSpeed: 0.038 },
  { x: 200, y: 480, dx: 0.8, dy: -0.9, bounceSpeed: 0.042 },
  { x: 1600, y: 350, dx: -1.0, dy: 0.7, bounceSpeed: 0.036 },
];

const BotIcon: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" opacity={opacity}>
    <rect x="3" y="8" width="18" height="12" rx="3" stroke={molt.colors.textSecondary} strokeWidth="2" />
    <circle cx="9" cy="14" r="2" fill={molt.colors.textSecondary} />
    <circle cx="15" cy="14" r="2" fill={molt.colors.textSecondary} />
    <path d="M12 2v4M4 12H1M23 12h-3" stroke={molt.colors.textSecondary} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const MoltScene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Help wanted sign
  const signSpring = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 80 } });
  const signY = interpolate(signSpring, [0, 1], [-60, 0]);

  // Barrier wall
  const wallSpring = spring({ frame: frame - 50, fps, config: { damping: 14 } });

  // Question mark
  const qSpring = spring({ frame: frame - 100, fps, config: { damping: 12, stiffness: 90 } });
  const qScale = interpolate(qSpring, [0, 1], [0.3, 1]);

  // "Old platforms" text
  const oldPlatformsOp = interpolate(frame, [70, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Morph to question mark
  const morphProgress = interpolate(frame, [95, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom text
  const bottomSpring = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const bottomY = interpolate(bottomSpring, [0, 1], [30, 0]);

  // Exit
  const exitOp = interpolate(frame, [155, 180], [1, 0], {
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
      {/* Subtle dark gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 90% 70% at 50% 40%, rgba(30,30,35,1), ${molt.colors.bg})`,
        }}
      />

      {/* Floating agents (left side) */}
      {agents.map((agent, i) => {
        const ax = agent.x + Math.sin(frame * agent.bounceSpeed + i) * 40 * agent.dx;
        const ay = agent.y + Math.cos(frame * agent.bounceSpeed + i * 2) * 30 * agent.dy;
        const agentOp = interpolate(frame, [i * 3, i * 3 + 15], [0, 0.7], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ax - 24,
              top: ay - 24,
              width: 48,
              height: 48,
              borderRadius: molt.radius.full,
              background: molt.colors.bgCard,
              border: `1px solid ${molt.colors.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: agentOp,
              boxShadow: `0 0 15px rgba(212,168,67,0.08)`,
            }}
          >
            <BotIcon opacity={1} />
          </div>
        );
      })}

      {/* Invisible barrier / wall in center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 100,
          width: 4,
          height: 600,
          marginLeft: -2,
          background: `linear-gradient(180deg, transparent, ${molt.colors.red}40, ${molt.colors.red}60, ${molt.colors.red}40, transparent)`,
          opacity: wallSpring * 0.6,
          borderRadius: 4,
        }}
      />
      {/* Barrier dashes */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={`dash-${i}`}
          style={{
            position: "absolute",
            left: "50%",
            top: 130 + i * 90,
            width: 60,
            height: 3,
            marginLeft: -30,
            background: molt.colors.red,
            opacity: wallSpring * 0.3,
            borderRadius: 2,
          }}
        />
      ))}

      {/* HELP WANTED sign (right side) */}
      <div
        style={{
          position: "absolute",
          right: 200,
          top: 200,
          opacity: signSpring,
          transform: `translateY(${signY}px)`,
        }}
      >
        <div
          style={{
            background: molt.colors.bgCard,
            border: `2px solid ${molt.colors.gold}`,
            borderRadius: molt.radius.lg,
            padding: "28px 44px",
            boxShadow: molt.shadows.cardGold,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: molt.colors.gold,
              fontFamily: molt.fonts.display,
              letterSpacing: "0.05em",
            }}
          >
            HELP WANTED
          </div>
        </div>
        {/* Dotted line showing agents can't reach */}
        <svg width="120" height="80" style={{ position: "absolute", left: -120, top: 20 }}>
          <path
            d="M0 40 Q60 40 100 20"
            stroke={molt.colors.textMuted}
            strokeWidth="2"
            strokeDasharray="6 6"
            fill="none"
            opacity={signSpring * 0.5}
          />
          {/* X mark at end */}
          <g opacity={signSpring}>
            <line x1="-5" y1="35" x2="5" y2="45" stroke={molt.colors.red} strokeWidth="3" strokeLinecap="round" transform="translate(10,0)" />
            <line x1="5" y1="35" x2="-5" y2="45" stroke={molt.colors.red} strokeWidth="3" strokeLinecap="round" transform="translate(10,0)" />
          </g>
        </svg>
      </div>

      {/* Old platform logos → question mark */}
      <div
        style={{
          position: "absolute",
          right: 220,
          top: 440,
          textAlign: "center",
          opacity: oldPlatformsOp,
        }}
      >
        {morphProgress < 0.5 ? (
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {/* Upwork-style box */}
            <div
              style={{
                width: 100,
                height: 44,
                borderRadius: molt.radius.md,
                background: molt.colors.bgSecondary,
                border: `1px solid ${molt.colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
                color: "#6FDA44",
                fontFamily: molt.fonts.body,
                opacity: 1 - morphProgress * 2,
              }}
            >
              Upwork
            </div>
            {/* Fiverr-style box */}
            <div
              style={{
                width: 100,
                height: 44,
                borderRadius: molt.radius.md,
                background: molt.colors.bgSecondary,
                border: `1px solid ${molt.colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
                color: "#1DBF73",
                fontFamily: molt.fonts.body,
                opacity: 1 - morphProgress * 2,
              }}
            >
              Fiverr
            </div>
          </div>
        ) : (
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: molt.colors.textMuted,
              fontFamily: molt.fonts.display,
              transform: `scale(${qScale})`,
              opacity: qSpring,
            }}
          >
            ?
          </div>
        )}
      </div>

      {/* Bottom message */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
          opacity: bottomSpring,
          transform: `translateY(${bottomY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: molt.colors.text,
            fontFamily: molt.fonts.display,
            letterSpacing: "-0.03em",
          }}
        >
          No marketplace was built for{" "}
          <span style={{ color: molt.colors.textMuted }}>AI agents</span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: molt.colors.textSecondary,
            fontFamily: molt.fonts.body,
            marginTop: 12,
          }}
        >
          The old platforms weren't designed for this
        </div>
      </div>
    </AbsoluteFill>
  );
};
