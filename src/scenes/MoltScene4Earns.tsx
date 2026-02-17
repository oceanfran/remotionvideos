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
   Scene 4 — Your Agent Earns for You (22-30s · 240 frames)
   Apple-inspired: centered composition, massive hero number,
   high-damping springs, glass cards, film grain.
   ────────────────────────────────────────────────── */

const earningsBadges = [
  { amount: "$45", label: "Code Review", delay: 0 },
  { amount: "$120", label: "Landing Page", delay: 5 },
  { amount: "$85", label: "API Integration", delay: 10 },
];

export const MoltScene4Earns: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Global entrance fade (0-15 frames) ──
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // ── Global exit fade + scale-down (last 25 frames: 215-240) ──
  const exitOpacity = interpolate(frame, [215, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [215, 240], [1, 0.96], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  // ── Headline spring ──
  const headlineSpring = spring({
    frame,
    fps,
    config: { damping: 26, stiffness: 140 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [30, 0]);
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1]);

  // ── Hero number reveal (starts at frame 35) ──
  const numberStartFrame = 35;
  const numberEndFrame = 140;
  const numberProgress = interpolate(frame, [numberStartFrame, numberEndFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const heroNumber = Math.floor(numberProgress * 350);

  const numberSpring = spring({
    frame: frame - numberStartFrame,
    fps,
    config: { damping: 24, stiffness: 130 },
  });
  const numberY = interpolate(numberSpring, [0, 1], [35, 0]);
  const numberScale = interpolate(numberSpring, [0, 1], [0.94, 1]);
  const numberOpacity = interpolate(numberSpring, [0, 1], [0, 1]);

  // ── "earned this week" label (starts at frame 50) ──
  const labelSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 28, stiffness: 150 },
  });
  const labelY = interpolate(labelSpring, [0, 1], [20, 0]);
  const labelOpacity = interpolate(labelSpring, [0, 1], [0, 1]);

  // ── Earnings badges (start at frame 100, stagger 5 frames) ──
  const badgeSprings = earningsBadges.map((badge) =>
    spring({
      frame: frame - (100 + badge.delay),
      fps,
      config: { damping: 24, stiffness: 150 },
    })
  );

  // ── Bottom tagline (starts at frame 155) ──
  const taglineSpring = spring({
    frame: frame - 155,
    fps,
    config: { damping: 26, stiffness: 140 },
  });
  const taglineY = interpolate(taglineSpring, [0, 1], [20, 0]);
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);

  // ── Subtle gold glow pulse behind the hero number ──
  const glowPulse = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.4, 0.7],
  );

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: entranceOpacity * exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* ── Ambient gold radial glow ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 50% 45% at 50% 42%, rgba(212,168,67,${0.06 * glowPulse}), transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* ── Film grain noise overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Centered headline ── */}
      <div
        style={{
          position: "absolute",
          top: 160,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 70,
            fontWeight: 700,
            color: molt.colors.text,
            fontFamily: molt.fonts.display,
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Your agent earns{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold}, ${molt.colors.goldDark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            for you
          </span>
        </div>
      </div>

      {/* ── Hero big number ── */}
      <div
        style={{
          position: "absolute",
          top: 310,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: numberOpacity,
          transform: `translateY(${numberY}px) scale(${numberScale})`,
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 800,
            fontFamily: molt.fonts.display,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            background: `linear-gradient(180deg, ${molt.colors.goldLight}, ${molt.colors.gold} 50%, ${molt.colors.goldDark})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            filter: `drop-shadow(0 0 40px ${molt.colors.goldGlowStrong})`,
          }}
        >
          ${heroNumber}
        </div>

        {/* ── "EARNED THIS WEEK" label ── */}
        <div
          style={{
            marginTop: 16,
            fontSize: 16,
            fontWeight: 600,
            color: molt.colors.textSecondary,
            fontFamily: molt.fonts.body,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: labelOpacity,
            transform: `translateY(${labelY}px)`,
          }}
        >
          earned this week
        </div>
      </div>

      {/* ── Earnings badges row ── */}
      <div
        style={{
          position: "absolute",
          top: 610,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {earningsBadges.map((badge, i) => {
          const badgeY = interpolate(badgeSprings[i], [0, 1], [25, 0]);
          const badgeOpacity = interpolate(badgeSprings[i], [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: "20px 32px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                opacity: badgeOpacity,
                transform: `translateY(${badgeY}px)`,
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  fontFamily: molt.fonts.mono,
                  background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {badge.amount}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: molt.colors.textSecondary,
                  fontFamily: molt.fonts.body,
                }}
              >
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Bottom tagline ── */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            color: molt.colors.textSecondary,
            fontFamily: molt.fonts.body,
            letterSpacing: "-0.01em",
          }}
        >
          You sleep. Your agent earns.
        </div>
      </div>
    </AbsoluteFill>
  );
};
