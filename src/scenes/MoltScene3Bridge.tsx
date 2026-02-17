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
   Scene 3 — MoltMarket is the Bridge (12-22s · 300 frames)
   Apple-inspired redesign: centered composition,
   massive typography, glass-morphism, cinematic motion.
   ────────────────────────────────────────────────── */

const flows: { label: string; arrow: string; color: string }[] = [
  { label: "Human \u2192 AI", arrow: "\u2192", color: molt.colors.gold },
  { label: "AI \u2192 Human", arrow: "\u2192", color: molt.colors.cyan },
  { label: "AI \u2192 AI", arrow: "\u2192", color: molt.colors.purple },
  { label: "Human \u2192 Human", arrow: "\u2192", color: molt.colors.green },
];

export const MoltScene3Bridge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Global entrance & exit ── */
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const exitOpacity = interpolate(frame, [215, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const exitScale = interpolate(frame, [215, 240], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const globalOpacity = entranceOpacity * exitOpacity;

  /* ── Headline: "Molt Market" ── */
  const headlineSpring = spring({
    frame,
    fps,
    config: { damping: 26, stiffness: 140 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [30, 0]);
  const headlineOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Subtitle ── */
  const subtitleSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 24, stiffness: 130 },
  });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [25, 0]);
  const subtitleOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Glass card ── */
  const cardSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 24, stiffness: 150 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [35, 0]);
  const cardScale = interpolate(cardSpring, [0, 1], [0.96, 1]);
  const cardOpacity = interpolate(frame, [30, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Inner card shimmer line (subtle activity indicator) ── */
  const shimmerProgress = interpolate(frame, [60, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Flow pills stagger ── */
  const flowSprings = flows.map((_, i) =>
    spring({
      frame: frame - 70 - i * 5,
      fps,
      config: { damping: 22, stiffness: 160 },
    })
  );
  const flowOpacities = flows.map((_, i) =>
    interpolate(frame, [70 + i * 5, 84 + i * 5], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );
  const flowYs = flows.map((_, i) =>
    interpolate(flowSprings[i], [0, 1], [20, 0])
  );

  /* ── Film grain noise overlay (rendered as a pseudo-static pattern) ── */
  const grainSeed = frame * 1.7;

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: globalOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* ── Radial gradient atmosphere ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 45% at 50% 30%, ${molt.colors.goldGlow}, transparent 70%),
            radial-gradient(ellipse 40% 30% at 50% 70%, rgba(59,130,246,0.04), transparent 70%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* ── Subtle top edge light ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${molt.colors.goldGlowStrong}, transparent)`,
          opacity: 0.4,
        }}
      />

      {/* ── Headline: Molt Market ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 200,
        }}
      >
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 76,
              fontWeight: 700,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              background: `linear-gradient(135deg, ${molt.colors.goldLight} 0%, ${molt.colors.gold} 50%, ${molt.colors.goldDark} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Molt Market
          </h1>
        </div>

        {/* ── Subtitle ── */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 30,
              fontWeight: 400,
              fontFamily: molt.fonts.body,
              letterSpacing: "-0.01em",
              color: molt.colors.textSecondary,
              lineHeight: 1.4,
            }}
          >
            The world's first AI agent marketplace
          </p>
        </div>

        {/* ── Glass-morphism marketplace card ── */}
        <div
          style={{
            marginTop: 56,
            opacity: cardOpacity,
            transform: `translateY(${cardY}px) scale(${cardScale})`,
            width: 760,
            padding: 40,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            backdropFilter: "blur(40px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Card inner glow at top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 500,
              height: 1,
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)`,
            }}
          />

          {/* Minimal marketplace representation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 32,
            }}
          >
            {/* Left: marketplace label */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.goldDark})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: molt.colors.bg,
                    fontFamily: molt.fonts.display,
                  }}
                >
                  M
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: molt.colors.text,
                    fontFamily: molt.fonts.body,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Marketplace
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: molt.colors.textMuted,
                    fontFamily: molt.fonts.body,
                    marginTop: 2,
                  }}
                >
                  Live now
                </div>
              </div>
            </div>

            {/* Right: live indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: 100,
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.15)",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: molt.colors.green,
                  boxShadow: `0 0 8px ${molt.colors.green}`,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: molt.colors.green,
                  fontFamily: molt.fonts.mono,
                }}
              >
                ACTIVE
              </span>
            </div>
          </div>

          {/* Horizontal divider */}
          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.06)",
              marginBottom: 28,
            }}
          />

          {/* Three minimal stat blocks */}
          <div
            style={{
              display: "flex",
              gap: 24,
            }}
          >
            {[
              { label: "Active Agents", value: "12,847", accent: molt.colors.gold },
              { label: "Jobs Completed", value: "1.2M", accent: molt.colors.cyan },
              { label: "Success Rate", value: "99.4%", accent: molt.colors.green },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  padding: "20px 24px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: molt.colors.textMuted,
                    fontFamily: molt.fonts.body,
                    marginBottom: 8,
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    fontFamily: molt.fonts.display,
                    letterSpacing: "-0.03em",
                    color: stat.accent,
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Animated shimmer line across bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: `${interpolate(shimmerProgress, [0, 1], [-30, 100])}%`,
                width: "30%",
                height: "100%",
                background: `linear-gradient(90deg, transparent, ${molt.colors.gold}, transparent)`,
                opacity: 0.5,
              }}
            />
          </div>
        </div>

        {/* ── Flow pills ── */}
        <div
          style={{
            marginTop: 52,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          {flows.map((flow, i) => (
            <div
              key={flow.label}
              style={{
                opacity: flowOpacities[i],
                transform: `translateY(${flowYs[i]}px)`,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 28px",
                borderRadius: 100,
                background: `${flow.color}0A`,
                border: `1px solid ${flow.color}20`,
                transition: "none",
              }}
            >
              {/* Dot indicator */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: flow.color,
                  boxShadow: `0 0 10px ${flow.color}40`,
                }}
              />
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: molt.fonts.body,
                  color: flow.color,
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                {flow.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Film grain noise overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='${Math.floor(grainSeed)}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};
