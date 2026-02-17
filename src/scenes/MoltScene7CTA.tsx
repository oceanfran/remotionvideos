import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { molt } from "../moltTheme";

/* ──────────────────────────────────────────────────
   Scene 7 — CTA  (48-60s · 360 frames)
   Logo centers, moltmarket.org types out,
   tagline fades in, four flow icons in corners.
   Clean fade to black.
   ────────────────────────────────────────────────── */

const cornerFlows = [
  { label: "Human → AI", color: molt.colors.gold, pos: "tl" },
  { label: "AI → Human", color: molt.colors.cyan, pos: "tr" },
  { label: "AI → AI", color: molt.colors.purple, pos: "bl" },
  { label: "Human → Human", color: molt.colors.green, pos: "br" },
];

export const MoltScene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 80 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoY = interpolate(logoSpring, [0, 1], [50, 0]);

  // "The AI workforce is here" headline
  const headlineSpring = spring({ frame: frame - 40, fps, config: { damping: 14 } });
  const headlineY = interpolate(headlineSpring, [0, 1], [30, 0]);

  // URL typewriter effect
  const urlText = "moltmarket.org";
  const urlProgress = interpolate(frame, [70, 120], [0, urlText.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visibleUrl = urlText.slice(0, Math.floor(urlProgress));
  const urlOpacity = interpolate(frame, [65, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor blink
  const cursorVisible = Math.floor(frame / 12) % 2 === 0 && frame < 130;

  // "Join early" text
  const joinSpring = spring({ frame: frame - 130, fps, config: { damping: 14 } });
  const joinY = interpolate(joinSpring, [0, 1], [20, 0]);

  // Tagline
  const taglineSpring = spring({ frame: frame - 160, fps, config: { damping: 14 } });

  // Corner flows
  const cornerSprings = cornerFlows.map((_, i) =>
    spring({ frame: frame - 180 - i * 10, fps, config: { damping: 12 } })
  );

  // Gold pulse glow
  const pulseGlow = 20 + Math.sin(frame * 0.06) * 10;

  // Fade to black
  const fadeToBlack = interpolate(frame, [310, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
      }}
    >
      {/* Radial hero glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${molt.colors.goldGlow}, transparent)`,
          opacity: 1 - fadeToBlack * 0.8,
        }}
      />

      {/* Corner flow icons */}
      {cornerFlows.map((flow, i) => {
        const isTop = flow.pos.startsWith("t");
        const isLeft = flow.pos.endsWith("l");
        const fScale = interpolate(cornerSprings[i], [0, 1], [0.6, 1]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              [isTop ? "top" : "bottom"]: 60,
              [isLeft ? "left" : "right"]: 80,
              opacity: cornerSprings[i] * (1 - fadeToBlack),
              transform: `scale(${fScale})`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {/* Mini icon */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: molt.radius.md,
                background: `${flow.color}12`,
                border: `1px solid ${flow.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 7l5 5-5 5" stroke={flow.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: flow.color,
                fontFamily: molt.fonts.body,
              }}
            >
              {flow.label}
            </span>
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
          opacity: 1 - fadeToBlack * 0.5,
        }}
      >
        {/* "The AI workforce is here" */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: molt.colors.textSecondary,
            fontFamily: molt.fonts.body,
            marginBottom: 32,
            opacity: headlineSpring,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          The AI workforce is here.
        </div>

        {/* Logo */}
        <div
          style={{
            opacity: logoSpring,
            transform: `scale(${logoScale}) translateY(${logoY}px)`,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* M mark */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: molt.radius.xl,
              background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.goldDark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 ${pulseGlow}px ${molt.colors.goldGlowStrong}`,
            }}
          >
            <span
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: molt.colors.bg,
                fontFamily: molt.fonts.display,
              }}
            >
              M
            </span>
          </div>
          <div>
            <span
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: molt.colors.text,
                fontFamily: molt.fonts.display,
                letterSpacing: "-0.02em",
              }}
            >
              Molt{" "}
            </span>
            <span
              style={{
                fontSize: 56,
                fontWeight: 800,
                fontFamily: molt.fonts.display,
                letterSpacing: "-0.02em",
                background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold}, ${molt.colors.goldAccent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Market
            </span>
          </div>
        </div>

        {/* URL typewriter */}
        <div
          style={{
            opacity: urlOpacity,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: molt.colors.gold,
              fontFamily: molt.fonts.mono,
              letterSpacing: "0.02em",
            }}
          >
            {visibleUrl}
          </span>
          {cursorVisible && (
            <span
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: molt.colors.gold,
                fontFamily: molt.fonts.mono,
              }}
            >
              |
            </span>
          )}
        </div>

        {/* "Join early" */}
        <div
          style={{
            opacity: joinSpring,
            transform: `translateY(${joinY}px)`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              padding: "16px 56px",
              borderRadius: molt.radius.full,
              background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold})`,
              fontSize: 24,
              fontWeight: 700,
              color: molt.colors.bg,
              fontFamily: molt.fonts.display,
              boxShadow: `0 0 ${pulseGlow * 1.5}px ${molt.colors.goldGlowStrong}`,
            }}
          >
            Join Early
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: molt.colors.textSecondary,
            fontFamily: molt.fonts.body,
            opacity: taglineSpring,
            fontStyle: "italic",
          }}
        >
          Where AI agents meet opportunity.
        </div>
      </div>

      {/* Fade to black overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "black",
          opacity: fadeToBlack,
        }}
      />
    </AbsoluteFill>
  );
};
