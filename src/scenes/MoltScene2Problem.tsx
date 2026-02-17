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
   Scene 2 — The Problem  (5-10s · 150 frames)
   Motion graphics: disconnected/scattered nodes,
   broken connection lines flickering, visual gap
   in center. Dramatic red atmosphere.
   ────────────────────────────────────────────────── */

/* ── Scattered nodes — isolated, not connected ── */
const scatteredNodes = [
  { x: 8, y: 20, size: 32, drift: 0.7 },
  { x: 92, y: 15, size: 28, drift: 1.1 },
  { x: 85, y: 75, size: 30, drift: 0.9 },
  { x: 12, y: 80, size: 26, drift: 1.3 },
  { x: 30, y: 8, size: 24, drift: 0.8 },
  { x: 72, y: 88, size: 28, drift: 1.0 },
  { x: 5, y: 50, size: 22, drift: 1.2 },
  { x: 95, y: 45, size: 24, drift: 0.6 },
];

/* ── Broken connection attempts (lines that fail to reach) ── */
const brokenLines = [
  { x1: 8, y1: 20, x2: 35, y2: 35, failAt: 0.55 },
  { x1: 92, y1: 15, x2: 65, y2: 35, failAt: 0.6 },
  { x1: 85, y1: 75, x2: 65, y2: 55, failAt: 0.5 },
  { x1: 12, y1: 80, x2: 35, y2: 60, failAt: 0.45 },
  { x1: 30, y1: 8, x2: 42, y2: 30, failAt: 0.5 },
  { x1: 72, y1: 88, x2: 58, y2: 65, failAt: 0.55 },
];

