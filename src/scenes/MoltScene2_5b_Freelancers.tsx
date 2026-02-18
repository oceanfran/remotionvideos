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
   Scene 2.5b — "Platforms gave freelancers a home"
   Improved platform cards with animated user activity,
   connection network, and richer visual design.
   ~130 frames (4.3s)
   ────────────────────────────────────────────────── */

/* ── Platform data ── */
const platforms = [
  {
    name: "Upwork",
    color: "#6FDA44",
    tagline: "Freelance marketplace",
    stats: "12M+ freelancers",
    delay: 15,
  },
  {
    name: "Fiverr",
    color: "#1DBF73",
    tagline: "Services marketplace",
    stats: "830K+ sellers",
    delay: 25,
  },
];

/* ── Freelancer profiles ── */
const freelancers = [
  { label: "Designer", icon: "pen", delay: 35, color: molt.colors.purple },
  { label: "Developer", icon: "code", delay: 42, color: molt.colors.cyan },
  { label: "Writer", icon: "doc", delay: 49, color: molt.colors.goldLight },
  { label: "Marketer", icon: "chart", delay: 56, color: molt.colors.green },
  { label: "Video Editor", icon: "play", delay: 63, color: molt.colors.amber },
];

/* ── Layout constants ── */
const CIRCLE_SIZE = 72;
const CARD_WIDTH = 320;
const CARD_GAP = 48;
const FL_GAP = 40;
const CARDS_TOP = 240;
const CARD_HEIGHT = 230; // approximate rendered height of platform cards
const FL_BOTTOM = 140;

// Platform card centers (2 cards centered in 1920px)
const totalCardsWidth = 2 * CARD_WIDTH + CARD_GAP;
const cardsStartX = (1920 - totalCardsWidth) / 2;
const platformCenters = [
  cardsStartX + CARD_WIDTH / 2, // Upwork center X
  cardsStartX + CARD_WIDTH + CARD_GAP + CARD_WIDTH / 2, // Fiverr center X
];
const platformBottomY = CARDS_TOP + CARD_HEIGHT; // bottom of cards

// Freelancer circle positions (5 items centered)
// Each item is roughly CIRCLE_SIZE wide + label adds ~10px per side
const itemWidth = CIRCLE_SIZE + 20;
const totalFlWidth = freelancers.length * itemWidth + (freelancers.length - 1) * FL_GAP;
const flStartX = (1920 - totalFlWidth) / 2;
const flCentersX = freelancers.map((_, i) => flStartX + itemWidth / 2 + i * (itemWidth + FL_GAP));
const flCircleTopY = 1080 - FL_BOTTOM - CIRCLE_SIZE - 28; // top of circles (28 = gap + label)

// Connection mapping: which platform each freelancer connects to
const connectionMap = [0, 0, 0, 1, 1]; // Designer/Developer/Writer → Upwork, Marketer/VideoEditor → Fiverr

