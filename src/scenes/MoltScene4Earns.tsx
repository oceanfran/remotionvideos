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
   Scene 4 — Your Agent Earns for You (20-28s · 240 frames)
   Apple-inspired: centered composition, massive hero number,
   high-damping springs, glass cards, film grain.
   ────────────────────────────────────────────────── */

const earningsBadges = [
  { amount: "$350", label: "Content Creation", delay: 0 },
  { amount: "$280", label: "Landing Page", delay: 4 },
  { amount: "$250", label: "Automation", delay: 8 },
  { amount: "$220", label: "Post Scheduling", delay: 12 },
  { amount: "$275", label: "API Integration", delay: 16 },
  { amount: "$195", label: "Scraping Content", delay: 20 },
  { amount: "$180", label: "Code Review", delay: 24 },
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

  // ── Global exit fade + scale-down (last 25 frames: 359-384) ──
  const exitOpacity = interpolate(frame, [359, 384], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [359, 384], [1, 0.96], {
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

  // ── Hero number reveal (starts at frame 30) ──
  const numberStartFrame = 30;
  const numberEndFrame = 120;
  const numberProgress = interpolate(frame, [numberStartFrame, numberEndFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const heroNumber = Math.floor(numberProgress * 1750);
  const formattedNumber = heroNumber.toLocaleString("en-US");

  const numberSpring = spring({
    frame: frame - numberStartFrame,
    fps,
    config: { damping: 24, stiffness: 130 },
  });
  const numberY = interpolate(numberSpring, [0, 1], [35, 0]);
  const numberScale = interpolate(numberSpring, [0, 1], [0.94, 1]);
  const numberOpacity = interpolate(numberSpring, [0, 1], [0, 1]);

  // ── "earned this week" label (starts at frame 45) ──
  const labelSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 28, stiffness: 150 },
  });
  const labelY = interpolate(labelSpring, [0, 1], [20, 0]);
  const labelOpacity = interpolate(labelSpring, [0, 1], [0, 1]);

  // ── Earnings badges — row 1 starts at frame 80, row 2 at frame 95 ──
  const row1Badges = earningsBadges.slice(0, 4);
  const row2Badges = earningsBadges.slice(4);

  const row1Springs = row1Badges.map((badge) =>
    spring({
      frame: frame - (80 + badge.delay),
      fps,
      config: { damping: 24, stiffness: 150 },
    })
  );

  const row2Springs = row2Badges.map((badge) =>
    spring({
      frame: frame - (95 + badge.delay),
      fps,
      config: { damping: 24, stiffness: 150 },
    })
  );

  // ── Bottom tagline (starts at frame 145) ──
  const taglineSpring = spring({
    frame: frame - 145,
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
          top: 110,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 64,
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
          top: 240,
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
            fontSize: 120,
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
          ${formattedNumber}
        </div>

        {/* ── "EARNED THIS WEEK" label ── */}
        <div
          style={{
            marginTop: 12,
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

      {/* ── Earnings badges — Row 1 ── */}
      <div
        style={{
          position: "absolute",
          top: 520,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {row1Badges.map((badge, i) => {
          const badgeY = interpolate(row1Springs[i], [0, 1], [25, 0]);
          const badgeOpacity = interpolate(row1Springs[i], [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                opacity: badgeOpacity,
                transform: `translateY(${badgeY}px)`,
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                style={{
                  fontSize: 22,
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
                  fontSize: 16,
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

      {/* ── Earnings badges — Row 2 ── */}
      <div
        style={{
          position: "absolute",
          top: 600,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {row2Badges.map((badge, i) => {
          const badgeY = interpolate(row2Springs[i], [0, 1], [25, 0]);
          const badgeOpacity = interpolate(row2Springs[i], [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                opacity: badgeOpacity,
                transform: `translateY(${badgeY}px)`,
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                style={{
                  fontSize: 22,
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
                  fontSize: 16,
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
          bottom: 90,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 28,
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
