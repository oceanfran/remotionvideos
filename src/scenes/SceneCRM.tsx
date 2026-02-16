import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 6 — CRM + Bilingual  (34-40 s · 180 frames)
   Dashboard card springs in with staggered rows,
   then bilingual speech bubble below.
   ────────────────────────────────────────────────── */

export const SceneCRM: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  const dashSpring = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 100 } });
  const dashScale = interpolate(dashSpring, [0, 1], [0.92, 1]);

  const row1 = spring({ frame: frame - 28, fps, config: { damping: 14 } });
  const row2 = spring({ frame: frame - 36, fps, config: { damping: 14 } });
  const row3 = spring({ frame: frame - 44, fps, config: { damping: 14 } });
  const row4 = spring({ frame: frame - 52, fps, config: { damping: 14 } });

  // Bilingual
  const bilingualSpring = spring({ frame: frame - 90, fps, config: { damping: 14 } });
  const bilingualY = interpolate(bilingualSpring, [0, 1], [40, 0]);
  const isSpanish = frame >= 130;

  const exitOp = interpolate(frame, [155, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rows = [
    { name: "Maria Lopez", status: "Booked", time: "2m ago", color: theme.colors.success, op: row1 },
    { name: "John Davis", status: "Qualified", time: "5m ago", color: theme.colors.accent, op: row2 },
    { name: "Sarah Chen", status: "Follow-up", time: "12m ago", color: theme.colors.orange, op: row3 },
    { name: "Carlos Ruiz", status: "Booked", time: "18m ago", color: theme.colors.success, op: row4 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        alignItems: "center",
        opacity: exitOp,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 180,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: theme.colors.accent,
            fontFamily: theme.fonts.body,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Built-in CRM
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            letterSpacing: -1,
          }}
        >
          Every detail, one place.
        </div>
      </div>

      {/* Dashboard */}
      <div
        style={{
          position: "absolute",
          top: 440,
          opacity: dashSpring,
          transform: `scale(${dashScale})`,
          width: 860,
          background: theme.colors.bgCard,
          borderRadius: 24,
          padding: 28,
          border: `1px solid ${theme.colors.textTertiary}25`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            padding: "12px 20px 18px",
            borderBottom: `1px solid ${theme.colors.textTertiary}20`,
            gap: 16,
          }}
        >
          {["Customer", "Status", "Time"].map((h) => (
            <div
              key={h}
              style={{
                flex: h === "Customer" ? 1.5 : 1,
                fontSize: 18,
                fontWeight: 600,
                color: theme.colors.textTertiary,
                fontFamily: theme.fonts.body,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((row, i) => {
          const rowX = interpolate(row.op, [0, 1], [40, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: row.op,
                transform: `translateX(${rowX}px)`,
                display: "flex",
                padding: "18px 20px",
                borderBottom: i < rows.length - 1 ? `1px solid ${theme.colors.textTertiary}12` : "none",
                gap: 16,
              }}
            >
              <div style={{ flex: 1.5, fontSize: 26, fontWeight: 600, color: theme.colors.text, fontFamily: theme.fonts.body }}>
                {row.name}
              </div>
              <div style={{ flex: 1, fontSize: 24, fontWeight: 600, color: row.color, fontFamily: theme.fonts.body }}>
                {row.status}
              </div>
              <div style={{ flex: 1, fontSize: 24, color: theme.colors.textTertiary, fontFamily: theme.fonts.body }}>
                {row.time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bilingual */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          opacity: bilingualSpring,
          transform: `translateY(${bilingualY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            marginBottom: 24,
          }}
        >
          Works in English & Spanish
        </div>

        <div
          style={{
            background: theme.colors.bgCard,
            borderRadius: 24,
            padding: "32px 56px",
            border: `1px solid ${theme.colors.accent}25`,
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: theme.colors.text,
              fontFamily: theme.fonts.body,
              lineHeight: 1.5,
            }}
          >
            {isSpanish
              ? "\"Hola, ¿en qué puedo ayudarle?\""
              : "\"Hello, how can I help you?\""}
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 18,
              fontWeight: 600,
              color: theme.colors.accent,
              fontFamily: theme.fonts.body,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            {isSpanish ? "Español" : "English"}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
