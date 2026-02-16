import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 5 — CRM + Bilingual  (35-42s · 210 frames)
   "Built-in CRM. Everything tracked in one place.
   Works in English and Spanish."

   Clean dashboard card, staggered rows,
   bilingual toggle.
   ────────────────────────────────────────────────── */

export const SceneCRM: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);

  const dashSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const dashScale = interpolate(dashSpring, [0, 1], [0.92, 1]);
  const dashY = interpolate(dashSpring, [0, 1], [40, 0]);

  const row1 = spring({ frame: frame - 28, fps, config: { damping: 14 } });
  const row2 = spring({ frame: frame - 36, fps, config: { damping: 14 } });
  const row3 = spring({ frame: frame - 44, fps, config: { damping: 14 } });
  const row4 = spring({ frame: frame - 52, fps, config: { damping: 14 } });

  // Dashboard overview box
  const overviewSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const overviewY = interpolate(overviewSpring, [0, 1], [40, 0]);

  const featureItems = ["Analytics", "Recordings", "Summaries", "CRM", "Team", "Leads"];
  const featureSprings = featureItems.map((_, i) =>
    spring({ frame: frame - 75 - i * 4, fps, config: { damping: 14 } })
  );

  const barHeights = [45, 70, 55, 85, 60, 90, 50, 75, 65, 80];
  const barSprings = barHeights.map((_, i) =>
    spring({ frame: frame - 70 - i * 2, fps, config: { damping: 12, stiffness: 100 } })
  );

  // Bilingual section
  const bilingualSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 12 },
  });
  const bilingualY = interpolate(bilingualSpring, [0, 1], [40, 0]);
  const isSpanish = frame >= 130;

  // Language toggle animation
  const toggleProgress = interpolate(frame, [128, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOp = interpolate(frame, [185, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rows = [
    { name: "Maria Lopez", status: "Booked", time: "2m ago", color: theme.colors.success, op: row1 },
    { name: "John Davis", status: "Qualified", time: "5m ago", color: theme.colors.primary, op: row2 },
    { name: "Sarah Chen", status: "Follow-up", time: "12m ago", color: theme.colors.orange, op: row3 },
    { name: "Carlos Ruiz", status: "Booked", time: "18m ago", color: theme.colors.success, op: row4 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bgSubtle,
        alignItems: "center",
        opacity: exitOp,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 160,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: theme.colors.primary,
            fontFamily: theme.fonts.body,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Built-in CRM
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            letterSpacing: "-0.03em",
          }}
        >
          Everything tracked.
        </div>
      </div>

      {/* Dashboard card */}
      <div
        style={{
          position: "absolute",
          top: 420,
          opacity: dashSpring,
          transform: `scale(${dashScale}) translateY(${dashY}px)`,
          width: 920,
          background: theme.colors.bgCard,
          borderRadius: theme.radius.xl,
          padding: 32,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: theme.shadows.cardLg,
          zIndex: 1,
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            padding: "12px 20px 18px",
            borderBottom: `1px solid ${theme.colors.border}`,
            gap: 16,
          }}
        >
          {["Customer", "Status", "Time"].map((h) => (
            <div
              key={h}
              style={{
                flex: h === "Customer" ? 1.5 : 1,
                fontSize: 20,
                fontWeight: 700,
                color: theme.colors.textMuted,
                fontFamily: theme.fonts.body,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {rows.map((row, i) => {
          const rowX = interpolate(row.op, [0, 1], [40, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: row.op,
                transform: `translateX(${rowX}px)`,
                display: "flex",
                padding: "20px 20px",
                borderBottom:
                  i < rows.length - 1
                    ? `1px solid ${theme.colors.border}`
                    : "none",
                gap: 16,
              }}
            >
              <div
                style={{
                  flex: 1.5,
                  fontSize: 28,
                  fontWeight: 600,
                  color: theme.colors.text,
                  fontFamily: theme.fonts.body,
                }}
              >
                {row.name}
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: row.color,
                    fontFamily: theme.fonts.body,
                    background: `${row.color}12`,
                    padding: "6px 18px",
                    borderRadius: theme.radius.full,
                  }}
                >
                  {row.status}
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: 24,
                  color: theme.colors.textMuted,
                  fontFamily: theme.fonts.body,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {row.time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dashboard overview box */}
      <div
        style={{
          position: "absolute",
          top: 870,
          opacity: overviewSpring,
          transform: `translateY(${overviewY}px)`,
          textAlign: "center",
          width: 920,
          zIndex: 1,
        }}
      >
        {/* Main overview card */}
        <div
          style={{
            background: theme.colors.bgCard,
            borderRadius: theme.radius.xl,
            padding: 28,
            border: `1px solid ${theme.colors.border}`,
            boxShadow: theme.shadows.cardLg,
          }}
        >
          {/* Top row: CRM + Team mini-cards */}
          <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            {/* CRM mini-card */}
            <div
              style={{
                flex: 1,
                background: theme.colors.bgCardAlt,
                borderRadius: theme.radius.lg,
                padding: 20,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                {/* Purple person icon */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: theme.radius.full,
                    background: `${theme.colors.purple}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" fill={theme.colors.purple} />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill={theme.colors.purple} />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  CRM
                </div>
              </div>

              {/* Progress bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Progress row 1 */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: theme.radius.full,
                      background: theme.colors.primary,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      height: 10,
                      background: theme.colors.border,
                      borderRadius: theme.radius.full,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${overviewSpring * 75}%`,
                        height: "100%",
                        background: theme.colors.success,
                        borderRadius: theme.radius.full,
                      }}
                    />
                  </div>
                </div>
                {/* Progress row 2 */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: theme.radius.full,
                      background: theme.colors.orange,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      height: 10,
                      background: theme.colors.border,
                      borderRadius: theme.radius.full,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${overviewSpring * 55}%`,
                        height: "100%",
                        background: theme.colors.primary,
                        borderRadius: theme.radius.full,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Team mini-card */}
            <div
              style={{
                flex: 1,
                background: theme.colors.bgCardAlt,
                borderRadius: theme.radius.lg,
                padding: 20,
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                {/* Gear icon */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: theme.radius.full,
                    background: `${theme.colors.primary}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                      stroke={theme.colors.primary}
                      strokeWidth="2"
                    />
                    <path
                      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                      stroke={theme.colors.primary}
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: theme.colors.text,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  Team
                </div>
              </div>

              {/* Avatar circles */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {[theme.colors.primary, theme.colors.success, theme.colors.orange].map(
                  (color, i) => (
                    <div
                      key={i}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: theme.radius.full,
                        background: color,
                        border: "3px solid white",
                        marginLeft: i > 0 ? -10 : 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 3 - i,
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="3.5" fill="white" />
                        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" fill="white" />
                      </svg>
                    </div>
                  )
                )}
                <div
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                    fontWeight: 700,
                    color: theme.colors.textSecondary,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  +2
                </div>
              </div>
            </div>
          </div>

          {/* Bar chart */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
              height: 80,
              padding: "0 8px",
            }}
          >
            {barHeights.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: h * barSprings[i],
                  background: `linear-gradient(180deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
                  borderRadius: 6,
                  opacity: 0.7 + barSprings[i] * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Feature checklist grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 14,
            marginTop: 20,
          }}
        >
          {featureItems.map((item, i) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: featureSprings[i],
                transform: `translateY(${interpolate(featureSprings[i], [0, 1], [15, 0])}px)`,
              }}
            >
              {/* Checkmark circle */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: theme.radius.full,
                  background: `${theme.colors.primary}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke={theme.colors.primary}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: theme.colors.text,
                  fontFamily: theme.fonts.body,
                }}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bilingual section */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: bilingualSpring,
          transform: `translateY(${bilingualY}px)`,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            marginBottom: 28,
            letterSpacing: "-0.02em",
          }}
        >
          Works in English & Spanish
        </div>

        {/* Toggle pill */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              background: theme.colors.bgSubtle,
              borderRadius: theme.radius.full,
              padding: 6,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <div
              style={{
                padding: "12px 32px",
                borderRadius: theme.radius.full,
                fontSize: 22,
                fontWeight: 600,
                fontFamily: theme.fonts.body,
                background: !isSpanish ? theme.colors.primary : "transparent",
                color: !isSpanish ? "white" : theme.colors.textSecondary,
              }}
            >
              English
            </div>
            <div
              style={{
                padding: "12px 32px",
                borderRadius: theme.radius.full,
                fontSize: 22,
                fontWeight: 600,
                fontFamily: theme.fonts.body,
                background: isSpanish ? theme.colors.primary : "transparent",
                color: isSpanish ? "white" : theme.colors.textSecondary,
              }}
            >
              Español
            </div>
          </div>
        </div>

        {/* Speech bubble */}
        <div
          style={{
            background: theme.colors.bgCard,
            borderRadius: theme.radius.xl,
            padding: "36px 60px",
            border: `1px solid ${theme.colors.primary}20`,
            boxShadow: theme.shadows.card,
            transform: `scale(${interpolate(toggleProgress, [0, 1], [isSpanish ? 0.95 : 1, isSpanish ? 1 : 0.95])})`,
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: theme.colors.text,
              fontFamily: theme.fonts.body,
              lineHeight: 1.4,
            }}
          >
            {isSpanish
              ? '"Hola, ¿en qué puedo ayudarle?"'
              : '"Hello, how can I help you?"'}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
