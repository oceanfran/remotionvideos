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

      {/* Bilingual section */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
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
