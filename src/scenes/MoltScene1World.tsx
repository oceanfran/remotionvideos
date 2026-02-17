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
   Scene 1 — The World Right Now  (0-5s · 150 frames)
   Motion graphics: animated network of AI agent nodes
   with flowing data particles and pulsing connections.
   ────────────────────────────────────────────────── */

/* ── Network node positions (percentage-based) ── */
const nodes = [
  { x: 15, y: 25, label: "Code", size: 44, color: molt.colors.gold },
  { x: 78, y: 18, label: "Research", size: 40, color: molt.colors.cyan },
  { x: 88, y: 55, label: "Design", size: 36, color: molt.colors.purple },
  { x: 22, y: 72, label: "Data", size: 38, color: molt.colors.blue },
  { x: 55, y: 82, label: "Support", size: 34, color: molt.colors.green },
  { x: 42, y: 12, label: "Marketing", size: 32, color: molt.colors.amber },
  { x: 70, y: 68, label: "Writing", size: 36, color: molt.colors.goldLight },
  { x: 10, y: 50, label: "Analysis", size: 30, color: molt.colors.cyan },
];

/* ── Connections between nodes (index pairs) ── */
const connections: [number, number][] = [
  [0, 1], [0, 3], [0, 5], [1, 2], [1, 5],
  [2, 4], [2, 6], [3, 4], [3, 7], [4, 6],
  [5, 1], [6, 4], [7, 0],
];

