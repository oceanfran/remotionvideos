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
   Scene 7 — CTA  (369 frames, 30fps, 1920×1080)

   Apple-inspired redesign with MM gold coin logo
   and Molt Market brand logo image.
   Centered composition, massive negative space,
   high-damping springs, film grain, pulsing glow,
   clean fade to black.
   ────────────────────────────────────────────────── */

const LOGO_URL = "https://moltmarket.org/assets/molt-marks-logo-C-UQz5ok.png";

/* ── MM Gold Coin Logo ── */
const MMCoinLogo: React.FC<{ size: number; opacity: number }> = ({
  size,
  opacity,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    style={{ opacity }}
  >
    <defs>
      <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E5C466" />
        <stop offset="40%" stopColor="#D4A843" />
        <stop offset="100%" stopColor="#A6832E" />
      </linearGradient>
      <radialGradient id="coinShine" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
        <stop offset="60%" stopColor="rgba(255,255,255,0.05)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E5C466" />
        <stop offset="100%" stopColor="#8A6D24" />
      </linearGradient>
      <filter id="coinShadow">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="12"
          floodColor="rgba(212,168,67,0.4)"
        />
      </filter>
    </defs>
    {/* Outer rim */}
    <circle cx="100" cy="100" r="96" fill="url(#rimGrad)" filter="url(#coinShadow)" />
    {/* Inner face */}
    <circle cx="100" cy="100" r="88" fill="url(#coinGrad)" />
    {/* Shine overlay */}
    <circle cx="100" cy="100" r="88" fill="url(#coinShine)" />
    {/* Inner ring detail */}
    <circle
      cx="100"
      cy="100"
      r="78"
      fill="none"
      stroke="rgba(255,255,255,0.12)"
      strokeWidth="1.5"
    />
    {/* MM text */}
    <text
      x="100"
      y="115"
      textAnchor="middle"
      fontFamily="Inter, system-ui, sans-serif"
      fontWeight="900"
      fontSize="72"
      fill="#0A0A0B"
      letterSpacing="-2"
    >
      MM
    </text>
    {/* Subtle bottom shadow on text for depth */}
    <text
      x="100"
      y="115"
      textAnchor="middle"
      fontFamily="Inter, system-ui, sans-serif"
      fontWeight="900"
      fontSize="72"
      fill="rgba(255,255,255,0.08)"
      letterSpacing="-2"
      dy="-1"
    >
      MM
    </text>
  </svg>
);

export const MoltScene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── High-damping spring factory ──────────────────
  const hd = (delay: number, damping = 25, stiffness = 150) =>
    spring({
      frame: frame - delay,
      fps,
      config: { damping, stiffness },
    });

  // ── Entrance fade (first 15 frames) ─────────────
  const entranceFade = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // ── "That's MoltMarket" bridge text (frames 0-70, more breathing room) ──
  const bridgeOpacity = interpolate(frame, [0, 10, 50, 70], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bridgeScale = interpolate(frame, [0, 10], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Element springs (spaced out for less rushed feel) ──
  const overlineSpring = hd(65, 26, 140);
  const overlineY = interpolate(overlineSpring, [0, 1], [25, 0]);

  // Logo coin entrance
  const logoSpring = hd(80, 24, 160);
  const logoY = interpolate(logoSpring, [0, 1], [30, 0]);
  const logoScale = interpolate(logoSpring, [0, 1], [0.85, 1]);

  // Brand logo image entrance (appears alongside/after coin)
  const brandLogoSpring = hd(90, 24, 150);
  const brandLogoY = interpolate(brandLogoSpring, [0, 1], [20, 0]);
  const brandLogoScale = interpolate(brandLogoSpring, [0, 1], [0.8, 1]);

  // Brand name entrance (after coin)
  const brandSpring = hd(95, 24, 150);
  const brandY = interpolate(brandSpring, [0, 1], [25, 0]);

  // URL typewriter: starts after brand, types 14 chars over ~60 frames (slower)
  const urlText = "moltmarket.org";
  const urlContainerOpacity = interpolate(frame, [125, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlProgress = interpolate(frame, [135, 200], [0, urlText.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visibleUrl = urlText.slice(0, Math.floor(urlProgress));
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;
  const showCursor = frame >= 130 && frame < durationInFrames;

  // Button entrance
  const buttonSpring = hd(200, 22, 130);
  const buttonY = interpolate(buttonSpring, [0, 1], [20, 0]);

  // Tagline entrance
  const taglineSpring = hd(220, 28, 120);
  const taglineY = interpolate(taglineSpring, [0, 1], [20, 0]);

  // ── Pulsing glow behind logo (subtle 0.15 oscillation) ──
  const glowOpacity =
    0.15 + Math.sin(frame * 0.045) * 0.07;
  const glowScale =
    1 + Math.sin(frame * 0.04) * 0.04;

  // ── Button pulsing shadow ───────────────────────
  const btnGlowSpread = 25 + Math.sin(frame * 0.06) * 12;
  const btnGlowOpacity = 0.3 + Math.sin(frame * 0.06) * 0.12;

  // ── Fade to black (last 25 frames) ────
  const fadeStart = durationInFrames - 25;
  const fadeToBlack = interpolate(frame, [fadeStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  // ── Combined content opacity ────────────────────
  const contentOpacity = entranceFade * (1 - fadeToBlack);

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

      {/* ── "That's MoltMarket" bridge text ────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: bridgeOpacity * entranceFade,
          transform: `scale(${bridgeScale})`,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            fontFamily: molt.fonts.display,
            color: molt.colors.text,
            textAlign: "center",
            letterSpacing: "-0.03em",
          }}
        >
          That's{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold}, ${molt.colors.goldDark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MoltMarket
          </span>
        </div>
      </div>

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
            marginBottom: 24,
            opacity: overlineSpring,
            transform: `translateY(${overlineY}px)`,
          }}
        >
          The AI workforce is here.
        </div>

        {/* 2. Molt Market brand logo image */}
        <div
          style={{
            marginBottom: 16,
            opacity: brandLogoSpring,
            transform: `translateY(${brandLogoY}px) scale(${brandLogoScale})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={LOGO_URL}
            alt="Molt Market"
            style={{
              width: 160,
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 20px rgba(212, 168, 67, 0.3))",
            }}
          />
        </div>

        {/* 3. "Molt Market" brand text */}
        <div
          style={{
            opacity: brandSpring,
            transform: `translateY(${brandY}px)`,
            marginBottom: 24,
            display: "flex",
            alignItems: "baseline",
            gap: 0,
          }}
        >
          <span
            style={{
              fontSize: 52,
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
              fontSize: 52,
              fontWeight: 800,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginLeft: 14,
              background: `linear-gradient(135deg, ${molt.colors.goldLight} 0%, ${molt.colors.gold} 50%, ${molt.colors.goldAccent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Market
          </span>
        </div>

        {/* 5. URL typewriter */}
        <div
          style={{
            opacity: urlContainerOpacity,
            marginBottom: 30,
            height: 42,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 32,
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
                fontSize: 32,
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

        {/* 6. "Join Early" pill button */}
        <div
          style={{
            opacity: buttonSpring,
            transform: `translateY(${buttonY}px)`,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              padding: "14px 48px",
              borderRadius: molt.radius.full,
              background: `linear-gradient(135deg, ${molt.colors.goldLight} 0%, ${molt.colors.gold} 60%, ${molt.colors.goldAccent} 100%)`,
              fontSize: 20,
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

        {/* 7. Tagline */}
        <div
          style={{
            fontSize: 20,
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

      {/* ── Film grain noise overlay (lightweight CSS) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      />

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