export const MoltScene2_5b_Freelancers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Entrance & exit ── */
  const entranceOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const exitOpacity = interpolate(frame, [98, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [98, 120], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const globalOpacity = entranceOpacity * exitOpacity;

  /* ── Headline spring ── */
  const headlineSpring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 26, stiffness: 140 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [25, 0]);

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
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(59,130,246,0.05), transparent 70%),
            radial-gradient(ellipse 40% 30% at 50% 65%, ${molt.colors.goldGlow}, transparent 60%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* ── Headline ── */}
      <div
        style={{
          position: "absolute",
          top: 100,
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
          }}
        >
          Platforms gave freelancers{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${molt.colors.cyan}, ${molt.colors.blue})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            a home
          </span>
        </div>
      </div>

      {/* ── Platform cards ── */}
      <div
        style={{
          position: "absolute",
          top: CARDS_TOP,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: CARD_GAP,
        }}
      >
        {platforms.map((platform) => {
          const pSpring = spring({
            frame: Math.max(0, frame - platform.delay),
            fps,
            config: { damping: 24, stiffness: 150 },
          });
          const pY = interpolate(pSpring, [0, 1], [30, 0]);
          const pScale = interpolate(pSpring, [0, 1], [0.95, 1]);

          // Subtle shimmer effect
          const shimmerX = interpolate(
            frame,
            [platform.delay + 15, platform.delay + 45],
            [-100, 400],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={platform.name}
              style={{
                opacity: pSpring,
                transform: `translateY(${pY}px) scale(${pScale})`,
                width: CARD_WIDTH,
                padding: "36px 28px",
                background: `linear-gradient(165deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 24,
                backdropFilter: "blur(20px)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 20,
                  right: 20,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
                  opacity: 0.7,
                }}
              />
              {/* Shimmer sweep */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: shimmerX,
                  width: 100,
                  height: "100%",
                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)`,
                  transform: "skewX(-12deg)",
                  pointerEvents: "none",
                }}
              />
              {/* Platform icon circle */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: `${platform.color}15`,
                  border: `1.5px solid ${platform.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: platform.color,
                    opacity: 0.8,
                  }}
                />
              </div>
              {/* Platform name */}
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: platform.color,
                  fontFamily: molt.fonts.display,
                  marginBottom: 8,
                }}
              >
                {platform.name}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: molt.colors.textSecondary,
                  fontFamily: molt.fonts.body,
                  marginBottom: 12,
                }}
              >
                {platform.tagline}
              </div>
              {/* Stats pill */}
              <div
                style={{
                  display: "inline-flex",
                  padding: "5px 14px",
                  borderRadius: 100,
                  background: `${platform.color}0A`,
                  border: `1px solid ${platform.color}20`,
                  fontSize: 13,
                  fontWeight: 600,
                  color: platform.color,
                  fontFamily: molt.fonts.mono,
                  letterSpacing: "0.02em",
                }}
              >
                {platform.stats}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Freelancer profile row ── */}
      <div
        style={{
          position: "absolute",
          bottom: FL_BOTTOM,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: FL_GAP,
        }}
      >
        {freelancers.map((fl, i) => {
          const fSpring = spring({
            frame: Math.max(0, frame - fl.delay),
            fps,
            config: { damping: 24, stiffness: 140 },
          });
          const fY = interpolate(fSpring, [0, 1], [20, 0]);
          const drift = Math.sin(frame * 0.03 + i * 1.8) * 3;

          return (
            <div
              key={`fl-${i}`}
              style={{
                opacity: fSpring,
                transform: `translateY(${fY + drift}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: CIRCLE_SIZE,
                  height: CIRCLE_SIZE,
                  borderRadius: "50%",
                  background: `${fl.color}18`,
                  border: `2px solid ${fl.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 20px ${fl.color}20, 0 0 40px ${fl.color}10`,
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke={fl.color}
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4 21c0-4 3.5-7 8-7s8 3 8 7"
                    stroke={fl.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: fl.color,
                  fontFamily: molt.fonts.body,
                  opacity: 0.9,
                }}
              >
                {fl.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Connection lines from platform cards to freelancer circles ── */}
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <defs>
          {freelancers.map((fl, i) => (
            <linearGradient
              key={`grad-${i}`}
              id={`line-grad-${i}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={platforms[connectionMap[i]].color} stopOpacity={0.6} />
              <stop offset="100%" stopColor={fl.color} stopOpacity={0.6} />
            </linearGradient>
          ))}
        </defs>
        {freelancers.map((fl, i) => {
          const lineSpring = spring({
            frame: Math.max(0, frame - fl.delay - 5),
            fps,
            config: { damping: 24, stiffness: 120 },
          });

          const platformIdx = connectionMap[i];
          // Start from bottom-center of platform card
          const startX = platformCenters[platformIdx];
          const startY = platformBottomY;
          // End at top-center of freelancer circle
          const endX = flCentersX[i];
          const endY = flCircleTopY;

          // Bezier control points for smooth S-curve
          const midY = (startY + endY) / 2;
          const ctrlX1 = startX;
          const ctrlY1 = midY - 20;
          const ctrlX2 = endX;
          const ctrlY2 = midY + 20;

          // Animate the path drawing with dashoffset
          const pathLength = 600; // approximate

          return (
            <g key={`fl-line-${i}`} opacity={lineSpring * 0.5}>
              {/* Main connection line */}
              <path
                d={`M ${startX} ${startY} C ${ctrlX1} ${ctrlY1} ${ctrlX2} ${ctrlY2} ${endX} ${endY}`}
                fill="none"
                stroke={`url(#line-grad-${i})`}
                strokeWidth={1.5}
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - lineSpring)}
              />
              {/* Glowing dot at the endpoint */}
              {lineSpring > 0.8 && (
                <circle
                  cx={endX}
                  cy={endY}
                  r={3}
                  fill={fl.color}
                  opacity={interpolate(lineSpring, [0.8, 1], [0, 0.8])}
                >
                </circle>
              )}
            </g>
          );
        })}
      </svg>

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