export const MoltScene1World: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cinematic zoom: starts slightly scaled up, settles to 1.0
  const zoomScale = interpolate(frame, [0, 50], [1.08, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Scene entrance fade
  const enterOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Headline spring
  const headlineSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 24, stiffness: 140, mass: 1 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [35, 0]);

  // Subtitle staggered after headline
  const subSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 24, stiffness: 140, mass: 1 },
  });
  const subY = interpolate(subSpring, [0, 1], [25, 0]);

  // Exit: clean fade + subtle scale-down
  const exitOp = interpolate(frame, [205, 230], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [205, 230], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const combinedOp = Math.min(enterOp, exitOp);

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: combinedOp,
        transform: `scale(${zoomScale * exitScale})`,
      }}
    >
      {/* Deep atmospheric background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 100% 80% at 50% 50%, #141420, ${molt.colors.bg})`,
        }}
      />

      {/* ── Connection lines between nodes ── */}
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {connections.map(([from, to], i) => {
          const n1 = nodes[from];
          const n2 = nodes[to];
          const x1 = (n1.x / 100) * 1920;
          const y1 = (n1.y / 100) * 1080;
          const x2 = (n2.x / 100) * 1920;
          const y2 = (n2.y / 100) * 1080;

          // Stagger line appearance
          const lineDelay = 8 + i * 3;
          const lineSpring = spring({
            frame: frame - lineDelay,
            fps,
            config: { damping: 28, stiffness: 100 },
          });

          // Pulse opacity along the line
          const pulse = 0.12 + Math.sin(frame * 0.06 + i * 1.2) * 0.06;

          return (
            <g key={`conn-${i}`} opacity={lineSpring * pulse}>
              {/* Base line */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={molt.colors.gold}
                strokeWidth={1.2}
                strokeDasharray="6 4"
              />
              {/* Data particle flowing along the line */}
              {(() => {
                const t = ((frame * 0.015 + i * 0.3) % 1);
                const px = x1 + (x2 - x1) * t;
                const py = y1 + (y2 - y1) * t;
                return (
                  <circle
                    cx={px}
                    cy={py}
                    r={3}
                    fill={molt.colors.goldLight}
                    opacity={lineSpring * 0.8}
                  >
                    {/* Glow around the particle */}
                  </circle>
                );
              })()}
              {/* Second particle offset */}
              {(() => {
                const t2 = ((frame * 0.015 + i * 0.3 + 0.5) % 1);
                const px2 = x1 + (x2 - x1) * t2;
                const py2 = y1 + (y2 - y1) * t2;
                return (
                  <circle
                    cx={px2}
                    cy={py2}
                    r={2}
                    fill={molt.colors.cyan}
                    opacity={lineSpring * 0.5}
                  />
                );
              })()}
            </g>
          );
        })}
      </svg>

      {/* ── Network nodes — AI agent indicators ── */}
      {nodes.map((node, i) => {
        const nodeDelay = 5 + i * 4;
        const nodeSpring = spring({
          frame: frame - nodeDelay,
          fps,
          config: { damping: 26, stiffness: 140 },
        });

        // Gentle floating drift
        const driftX = Math.sin(frame * 0.02 + i * 2.5) * 8;
        const driftY = Math.cos(frame * 0.015 + i * 1.8) * 6;

        // Pulsing ring around node
        const ringScale = 1 + Math.sin(frame * 0.05 + i * 0.8) * 0.15;
        const ringOp = 0.15 + Math.sin(frame * 0.05 + i * 0.8) * 0.1;

        const nodeScale = interpolate(nodeSpring, [0, 1], [0.3, 1]);

        return (
          <div
            key={`node-${i}`}
            style={{
              position: "absolute",
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) scale(${nodeScale})`,
              opacity: nodeSpring,
            }}
          >
            {/* Outer pulsing ring */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: node.size * 2,
                height: node.size * 2,
                transform: `translate(-50%, -50%) scale(${ringScale})`,
                borderRadius: "50%",
                border: `1px solid ${node.color}`,
                opacity: ringOp,
              }}
            />

            {/* Node circle */}
            <div
              style={{
                width: node.size,
                height: node.size,
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, ${node.color}40, ${node.color}15)`,
                border: `1.5px solid ${node.color}60`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${node.color}30`,
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Inner dot — active indicator */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: node.color,
                  boxShadow: `0 0 10px ${node.color}`,
                }}
              />
            </div>

            {/* Label below node */}
            <div
              style={{
                position: "absolute",
                top: node.size + 6,
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                fontSize: 12,
                fontWeight: 600,
                color: node.color,
                fontFamily: molt.fonts.mono,
                letterSpacing: "0.04em",
                opacity: 0.7,
                textTransform: "uppercase",
              }}
            >
              {node.label}
            </div>
          </div>
        );
      })}

      {/* ── Floating activity counters (small glass pills) ── */}
      {[
        { x: 35, y: 35, text: "2.4M tasks/hr", delay: 30, color: molt.colors.gold },
        { x: 65, y: 40, text: "99.2% uptime", delay: 38, color: molt.colors.green },
        { x: 50, y: 60, text: "180+ countries", delay: 45, color: molt.colors.cyan },
      ].map((pill, i) => {
        const pillSpring = spring({
          frame: frame - pill.delay,
          fps,
          config: { damping: 24, stiffness: 140 },
        });
        const pillY = interpolate(pillSpring, [0, 1], [15, 0]);
        const drift = Math.sin(frame * 0.025 + i * 2) * 4;

        return (
          <div
            key={`pill-${i}`}
            style={{
              position: "absolute",
              left: `${pill.x}%`,
              top: `${pill.y}%`,
              transform: `translate(-50%, -50%) translateY(${pillY + drift}px)`,
              opacity: pillSpring * 0.6,
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              fontSize: 13,
              fontWeight: 600,
              color: pill.color,
              fontFamily: molt.fonts.mono,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {pill.text}
          </div>
        );
      })}

      {/* Center content — massive Apple-style typography */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 120px",
        }}
      >
        {/* Semi-transparent backdrop for text readability */}
        <div
          style={{
            position: "absolute",
            width: 900,
            height: 260,
            borderRadius: 40,
            background: `radial-gradient(ellipse, ${molt.colors.bg}E0, ${molt.colors.bg}80, transparent)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            opacity: headlineSpring,
            transform: `translateY(${headlineY}px)`,
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: molt.colors.text,
            }}
          >
            AI agents are already
            <br />
            doing{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold}, ${molt.colors.goldAccent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              real work
            </span>
          </div>
        </div>

        <div
          style={{
            opacity: subSpring,
            transform: `translateY(${subY}px)`,
            marginTop: 28,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: molt.colors.textSecondary,
              fontFamily: molt.fonts.body,
              textAlign: "center",
              letterSpacing: "-0.01em",
            }}
          >
            Millions running right now on machines all over the world
          </div>
        </div>
      </div>

      {/* Subtle noise overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
