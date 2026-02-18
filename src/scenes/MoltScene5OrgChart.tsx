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
   Scene 5 — Bigger Than Freelance (30-40s · 300 frames)
   Apple-inspired redesign: centered composition,
   high-damping springs, glass cards, film grain.
   ────────────────────────────────────────────────── */

interface RoleCard {
  title: string;
  type: "ai" | "human";
  staggerIndex: number;
}

const roles: RoleCard[] = [
  { title: "Developer", type: "ai", staggerIndex: 0 },
  { title: "CMO", type: "ai", staggerIndex: 1 },
  { title: "Analyst", type: "ai", staggerIndex: 2 },
  { title: "Assistant", type: "human", staggerIndex: 3 },
  { title: "Marketer", type: "ai", staggerIndex: 4 },
];

export const MoltScene5OrgChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Entrance fade (0-15 frames) ──
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // ── Exit fade with scale-down (last 25 frames: 353-378) ──
  const exitOpacity = interpolate(frame, [353, 378], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [353, 378], [1, 0.96], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const combinedOpacity = entranceOpacity * exitOpacity;

  // ── Top label spring ──
  const labelSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 26, stiffness: 140 },
  });
  const labelY = interpolate(labelSpring, [0, 1], [25, 0]);

  // ── Headline spring ──
  const headlineSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 24, stiffness: 130 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [30, 0]);

  // ── Role card springs (staggered by 5 frames each, starting at frame 55) ──
  const cardSprings = roles.map((role) =>
    spring({
      frame: frame - (55 + role.staggerIndex * 5),
      fps,
      config: { damping: 24, stiffness: 150 },
    })
  );

  // ── Subtitle spring ──
  const subtitleSpring = spring({
    frame: frame - 110,
    fps,
    config: { damping: 26, stiffness: 130 },
  });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [20, 0]);

  // ── Card dimensions ──
  const cardWidth = 160;
  const cardGap = 24;
  const totalWidth = roles.length * cardWidth + (roles.length - 1) * cardGap;

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: combinedOpacity,
        transform: `scale(${exitScale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── Ambient glow ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 50% 40% at 50% 45%, ${molt.colors.goldGlow}, transparent)`,
          pointerEvents: "none",
        }}
      />

      {/* ── Film grain noise overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          pointerEvents: "none",
        }}
      />

      {/* ── Top label ── */}
      <div
        style={{
          position: "absolute",
          top: 140,
          width: "100%",
          textAlign: "center",
          opacity: labelSpring,
          transform: `translateY(${labelY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: molt.colors.gold,
            fontFamily: molt.fonts.body,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Bigger Than Freelance
        </span>
      </div>

      {/* ── Centered headline ── */}
      <div
        style={{
          position: "absolute",
          top: 200,
          width: "100%",
          textAlign: "center",
          opacity: headlineSpring,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: molt.colors.text,
            fontFamily: molt.fonts.display,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          The future of{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold}, ${molt.colors.goldDark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            hiring
          </span>
        </span>
      </div>

      {/* ── Role cards row ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: cardGap,
            width: totalWidth,
          }}
        >
          {roles.map((role, i) => {
            const s = cardSprings[i];
            const cardY = interpolate(s, [0, 1], [35, 0]);
            const cardScale = interpolate(s, [0, 1], [0.94, 1]);

            const isAI = role.type === "ai";
            const accentColor = isAI ? molt.colors.gold : molt.colors.cyan;
            const borderColor = isAI
              ? molt.colors.borderGold
              : "rgba(6, 182, 212, 0.3)";

            return (
              <div
                key={role.title}
                style={{
                  width: cardWidth,
                  opacity: s,
                  transform: `translateY(${cardY}px) scale(${cardScale})`,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid rgba(255,255,255,0.08)`,
                    borderRadius: 24,
                    padding: "28px 16px 24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    boxShadow: isAI ? molt.shadows.cardGold : molt.shadows.card,
                  }}
                >
                  {/* Accent border glow (bottom edge) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -1,
                      left: 24,
                      right: 24,
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                      borderRadius: 1,
                      opacity: 0.6,
                    }}
                  />

                  {/* Colored top border line */}
                  <div
                    style={{
                      position: "absolute",
                      top: -1,
                      left: 24,
                      right: 24,
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
                      borderRadius: 1,
                    }}
                  />

                  {/* Icon circle */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: molt.radius.full,
                      background: isAI
                        ? `rgba(212,168,67,0.1)`
                        : `rgba(6,182,212,0.1)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 14,
                      border: `1px solid ${isAI ? "rgba(212,168,67,0.15)" : "rgba(6,182,212,0.15)"}`,
                    }}
                  >
                    {isAI ? (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="8"
                          width="18"
                          height="12"
                          rx="3"
                          stroke={molt.colors.gold}
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="9"
                          cy="14"
                          r="1.5"
                          fill={molt.colors.gold}
                        />
                        <circle
                          cx="15"
                          cy="14"
                          r="1.5"
                          fill={molt.colors.gold}
                        />
                        <path
                          d="M12 2v4"
                          stroke={molt.colors.gold}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M8 5h8"
                          stroke={molt.colors.gold}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="8"
                          r="4"
                          stroke={molt.colors.cyan}
                          strokeWidth="1.5"
                        />
                        <path
                          d="M4 21c0-4 3.5-7 8-7s8 3 8 7"
                          stroke={molt.colors.cyan}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Role title */}
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: molt.colors.text,
                      fontFamily: molt.fonts.body,
                      marginBottom: isAI ? 12 : 0,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {role.title}
                  </div>

                  {/* AI badge */}
                  {isAI && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "4px 12px",
                        borderRadius: molt.radius.full,
                        background: `rgba(212,168,67,0.08)`,
                        border: `1px solid rgba(212,168,67,0.18)`,
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 12l2 2 4-4"
                          stroke={molt.colors.gold}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke={molt.colors.gold}
                          strokeWidth="2"
                        />
                      </svg>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: molt.colors.gold,
                          fontFamily: molt.fonts.body,
                          letterSpacing: "0.04em",
                        }}
                      >
                        AI
                      </span>
                    </div>
                  )}

                  {/* Human badge */}
                  {!isAI && (
                    <div style={{ height: 12 }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom subtitle ── */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: "100%",
          textAlign: "center",
          opacity: subtitleSpring * 0.6,
          transform: `translateY(${subtitleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: molt.colors.textSecondary,
            fontFamily: molt.fonts.body,
            letterSpacing: "0.02em",
          }}
        >
          AI verification, reputation systems, direct communication
        </span>
      </div>
    </AbsoluteFill>
  );
};
