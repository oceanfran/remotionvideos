import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 6 — CRM + Bilingual  (34-40 s · 180 frames)
   Dashboard materialises, then speech bubble switches
   between English and Spanish.
   ────────────────────────────────────────────────── */

export const SceneCRM: React.FC = () => {
  const frame = useCurrentFrame();

  // Title
  const titleOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dashboard
  const dashOp = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dashScale = interpolate(frame, [10, 30], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rows filling in
  const row1Op = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const row2Op = interpolate(frame, [38, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const row3Op = interpolate(frame, [46, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const row4Op = interpolate(frame, [54, 66], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Bilingual section
  const bilingualOp = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Switch language every 30 frames
  const isSpanish = frame >= 130;

  const exitOp = interpolate(frame, [160, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rows = [
    { name: "Maria Lopez", status: "Booked", time: "2 min ago", op: row1Op },
    { name: "John Davis", status: "Qualified", time: "5 min ago", op: row2Op },
    { name: "Sarah Chen", status: "Follow-up", time: "12 min ago", op: row3Op },
    { name: "Carlos Ruiz", status: "Booked", time: "18 min ago", op: row4Op },
  ];

  return (
    <AbsoluteFill style={{ background: theme.colors.bgDark, opacity: exitOp }}>
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          padding: "0 100px",
          gap: 60,
        }}
      >
        {/* Left: Dashboard */}
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ opacity: titleOp }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: theme.colors.accent,
                fontFamily: theme.fonts.body,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Built-in CRM
            </div>
            <div
              style={{
                fontSize: 44,
                fontWeight: 700,
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.heading,
              }}
            >
              Every detail, one place.
            </div>
          </div>

          {/* Dashboard panel */}
          <div
            style={{
              opacity: dashOp,
              transform: `scale(${dashScale})`,
              background: theme.colors.bgCard,
              borderRadius: 20,
              padding: 24,
              border: `1px solid ${theme.colors.primaryLight}20`,
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: "flex",
                padding: "8px 16px 16px",
                borderBottom: `1px solid ${theme.colors.textMuted}20`,
                gap: 16,
              }}
            >
              {["Customer", "Status", "Time"].map((h) => (
                <div
                  key={h}
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: 600,
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                style={{
                  opacity: row.op,
                  display: "flex",
                  padding: "14px 16px",
                  borderBottom:
                    i < rows.length - 1
                      ? `1px solid ${theme.colors.textMuted}10`
                      : "none",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    fontSize: 18,
                    fontWeight: 600,
                    color: theme.colors.textPrimary,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {row.name}
                </div>
                <div
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: 600,
                    color:
                      row.status === "Booked"
                        ? theme.colors.success
                        : row.status === "Qualified"
                          ? theme.colors.accent
                          : theme.colors.warning,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {row.status}
                </div>
                <div
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: theme.colors.textMuted,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {row.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Bilingual feature */}
        <div
          style={{
            flex: 0.8,
            opacity: bilingualOp,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.heading,
              textAlign: "center",
            }}
          >
            Works in English & Spanish
          </div>

          {/* Speech bubble */}
          <div
            style={{
              background: theme.colors.bgCard,
              borderRadius: 24,
              padding: "32px 40px",
              border: `1px solid ${theme.colors.accent}30`,
              position: "relative",
              minWidth: 400,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>💬</div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.body,
                lineHeight: 1.5,
              }}
            >
              {isSpanish
                ? '"Hola, ¿en qué puedo ayudarle?"'
                : '"Hello, how can I help you?"'}
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 14,
                fontWeight: 600,
                color: theme.colors.accent,
                fontFamily: theme.fonts.body,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {isSpanish ? "Español" : "English"}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
