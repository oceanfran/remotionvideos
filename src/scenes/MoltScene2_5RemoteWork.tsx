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
   Scene 2.5 — Remote Work History (9-17s · 240 frames)
   "When the internet created remote work, Upwork and
   Fiverr gave freelancers a place to find clients.
   But there's never been a marketplace built for AI
   agents — until MoltMarket."
   ────────────────────────────────────────────────── */

/* ── Platform cards data ── */
const platforms = [
  { name: "Upwork", color: "#6FDA44", delay: 95 },
  { name: "Fiverr", color: "#1DBF73", delay: 112 },
];

/* ── Freelancer profile nodes ── */
const freelancers = [
  { x: 25, y: 35, delay: 138, label: "Designer" },
  { x: 75, y: 35, delay: 146, label: "Developer" },
  { x: 20, y: 65, delay: 155, label: "Writer" },
  { x: 80, y: 65, delay: 164, label: "Marketer" },
];

/* ── AI agent nodes (appear later, disconnected) ── */
const aiAgents = [
  { x: 25, y: 35, delay: 241 },
  { x: 75, y: 35, delay: 249 },
  { x: 20, y: 65, delay: 258 },
  { x: 80, y: 65, delay: 267 },
];

export const MoltScene2_5RemoteWork: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Global entrance & exit ── */
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const exitOpacity = interpolate(frame, [398, 423], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const exitScale = interpolate(frame, [398, 423], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const globalOpacity = entranceOpacity * exitOpacity;

  /* ── Phase 1: "When the internet created remote work" (0-55) ── */
  const phase1Spring = spring({
    frame,
    fps,
    config: { damping: 26, stiffness: 140 },
  });
  const phase1Y = interpolate(phase1Spring, [0, 1], [30, 0]);
  const phase1Opacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Globe network animation (0-55) ── */
  const globeScale = interpolate(
    spring({ frame, fps, config: { damping: 22, stiffness: 120 } }),
    [0, 1],
    [0.8, 1]
  );

  /* ── Phase 1 → Phase 2 crossfade ── */
  const phase1FadeOut = interpolate(frame, [86, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 2: "Upwork and Fiverr" (86-241) ── */
  const phase2FadeIn = interpolate(frame, [86, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2FadeOut = interpolate(frame, [206, 241], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 3: "Never been a marketplace for AI agents" (215-370) ── */
  const phase3FadeIn = interpolate(frame, [215, 249], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase3FadeOut = interpolate(frame, [335, 370], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phase3HeadlineSpring = spring({
    frame: Math.max(0, frame - 224),
    fps,
    config: { damping: 24, stiffness: 130 },
  });
  const phase3HeadlineY = interpolate(phase3HeadlineSpring, [0, 1], [30, 0]);

  /* ── "until MoltMarket" gold flash (335+) ── */
  const moltSpring = spring({
    frame: Math.max(0, frame - 335),
    fps,
    config: { damping: 22, stiffness: 140 },
  });
  const moltY = interpolate(moltSpring, [0, 1], [25, 0]);
  const goldFlash = interpolate(frame, [335, 361, 388], [0, 0.25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Film grain seed ── */
  const grainSeed = frame * 1.7;

  /* ── Globe connection lines ── */
  const connectionLines = [
    { x1: 40, y1: 30, x2: 60, y2: 30 },
    { x1: 35, y1: 45, x2: 65, y2: 45 },
    { x1: 45, y1: 55, x2: 55, y2: 35 },
    { x1: 38, y1: 35, x2: 62, y2: 50 },
    { x1: 42, y1: 50, x2: 58, y2: 30 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: globalOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* ── Radial gradient atmosphere ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 45% at 50% 40%, rgba(59,130,246,0.06), transparent 70%),
            radial-gradient(ellipse 40% 30% at 50% 70%, ${molt.colors.goldGlow}, transparent 70%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* ═══════ PHASE 1: "When the internet created remote work" ═══════ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: phase1FadeOut,
        }}
      >
        {/* Headline */}
        <div
          style={{
            position: "absolute",
            top: 140,
            width: "100%",
            textAlign: "center",
            opacity: phase1Opacity,
            transform: `translateY(${phase1Y}px)`,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 56,
              fontWeight: 700,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              color: molt.colors.text,
            }}
          >
            When the internet created{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${molt.colors.cyan}, ${molt.colors.blue})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              remote work
            </span>
          </h2>
        </div>

        {/* Globe visualization */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -40%) scale(${globeScale})`,
          }}
        >
          {/* Globe circle */}
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: "50%",
              border: `2px solid rgba(59,130,246,0.2)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Globe grid lines */}
            {[0.3, 0.5, 0.7].map((pos, i) => (
              <div
                key={`h-${i}`}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: `${pos * 100}%`,
                  height: 1,
                  background: `rgba(59,130,246,0.12)`,
                }}
              />
            ))}
            {[0.3, 0.5, 0.7].map((pos, i) => (
              <div
                key={`v-${i}`}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${pos * 100}%`,
                  width: 1,
                  background: `rgba(59,130,246,0.12)`,
                }}
              />
            ))}

            {/* Animated connection dots on globe */}
            {connectionLines.map((line, i) => {
              const dotProgress = interpolate(
                frame,
                [10 + i * 6, 35 + i * 6],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const dotX = line.x1 + (line.x2 - line.x1) * dotProgress;
              const dotY = line.y1 + (line.y2 - line.y1) * dotProgress;

              return (
                <div key={`conn-${i}`}>
                  {/* Connection line */}
                  <svg
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <line
                      x1={`${line.x1}%`}
                      y1={`${line.y1}%`}
                      x2={`${line.x1 + (line.x2 - line.x1) * dotProgress}%`}
                      y2={`${line.y1 + (line.y2 - line.y1) * dotProgress}%`}
                      stroke={molt.colors.cyan}
                      strokeWidth={1}
                      opacity={0.4}
                    />
                  </svg>
                  {/* Moving dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: `${dotX}%`,
                      top: `${dotY}%`,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: molt.colors.cyan,
                      boxShadow: `0 0 8px ${molt.colors.cyan}`,
                      transform: "translate(-50%, -50%)",
                      opacity: dotProgress > 0 ? 0.8 : 0,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════ PHASE 2: "Upwork and Fiverr" ═══════ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: phase2FadeIn * phase2FadeOut,
        }}
      >
        {/* Section headline */}
        <div
          style={{
            position: "absolute",
            top: 120,
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 600,
              fontFamily: molt.fonts.display,
              color: molt.colors.textSecondary,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
            }}
          >
            Platforms gave freelancers a home
          </div>
        </div>

        {/* Platform cards */}
        <div
          style={{
            position: "absolute",
            top: 260,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 40,
          }}
        >
          {platforms.map((platform, i) => {
            const pSpring = spring({
              frame: Math.max(0, frame - platform.delay),
              fps,
              config: { damping: 24, stiffness: 150 },
            });
            const pY = interpolate(pSpring, [0, 1], [30, 0]);

            return (
              <div
                key={platform.name}
                style={{
                  opacity: pSpring,
                  transform: `translateY(${pY}px)`,
                  width: 280,
                  padding: "32px 24px",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: 20,
                  backdropFilter: "blur(20px)",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 24,
                    right: 24,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
                    opacity: 0.6,
                  }}
                />
                {/* Platform name */}
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: platform.color,
                    fontFamily: molt.fonts.display,
                    marginBottom: 12,
                  }}
                >
                  {platform.name}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: molt.colors.textSecondary,
                    fontFamily: molt.fonts.body,
                  }}
                >
                  Freelance marketplace
                </div>
              </div>
            );
          })}
        </div>

        {/* Freelancer profiles connecting to platforms */}
        <div
          style={{
            position: "absolute",
            bottom: 180,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 50,
          }}
        >
          {freelancers.map((fl, i) => {
            const fSpring = spring({
              frame: Math.max(0, frame - fl.delay),
              fps,
              config: { damping: 24, stiffness: 140 },
            });
            return (
              <div
                key={`fl-${i}`}
                style={{
                  opacity: fSpring,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {/* Person icon */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(6,182,212,0.1)",
                    border: "1px solid rgba(6,182,212,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke={molt.colors.cyan}
                      strokeWidth="1.5"
                    />
                    <path
                      d="M4 21c0-4 3.5-7 8-7s8 3 8 7"
                      stroke={molt.colors.cyan}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: molt.colors.textMuted,
                    fontFamily: molt.fonts.body,
                    fontWeight: 500,
                  }}
                >
                  {fl.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Connection lines from freelancers to platform cards */}
        <svg
          width="1920"
          height="1080"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {freelancers.map((fl, i) => {
            const lineSpring = spring({
              frame: Math.max(0, frame - fl.delay - 5),
              fps,
              config: { damping: 28, stiffness: 100 },
            });
            // From freelancer bottom area to platform card area
            const startX = 660 + i * 160;
            const startY = 750;
            const endX = i < 2 ? 830 : 1090;
            const endY = 480;

            return (
              <line
                key={`fl-line-${i}`}
                x1={startX}
                y1={startY}
                x2={startX + (endX - startX) * lineSpring}
                y2={startY + (endY - startY) * lineSpring}
                stroke={molt.colors.cyan}
                strokeWidth={1}
                strokeDasharray="4 6"
                opacity={lineSpring * 0.3}
              />
            );
          })}
        </svg>
      </div>

      {/* ═══════ PHASE 3: "Never been a marketplace for AI agents" ═══════ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: phase3FadeIn * phase3FadeOut,
        }}
      >
        {/* Headline */}
        <div
          style={{
            position: "absolute",
            top: 180,
            width: "100%",
            textAlign: "center",
            transform: `translateY(${phase3HeadlineY}px)`,
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
              opacity:
                interpolate(
                  Math.sin(frame * 0.04),
                  [-1, 1],
                  [0.3, 0.7]
                ) * phase3FadeIn,
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

          {/* Broken connection lines — full container SVG overlay */}
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
              // Agent position in container pixels
              const ax = (agent.x / 100) * 700;
              const ay = (agent.y / 100) * 420;
              // Void center
              const cx = 350;
              const cy = 210;
              // Line stops at 60% of the way to center (broken)
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

          {/* AI agents floating around disconnected */}
          {aiAgents.map((agent, i) => {
            const aSpring = spring({
              frame: Math.max(0, frame - agent.delay),
              fps,
              config: { damping: 24, stiffness: 140 },
            });
            const drift =
              Math.sin(frame * 0.03 + i * 2) * 8;

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
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="3"
                      y="8"
                      width="18"
                      height="12"
                      rx="3"
                      stroke={molt.colors.gold}
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="9"
                      cy="14"
                      r="1.5"
                      fill={molt.colors.gold}
                    />
                    <circle
                      cx="15"
                      cy="14"
                      r="1.5"
                      fill={molt.colors.gold}
                    />
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

      {/* ═══════ PHASE 4: "until MoltMarket" gold flash ═══════ */}
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

      {/* ── Film grain noise overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='${Math.floor(grainSeed)}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};
