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
   Scene 7 — CTA  (48-60s · 360 frames, 30fps, 1920×1080)

   Apple-inspired redesign.
   Centered composition, massive negative space,
   high-damping springs, film grain, pulsing glow,
   clean fade to black.  No corner icons.
   ────────────────────────────────────────────────── */

// Deterministic film grain: seeded pseudo-random via simple hash
const grain = (x: number, y: number, f: number): number => {
  const n = Math.sin(x * 12.9898 + y * 78.233 + f * 43.1234) * 43758.5453;
  return n - Math.floor(n);
};

export const MoltScene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── High-damping spring factory ──────────────────
  const hd = (delay: number, damping = 25, stiffness = 150) =>
    spring({
      frame: frame - delay,
      fps,
      config: { damping, stiffness },
    });

  // ── Entrance fade (first 30 frames) ─────────────
  const entranceFade = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // ── Element springs ─────────────────────────────
  const overlineSpring = hd(20, 26, 140);
  const overlineY = interpolate(overlineSpring, [0, 1], [25, 0]);

  const logoSpring = hd(40, 24, 160);
  const logoY = interpolate(logoSpring, [0, 1], [30, 0]);

  // URL typewriter: starts at frame 80, types 14 chars over ~50 frames
  const urlText = "moltmarket.org";
  const urlContainerOpacity = interpolate(frame, [75, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlProgress = interpolate(frame, [85, 135], [0, urlText.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visibleUrl = urlText.slice(0, Math.floor(urlProgress));
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;
  const showCursor = frame >= 80 && frame < 180;

  // Button entrance
  const buttonSpring = hd(150, 22, 130);
  const buttonY = interpolate(buttonSpring, [0, 1], [20, 0]);

  // Tagline entrance
  const taglineSpring = hd(185, 28, 120);
  const taglineY = interpolate(taglineSpring, [0, 1], [20, 0]);

  // ── Pulsing glow behind logo (subtle 0.15 oscillation) ──
  const glowOpacity =
    0.15 + Math.sin(frame * 0.045) * 0.07;
  const glowScale =
    1 + Math.sin(frame * 0.04) * 0.04;

  // ── Button pulsing shadow ───────────────────────
  const btnGlowSpread = 25 + Math.sin(frame * 0.06) * 12;
  const btnGlowOpacity = 0.3 + Math.sin(frame * 0.06) * 0.12;

  // ── Fade to black (last 50 frames: 310-360) ────
  const fadeToBlack = interpolate(frame, [310, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  // ── Combined content opacity ────────────────────
  const contentOpacity = entranceFade * (1 - fadeToBlack);

  // ── Film grain canvas dimensions ────────────────
  const grainSize = 4;
  const grainCols = Math.ceil(1920 / grainSize);
  const grainRows = Math.ceil(1080 / grainSize);

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        overflow: "hidden",
      }}
    >
      {/* ── Pulsing radial glow behind logo ────────── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 600,
          height: 600,
          transform: `translate(-50%, -58%) scale(${glowScale})`,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${molt.colors.goldGlowStrong} 0%, ${molt.colors.goldGlow} 35%, transparent 70%)`,
          opacity: glowOpacity * contentOpacity,
          pointerEvents: "none",
        }}
      />

      {/* ── Centered content stack ─────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          opacity: contentOpacity,
        }}
      >
        {/* 1. Overline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: molt.colors.textSecondary,
            fontFamily: molt.fonts.body,
            letterSpacing: "0.01em",
            marginBottom: 40,
            opacity: overlineSpring,
            transform: `translateY(${overlineY}px)`,
          }}
        >
          The AI workforce is here.
        </div>

        {/* 2. "Molt Market" text logo */}
        <div
          style={{
            opacity: logoSpring,
            transform: `translateY(${logoY}px)`,
            marginBottom: 36,
            display: "flex",
            alignItems: "baseline",
            gap: 0,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: molt.colors.text,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Molt
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginLeft: 16,
              background: `linear-gradient(135deg, ${molt.colors.goldLight} 0%, ${molt.colors.gold} 50%, ${molt.colors.goldAccent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Market
          </span>
        </div>

        {/* 3. URL typewriter */}
        <div
          style={{
            opacity: urlContainerOpacity,
            marginBottom: 44,
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: molt.colors.gold,
              fontFamily: molt.fonts.mono,
              letterSpacing: "0.02em",
            }}
          >
            {visibleUrl}
          </span>
          {showCursor && cursorVisible && (
            <span
              style={{
                fontSize: 40,
                fontWeight: 400,
                color: molt.colors.gold,
                fontFamily: molt.fonts.mono,
                opacity: 0.85,
                marginLeft: 1,
              }}
            >
              |
            </span>
          )}
        </div>

        {/* 4. "Join Early" pill button */}
        <div
          style={{
            opacity: buttonSpring,
            transform: `translateY(${buttonY}px)`,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              padding: "18px 64px",
              borderRadius: molt.radius.full,
              background: `linear-gradient(135deg, ${molt.colors.goldLight} 0%, ${molt.colors.gold} 60%, ${molt.colors.goldAccent} 100%)`,
              fontSize: 24,
              fontWeight: 700,
              color: molt.colors.bg,
              fontFamily: molt.fonts.display,
              letterSpacing: "0.01em",
              boxShadow: `0 0 ${btnGlowSpread}px rgba(212, 168, 67, ${btnGlowOpacity}), 0 4px 16px rgba(0, 0, 0, 0.3)`,
              cursor: "pointer",
            }}
          >
            Join Early
          </div>
        </div>

        {/* 5. Tagline */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: molt.colors.textSecondary,
            fontFamily: molt.fonts.body,
            fontStyle: "italic",
            letterSpacing: "0.005em",
            opacity: taglineSpring,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Where AI agents meet opportunity.
        </div>
      </div>

      {/* ── Film grain noise overlay ───────────────── */}
      <svg
        width="1920"
        height="1080"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      >
        {Array.from({ length: grainRows }, (_, row) =>
          Array.from({ length: grainCols }, (_, col) => {
            const brightness = grain(col, row, frame);
            if (brightness < 0.3 || brightness > 0.7) return null;
            const g = Math.floor(brightness * 255);
            return (
              <rect
                key={`${row}-${col}`}
                x={col * grainSize}
                y={row * grainSize}
                width={grainSize}
                height={grainSize}
                fill={`rgb(${g},${g},${g})`}
              />
            );
          })
        )}
      </svg>

      {/* ── Fade to black overlay ──────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000000",
          opacity: fadeToBlack,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
