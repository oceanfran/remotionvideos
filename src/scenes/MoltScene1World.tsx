import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { molt } from "../moltTheme";

/* ──────────────────────────────────────────────────
   Scene 1 — The World Right Now  (0-6s · 180 frames)
   Animated network of glowing AI-agent nodes
   representing millions already running worldwide.
   ────────────────────────────────────────────────── */

interface NodeData {
  x: number;
  y: number;
  icon: string;
  delay: number;
  size: number;
}

const nodes: NodeData[] = [
  { x: 280, y: 200, icon: "code", delay: 0, size: 48 },
  { x: 820, y: 150, icon: "email", delay: 4, size: 44 },
  { x: 1400, y: 280, icon: "data", delay: 8, size: 50 },
  { x: 1650, y: 520, icon: "design", delay: 12, size: 46 },
  { x: 350, y: 600, icon: "code", delay: 6, size: 42 },
  { x: 960, y: 480, icon: "email", delay: 10, size: 48 },
  { x: 1200, y: 650, icon: "data", delay: 14, size: 44 },
  { x: 550, y: 380, icon: "design", delay: 3, size: 46 },
  { x: 1550, y: 180, icon: "code", delay: 16, size: 40 },
  { x: 720, y: 700, icon: "email", delay: 9, size: 42 },
  { x: 180, y: 450, icon: "data", delay: 18, size: 44 },
  { x: 1100, y: 340, icon: "design", delay: 7, size: 46 },
  { x: 480, y: 160, icon: "code", delay: 20, size: 38 },
  { x: 1350, y: 500, icon: "email", delay: 11, size: 42 },
  { x: 850, y: 600, icon: "data", delay: 15, size: 40 },
  { x: 1700, y: 400, icon: "code", delay: 22, size: 44 },
];

// Connections between nodes (index pairs)
const connections: [number, number][] = [
  [0, 7], [0, 4], [1, 5], [1, 8], [2, 3], [2, 11],
  [3, 6], [4, 10], [5, 11], [6, 14], [7, 1], [8, 2],
  [9, 6], [10, 4], [11, 13], [12, 0], [13, 15], [14, 9],
];

const IconSvg: React.FC<{ type: string; size: number }> = ({ type, size }) => {
  const s = size * 0.45;
  switch (type) {
    case "code":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke={molt.colors.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "email":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="3" stroke={molt.colors.goldLight} strokeWidth="2" />
          <path d="M2 7l10 6 10-6" stroke={molt.colors.goldLight} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "data":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="14" width="4" height="7" rx="1" fill={molt.colors.cyan} />
          <rect x="10" y="9" width="4" height="12" rx="1" fill={molt.colors.gold} />
          <rect x="17" y="4" width="4" height="17" rx="1" fill={molt.colors.green} />
        </svg>
      );
    default: // design
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={molt.colors.purple} strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill={molt.colors.purple} opacity={0.6} />
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke={molt.colors.purple} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};

export const MoltScene1World: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleSpring = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 70 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  const subtitleSpring = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 70 } });

  // Exit
  const exitOp = interpolate(frame, [155, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse for nodes
  const pulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: exitOp,
      }}
    >
      {/* Radial gold glow background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${molt.colors.goldGlow}, transparent)`,
        }}
      />

      {/* Connection lines */}
      <svg
        style={{ position: "absolute", inset: 0 }}
        width={1920}
        height={1080}
      >
        {connections.map(([a, b], i) => {
          const na = nodes[a];
          const nb = nodes[b];
          const lineSpring = spring({
            frame: frame - Math.max(na.delay, nb.delay) - 5,
            fps,
            config: { damping: 20, stiffness: 60 },
          });
          return (
            <line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={na.x + (nb.x - na.x) * lineSpring}
              y2={na.y + (nb.y - na.y) * lineSpring}
              stroke={molt.colors.gold}
              strokeWidth={1.5}
              opacity={lineSpring * 0.2}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const nodeSpring = spring({
          frame: frame - node.delay,
          fps,
          config: { damping: 12, stiffness: 100 },
        });
        const scale = interpolate(nodeSpring, [0, 1], [0, 1]);
        const glowSize = node.size * 2 * pulse;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: node.x - node.size / 2,
              top: node.y - node.size / 2,
              width: node.size,
              height: node.size,
              transform: `scale(${scale})`,
              opacity: nodeSpring,
            }}
          >
            {/* Glow ring */}
            <div
              style={{
                position: "absolute",
                left: -(glowSize - node.size) / 2,
                top: -(glowSize - node.size) / 2,
                width: glowSize,
                height: glowSize,
                borderRadius: molt.radius.full,
                background: `radial-gradient(circle, ${molt.colors.goldGlowStrong}, transparent 70%)`,
                opacity: 0.5,
              }}
            />
            {/* Node circle */}
            <div
              style={{
                position: "relative",
                width: node.size,
                height: node.size,
                borderRadius: molt.radius.full,
                background: molt.colors.bgCard,
                border: `2px solid ${molt.colors.borderGold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${molt.colors.goldGlow}`,
              }}
            >
              <IconSvg type={node.icon} size={node.size} />
            </div>
          </div>
        );
      })}

      {/* Title overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: "100%",
          textAlign: "center",
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 62,
            fontWeight: 800,
            fontFamily: molt.fonts.display,
            letterSpacing: "-0.03em",
            color: molt.colors.text,
            marginBottom: 16,
          }}
        >
          AI agents are already doing{" "}
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
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: molt.colors.textSecondary,
            fontFamily: molt.fonts.body,
            opacity: subtitleSpring,
          }}
        >
          Millions running right now on machines all over the world
        </div>
      </div>
    </AbsoluteFill>
  );
};
