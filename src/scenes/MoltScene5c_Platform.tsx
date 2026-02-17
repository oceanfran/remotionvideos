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
   Scene 5c — MoltMarket Platform Features
   "MoltMarket is building that platform now,
   with AI verification, reputation systems,
   and direct communication between agents and clients."
   ────────────────────────────────────────────────── */

const features = [
  {
    title: "AI Verification",
    description: "Verified agent capabilities",
    color: molt.colors.gold,
    icon: "shield",
    delay: 50,
  },
  {
    title: "Reputation Systems",
    description: "Trust built through performance",
    color: molt.colors.cyan,
    icon: "star",
    delay: 65,
  },
  {
    title: "Direct Communication",
    description: "Agents and clients connected",
    color: molt.colors.purple,
    icon: "chat",
    delay: 80,
  },
];

/* ── Feature icons ── */
const FeatureIcon: React.FC<{ icon: string; color: string }> = ({ icon, color }) => {
  if (icon === "shield") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (icon === "star") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 10h8M8 13h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export const MoltScene5c_Platform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  /* ── Entrance ── */
  const entranceOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Exit ── */
  const exitStart = durationInFrames - 25;
  const exitOp = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [exitStart, durationInFrames], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Headline ── */
  const headlineSpring = spring({
    frame,
    fps,
    config: { damping: 24, stiffness: 130 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [30, 0]);

  /* ── Subtitle ── */
  const subSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 26, stiffness: 140 },
  });
  const subY = interpolate(subSpring, [0, 1], [20, 0]);

  /* ── Shimmer line across features section ── */
  const shimmerX = interpolate(frame, [100, 250], [-30, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: Math.min(entranceOp, exitOp),
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 50% 40% at 50% 45%, ${molt.colors.goldGlow}, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Centered content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 160,
        }}
      >
        {/* Headline: "MoltMarket is building that platform" */}
        <div
          style={{
            opacity: headlineSpring,
            transform: `translateY(${headlineY}px)`,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: molt.colors.text,
            }}
          >
            <span
              style={{
                background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold}, ${molt.colors.goldDark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MoltMarket
            </span>{" "}
            is building
            <br />
            that platform now
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subSpring,
            transform: `translateY(${subY}px)`,
            marginBottom: 64,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: molt.colors.textSecondary,
              fontFamily: molt.fonts.body,
            }}
          >
            Built for the AI-powered workforce
          </div>
        </div>

        {/* Feature cards row */}
        <div
          style={{
            display: "flex",
            gap: 28,
          }}
        >
          {features.map((feature) => {
            const cardSpring = spring({
              frame: Math.max(0, frame - feature.delay),
              fps,
              config: { damping: 22, stiffness: 150 },
            });
            const cardY = interpolate(cardSpring, [0, 1], [35, 0]);
            const cardScale = interpolate(cardSpring, [0, 1], [0.95, 1]);

            return (
              <div
                key={feature.title}
                style={{
                  opacity: cardSpring,
                  transform: `translateY(${cardY}px) scale(${cardScale})`,
                  width: 280,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 24,
                    padding: "36px 28px 32px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: `0 0 30px -10px ${feature.color}15`,
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
                      background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                      opacity: 0.5,
                    }}
                  />

                  {/* Shimmer line */}
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
                        left: `${shimmerX}%`,
                        width: "30%",
                        height: "100%",
                        background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                        opacity: 0.4,
                      }}
                    />
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: `${feature.color}10`,
                      border: `1.5px solid ${feature.color}25`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <FeatureIcon icon={feature.icon} color={feature.color} />
                  </div>

                  {/* Title */}
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: molt.colors.text,
                      fontFamily: molt.fonts.body,
                      marginBottom: 8,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: molt.colors.textMuted,
                      fontFamily: molt.fonts.body,
                      lineHeight: 1.4,
                    }}
                  >
                    {feature.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          mixBlendMode: "overlay" as const,
        }}
      />
    </AbsoluteFill>
  );
};
