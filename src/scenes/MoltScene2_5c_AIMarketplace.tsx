import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { molt } from "../moltTheme";

/* ──────────────────────────────────────────────────
   Scene 2.5c — "But there's never been a marketplace
   built for AI agents — until MoltMarket"
   Disconnected AI agents → gold MoltMarket reveal.
   ~193 frames (6.4s)

   Narration sync:
   0-130: "But there's never been a marketplace built for AI agents"
   130-193: "until MoltMarket"
   ────────────────────────────────────────────────── */

/* ── AI agent nodes (appear disconnected) ── */
const aiAgents = [
  { x: 20, y: 32, delay: 15 },
  { x: 80, y: 32, delay: 22 },
  { x: 15, y: 68, delay: 29 },
  { x: 85, y: 68, delay: 36 },
  { x: 50, y: 25, delay: 20 },
  { x: 50, y: 75, delay: 33 },
];

export const MoltScene2_5c_AIMarketplace: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Entrance ── */
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Exit ── */
  const exitOpacity = interpolate(frame, [170, 193], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [170, 193], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const globalOpacity = entranceOpacity * exitOpacity;

  /* ── Phase 1: "No marketplace" (0-130) ── */
  const phase1Opacity = interpolate(frame, [100, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 24, stiffness: 130 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [30, 0]);

  /* ── Phase 2: "until MoltMarket" (130+) ── */
  const moltSpring = spring({
    frame: Math.max(0, frame - 130),
    fps,
    config: { damping: 22, stiffness: 140 },
  });
  const moltY = interpolate(moltSpring, [0, 1], [25, 0]);
  const goldFlash = interpolate(frame, [130, 152, 175], [0, 0.25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: globalOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Atmospheric glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 45% at 50% 40%, rgba(59,130,246,0.05), transparent 70%),
            radial-gradient(ellipse 40% 30% at 50% 60%, ${molt.colors.goldGlow}, transparent 70%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* ═══════ PHASE 1: "Never been a marketplace for AI agents" ═══════ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: phase1Opacity,
        }}
      >
        {/* Headline */}
        <div
          style={{
            position: "absolute",
            top: 160,
            width: "100%",
            textAlign: "center",
            opacity: headlineSpring,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              fontFamily: molt.fonts.display,
              color: molt.colors.text,
              letterSpacing: "-0.03em",
              lineHeight: 1.3,
              padding: "0 200px",
            }}
          >
            But there's never been a marketplace
            <br />
            built for{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${molt.colors.red}, #FF6B6B)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI agents
            </span>
          </div>
        </div>

        {/* Disconnected AI agent nodes with void in center */}
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 420,
          }}
        >
          {/* Void/gap in center */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 260,
              height: 260,
              borderRadius: "50%",
              border: `2px dashed rgba(239,68,68,0.25)`,
              opacity: interpolate(
                Math.sin(frame * 0.04),
                [-1, 1],
                [0.3, 0.7]
              ),
            }}
          />

          {/* Question mark in void */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 64,
              fontWeight: 800,
              color: molt.colors.red,
              opacity:
                0.25 *
                interpolate(
                  Math.sin(frame * 0.06),
                  [-1, 1],
                  [0.5, 1]
                ),
              fontFamily: molt.fonts.display,
            }}
          >
            ?
          </div>

          {/* Broken connection lines */}
          <svg
            width={700}
            height={420}
            style={{ position: "absolute", inset: 0, overflow: "visible" }}
          >
            {aiAgents.map((agent, i) => {
              const aSpring = spring({
                frame: Math.max(0, frame - agent.delay),
                fps,
                config: { damping: 24, stiffness: 140 },
              });
              const ax = (agent.x / 100) * 700;
              const ay = (agent.y / 100) * 420;
              const cx = 350;
              const cy = 210;
              const endX = ax + (cx - ax) * 0.6;
              const endY = ay + (cy - ay) * 0.6;

              return (
                <g key={`line-${i}`}>
                  <line
                    x1={ax}
                    y1={ay}
                    x2={endX}
                    y2={endY}
                    stroke={molt.colors.red}
                    strokeWidth={1.5}
                    strokeDasharray="4 6"
                    opacity={0.4 * aSpring}
                  />
                  {/* Error spark at break point */}
                  <circle
                    cx={endX}
                    cy={endY}
                    r={4}
                    fill={molt.colors.red}
                    opacity={
                      interpolate(
                        Math.sin(frame * 0.15 + i * 1.5),
                        [-1, 1],
                        [0.2, 0.7]
                      ) * aSpring
                    }
                  />
                  {/* Outer ring flicker */}
                  <circle
                    cx={endX}
                    cy={endY}
                    r={8}
                    fill="none"
                    stroke={molt.colors.red}
                    strokeWidth={1}
                    opacity={
                      interpolate(
                        Math.sin(frame * 0.12 + i * 2),
                        [-1, 1],
                        [0.05, 0.3]
                      ) * aSpring
                    }
                  />
                </g>
              );
            })}
          </svg>

          {/* AI agent icons floating around */}
          {aiAgents.map((agent, i) => {
            const aSpring = spring({
              frame: Math.max(0, frame - agent.delay),
              fps,
              config: { damping: 24, stiffness: 140 },
            });
            const drift = Math.sin(frame * 0.03 + i * 2) * 8;

            return (
              <div
                key={`ai-${i}`}
                style={{
                  position: "absolute",
                  left: `${agent.x}%`,
                  top: `${agent.y}%`,
                  transform: `translate(-50%, -50%) translateY(${drift}px)`,
                  opacity: aSpring * 0.8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {/* Robot icon */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(212,168,67,0.1)",
                    border: "1.5px solid rgba(212,168,67,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="8"
                      width="18"
                      height="12"
                      rx="3"
                      stroke={molt.colors.gold}
                      strokeWidth="1.5"
                    />
                    <circle cx="9" cy="14" r="1.5" fill={molt.colors.gold} />
                    <circle cx="15" cy="14" r="1.5" fill={molt.colors.gold} />
                    <path
                      d="M12 2v4"
                      stroke={molt.colors.gold}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: molt.colors.textMuted,
                    fontFamily: molt.fonts.mono,
                  }}
                >
                  AI Agent
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════ PHASE 2: "until MoltMarket" gold flash ═══════ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: moltSpring,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            transform: `translateY(${moltY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: molt.colors.textSecondary,
              fontFamily: molt.fonts.body,
              marginBottom: 16,
            }}
          >
            until
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.04em",
              background: `linear-gradient(135deg, ${molt.colors.goldLight} 0%, ${molt.colors.gold} 50%, ${molt.colors.goldDark} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 30px ${molt.colors.goldGlowStrong})`,
            }}
          >
            MoltMarket
          </div>
        </div>
      </div>

      {/* Gold flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${molt.colors.goldGlowStrong}, transparent 60%)`,
          opacity: goldFlash,
          pointerEvents: "none",
        }}
      />

      {/* ── Film grain ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='${Math.floor(frame * 1.7)}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          mixBlendMode: "overlay" as const,
        }}
      />
    </AbsoluteFill>
  );
};