export const MoltScene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance fade
  const enterOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // "But they have" — line 1
  const line1Spring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 24, stiffness: 140 },
  });
  const line1Y = interpolate(line1Spring, [0, 1], [30, 0]);

  // "no way to get hired" — hero phrase
  const heroSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 22, stiffness: 120 },
  });
  const heroY = interpolate(heroSpring, [0, 1], [35, 0]);
  const heroScale = interpolate(heroSpring, [0, 1], [0.92, 1]);

  // Bottom subtitle
  const subSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 24, stiffness: 140 },
  });
  const subY = interpolate(subSpring, [0, 1], [20, 0]);

  // Horizontal line accent — expands from center
  const lineWidth = interpolate(frame, [25, 60], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Red glow that pulses once
  const redGlow = interpolate(frame, [18, 40, 80], [0, 0.15, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit (adjusted for 120-frame duration)
  const exitOp = interpolate(frame, [95, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [95, 120], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const combinedOp = Math.min(enterOp, exitOp);

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: combinedOp,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Subtle red-tinted atmospheric glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 45%, rgba(239,68,68,${redGlow}), transparent)`,
        }}
      />

      {/* ── Broken connection lines (SVG) ── */}
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {brokenLines.map((line, i) => {
          const x1 = (line.x1 / 100) * 1920;
          const y1 = (line.y1 / 100) * 1080;
          const x2Full = (line.x2 / 100) * 1920;
          const y2Full = (line.y2 / 100) * 1080;

          // Line only extends to failAt percentage
          const x2 = x1 + (x2Full - x1) * line.failAt;
          const y2 = y1 + (y2Full - y1) * line.failAt;

          const lineDelay = 10 + i * 5;
          const lineSpring = spring({
            frame: frame - lineDelay,
            fps,
            config: { damping: 28, stiffness: 100 },
          });

          // Flicker effect — line appears and flickers
          const flicker = Math.sin(frame * 0.3 + i * 2.5) > 0.2 ? 1 : 0.3;

          // End-point "error" indicator — small X or spark
          const endFlash = interpolate(
            Math.sin(frame * 0.15 + i * 1.5),
            [-1, 1],
            [0.2, 0.8]
          );

          return (
            <g key={`broken-${i}`} opacity={lineSpring}>
              {/* Broken dashed line */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={molt.colors.red}
                strokeWidth={1}
                strokeDasharray="4 6"
                opacity={flicker * 0.4}
              />
              {/* Error spark at the break point */}
              <circle
                cx={x2}
                cy={y2}
                r={4}
                fill={molt.colors.red}
                opacity={endFlash * lineSpring * 0.6}
              />
              <circle
                cx={x2}
                cy={y2}
                r={8}
                fill="none"
                stroke={molt.colors.red}
                strokeWidth={1}
                opacity={endFlash * lineSpring * 0.3}
              />
            </g>
          );
        })}
      </svg>

      {/* ── Scattered disconnected nodes ── */}
      {scatteredNodes.map((node, i) => {
        const nodeDelay = 5 + i * 3;
        const nodeSpring = spring({
          frame: frame - nodeDelay,
          fps,
          config: { damping: 26, stiffness: 140 },
        });

        // Erratic drift — nodes floating aimlessly
        const driftX = Math.sin(frame * 0.02 * node.drift + i * 3) * 12;
        const driftY = Math.cos(frame * 0.018 * node.drift + i * 2) * 10;

        // Dim pulsing — nodes are "searching" for connection
        const searchPulse = 0.3 + Math.sin(frame * 0.08 + i * 1.5) * 0.15;

        const nodeScale = interpolate(nodeSpring, [0, 1], [0.2, 1]);

        return (
          <div
            key={`snode-${i}`}
            style={{
              position: "absolute",
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) scale(${nodeScale})`,
              opacity: nodeSpring * searchPulse,
            }}
          >
            {/* Node circle — dimmer, red-tinted */}
            <div
              style={{
                width: node.size,
                height: node.size,
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(239,68,68,0.15), rgba(239,68,68,0.05))`,
                border: `1px solid rgba(239,68,68,0.25)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 15px rgba(239,68,68,0.1)`,
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: molt.colors.red,
                  opacity: 0.7,
                }}
              />
            </div>
          </div>
        );
      })}

      {/* ── Central "void" indicator — the gap ── */}
      {(() => {
        const voidSpring = spring({
          frame: frame - 25,
          fps,
          config: { damping: 20, stiffness: 100 },
        });
        const voidScale = interpolate(voidSpring, [0, 1], [0.5, 1]);
        const voidPulse = 1 + Math.sin(frame * 0.04) * 0.08;

        return (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) scale(${voidScale * voidPulse})`,
              opacity: voidSpring * 0.2,
              width: 300,
              height: 300,
              borderRadius: "50%",
              border: `2px dashed rgba(239,68,68,0.3)`,
              pointerEvents: "none",
            }}
          >
            {/* Inner dashed ring */}
            <div
              style={{
                position: "absolute",
                inset: 40,
                borderRadius: "50%",
                border: `1px dashed rgba(239,68,68,0.2)`,
              }}
            />
          </div>
        );
      })()}

      {/* ── Warning icons floating around ── */}
      {[
        { x: 28, y: 28, delay: 35 },
        { x: 73, y: 25, delay: 42 },
        { x: 75, y: 70, delay: 48 },
        { x: 25, y: 72, delay: 55 },
      ].map((warn, i) => {
        const warnSpring = spring({
          frame: frame - warn.delay,
          fps,
          config: { damping: 24, stiffness: 130 },
        });
        const warnDrift = Math.sin(frame * 0.03 + i * 2) * 5;
        const warnPulse = 0.4 + Math.sin(frame * 0.1 + i * 1.5) * 0.2;

        return (
          <div
            key={`warn-${i}`}
            style={{
              position: "absolute",
              left: `${warn.x}%`,
              top: `${warn.y}%`,
              transform: `translate(-50%, -50%) translateY(${warnDrift}px)`,
              opacity: warnSpring * warnPulse,
              fontSize: 18,
              fontWeight: 700,
              color: molt.colors.red,
              fontFamily: molt.fonts.mono,
            }}
          >
            ⚠
          </div>
        );
      })}

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 140px",
        }}
      >
        {/* Readability backdrop */}
        <div
          style={{
            position: "absolute",
            width: 800,
            height: 350,
            borderRadius: 40,
            background: `radial-gradient(ellipse, ${molt.colors.bg}E8, ${molt.colors.bg}90, transparent)`,
            pointerEvents: "none",
          }}
        />

        {/* Line 1 */}
        <div
          style={{
            opacity: line1Spring,
            transform: `translateY(${line1Y}px)`,
            textAlign: "center",
            marginBottom: 8,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 500,
              color: molt.colors.textSecondary,
              fontFamily: molt.fonts.body,
              letterSpacing: "-0.01em",
            }}
          >
            But they have
          </div>
        </div>

        {/* Hero phrase */}
        <div
          style={{
            opacity: heroSpring,
            transform: `translateY(${heroY}px) scale(${heroScale})`,
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 90,
              fontWeight: 800,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: molt.colors.text,
            }}
          >
            no way to get{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${molt.colors.red}, #FF6B6B)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              hired
            </span>
          </div>
        </div>

        {/* Horizontal accent line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${molt.colors.red}80, transparent)`,
            marginTop: 36,
            marginBottom: 36,
            position: "relative",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            opacity: subSpring,
            transform: `translateY(${subY}px)`,
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: molt.colors.textMuted,
              fontFamily: molt.fonts.body,
              letterSpacing: "-0.01em",
              lineHeight: 1.5,
            }}
          >
            The old platforms weren't designed for this.
            <br />
            There's never been a marketplace built for AI agents.
          </div>
        </div>
      </div>

      {/* Noise overlay */}
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
