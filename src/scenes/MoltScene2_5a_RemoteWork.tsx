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
   Scene 2.5a — "When the internet created remote work"
   Improved globe animation with orbiting connection arcs,
   scattered city dots, and laptop/device icons.
   ~100 frames (3.3s)
   ────────────────────────────────────────────────── */

/* City-dot positions on the "globe" (percentage-based within the globe) */
const cityDots = [
  { x: 35, y: 22, delay: 8 },   // North America
  { x: 55, y: 20, delay: 11 },  // Europe
  { x: 68, y: 32, delay: 14 },  // Middle East
  { x: 75, y: 45, delay: 17 },  // India
  { x: 82, y: 35, delay: 20 },  // East Asia
  { x: 25, y: 50, delay: 23 },  // South America
  { x: 60, y: 55, delay: 26 },  // Africa
  { x: 85, y: 55, delay: 29 },  // Southeast Asia
  { x: 90, y: 65, delay: 32 },  // Australia
  { x: 42, y: 30, delay: 15 },  // Eastern US
];

/* Connection arcs between cities */
const arcs = [
  { from: 0, to: 1, delay: 18, color: molt.colors.cyan },
  { from: 1, to: 4, delay: 24, color: molt.colors.gold },
  { from: 0, to: 5, delay: 30, color: molt.colors.cyan },
  { from: 2, to: 3, delay: 36, color: molt.colors.goldLight },
  { from: 6, to: 1, delay: 42, color: molt.colors.cyan },
  { from: 4, to: 8, delay: 48, color: molt.colors.gold },
  { from: 9, to: 7, delay: 35, color: molt.colors.goldLight },
];

/* Device icons around the globe */
const devices = [
  { x: 12, y: 30, icon: "laptop", delay: 30 },
  { x: 88, y: 28, icon: "phone", delay: 38 },
  { x: 15, y: 70, icon: "monitor", delay: 46 },
  { x: 85, y: 72, icon: "laptop", delay: 42 },
];

export const MoltScene2_5a_RemoteWork: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Entrance & exit ── */
  const entranceOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const exitOpacity = interpolate(frame, [22, 44], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [22, 44], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const globalOpacity = entranceOpacity * exitOpacity;

  /* ── Headline spring ── */
  const headlineSpring = spring({
    frame,
    fps,
    config: { damping: 26, stiffness: 140 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [30, 0]);

  /* ── Globe scale-in ── */
  const globeSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 22, stiffness: 120 },
  });
  const globeScale = interpolate(globeSpring, [0, 1], [0.7, 1]);

  /* ── Globe rotation effect (subtle) ── */
  const globeRotation = interpolate(frame, [0, 44], [0, 12], {
    extrapolateRight: "clamp",
  });

  /* Globe dimensions */
  const globeSize = 340;
  const globeCX = 960; // center X of 1920
  const globeCY = 560; // center Y (slightly below middle)

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
            radial-gradient(ellipse 50% 40% at 50% 55%, rgba(6,182,212,0.08), transparent 70%),
            radial-gradient(ellipse 40% 30% at 50% 55%, ${molt.colors.goldGlow}, transparent 60%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* ── Headline ── */}
      <div
        style={{
          position: "absolute",
          top: 110,
          width: "100%",
          textAlign: "center",
          opacity: headlineSpring,
          transform: `translateY(${headlineY}px)`,
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

      {/* ── Globe visualization (SVG-based for smoother rendering) ── */}
      <div
        style={{
          position: "absolute",
          top: globeCY - globeSize / 2,
          left: globeCX - globeSize / 2,
          width: globeSize,
          height: globeSize,
          transform: `scale(${globeScale})`,
        }}
      >
        <svg
          width={globeSize}
          height={globeSize}
          viewBox={`0 0 ${globeSize} ${globeSize}`}
          style={{ overflow: "visible" }}
        >
          {/* Globe outer ring */}
          <circle
            cx={globeSize / 2}
            cy={globeSize / 2}
            r={globeSize / 2 - 2}
            fill="none"
            stroke="rgba(6,182,212,0.15)"
            strokeWidth={1.5}
          />

          {/* Globe meridian lines (curved for 3D feel) */}
          {[-40, -15, 10, 35].map((offset, i) => {
            const rx = 30 + Math.abs(offset) * 1.5;
            return (
              <ellipse
                key={`meridian-${i}`}
                cx={globeSize / 2 + offset + globeRotation * 0.5}
                cy={globeSize / 2}
                rx={rx}
                ry={globeSize / 2 - 10}
                fill="none"
                stroke="rgba(6,182,212,0.07)"
                strokeWidth={0.8}
              />
            );
          })}

          {/* Latitude lines */}
          {[0.28, 0.42, 0.58, 0.72].map((pos, i) => (
            <ellipse
              key={`lat-${i}`}
              cx={globeSize / 2}
              cy={globeSize * pos}
              rx={
                globeSize / 2 *
                Math.sin(Math.acos(Math.abs(pos - 0.5) * 2)) - 10
              }
              ry={8}
              fill="none"
              stroke="rgba(6,182,212,0.07)"
              strokeWidth={0.8}
            />
          ))}

          {/* City dots */}
          {cityDots.map((city, i) => {
            const dotSpring = spring({
              frame: Math.max(0, frame - city.delay),
              fps,
              config: { damping: 20, stiffness: 180 },
            });
            const cx = (city.x / 100) * globeSize;
            const cy = (city.y / 100) * globeSize;
            const pulse = 0.6 + Math.sin(frame * 0.08 + i * 1.3) * 0.4;

            return (
              <g key={`city-${i}`} opacity={dotSpring}>
                {/* Glow ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={8}
                  fill="none"
                  stroke={molt.colors.cyan}
                  strokeWidth={0.5}
                  opacity={pulse * 0.4}
                />
                {/* Core dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={3.5}
                  fill={molt.colors.cyan}
                  opacity={0.9}
                />
                {/* Inner bright core */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={1.5}
                  fill="white"
                  opacity={0.6}
                />
              </g>
            );
          })}

          {/* Connection arcs between cities */}
          {arcs.map((arc, i) => {
            const fromCity = cityDots[arc.from];
            const toCity = cityDots[arc.to];
            const arcSpring = spring({
              frame: Math.max(0, frame - arc.delay),
              fps,
              config: { damping: 24, stiffness: 100 },
            });

            const x1 = (fromCity.x / 100) * globeSize;
            const y1 = (fromCity.y / 100) * globeSize;
            const x2 = (toCity.x / 100) * globeSize;
            const y2 = (toCity.y / 100) * globeSize;

            // Arc midpoint raised for curved path
            const mx = (x1 + x2) / 2;
            const my = Math.min(y1, y2) - 30 - Math.abs(x2 - x1) * 0.15;

            const pathD = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
            const pathLength = 400; // approximate

            // Traveling particle along arc
            const particleT = ((frame - arc.delay) * 0.04) % 1;
            const pt = Math.max(0, Math.min(1, particleT));
            // Quadratic bezier point
            const px =
              (1 - pt) * (1 - pt) * x1 + 2 * (1 - pt) * pt * mx + pt * pt * x2;
            const py =
              (1 - pt) * (1 - pt) * y1 + 2 * (1 - pt) * pt * my + pt * pt * y2;

            return (
              <g key={`arc-${i}`} opacity={arcSpring * 0.7}>
                {/* Arc path */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={arc.color}
                  strokeWidth={1.2}
                  strokeDasharray={pathLength}
                  strokeDashoffset={pathLength * (1 - arcSpring)}
                  strokeLinecap="round"
                />
                {/* Traveling particle */}
                {arcSpring > 0.5 && (
                  <circle
                    cx={px}
                    cy={py}
                    r={2.5}
                    fill={arc.color}
                    opacity={0.8}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Device icons floating around the globe ── */}
      {devices.map((device, i) => {
        const devSpring = spring({
          frame: Math.max(0, frame - device.delay),
          fps,
          config: { damping: 24, stiffness: 130 },
        });
        const devY = interpolate(devSpring, [0, 1], [20, 0]);
        const drift = Math.sin(frame * 0.03 + i * 2) * 5;

        return (
          <div
            key={`device-${i}`}
            style={{
              position: "absolute",
              left: `${device.x}%`,
              top: `${device.y}%`,
              transform: `translate(-50%, -50%) translateY(${devY + drift}px)`,
              opacity: devSpring * 0.85,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {device.icon === "laptop" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="12"
                    rx="2"
                    stroke={molt.colors.cyan}
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2 18h20"
                    stroke={molt.colors.cyan}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {device.icon === "phone" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="6"
                    y="2"
                    width="12"
                    height="20"
                    rx="3"
                    stroke={molt.colors.cyan}
                    strokeWidth="1.5"
                  />
                  <line
                    x1="10"
                    y1="18"
                    x2="14"
                    y2="18"
                    stroke={molt.colors.cyan}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {device.icon === "monitor" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="3"
                    width="20"
                    height="14"
                    rx="2"
                    stroke={molt.colors.cyan}
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 21h8M12 17v4"
                    stroke={molt.colors.cyan}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
          </div>
        );
      })}

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
