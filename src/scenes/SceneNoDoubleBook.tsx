import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 4 — No Double Booking + Reminders  (24-28 s · 120 frames)
   Calendar bounces appointment to next slot, then
   reminder notification appears.
   ────────────────────────────────────────────────── */

export const SceneNoDoubleBook: React.FC = () => {
  const frame = useCurrentFrame();

  // Title
  const titleOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Calendar grid
  const calOp = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Appointment drop + bounce
  const apptDrop = interpolate(frame, [30, 45], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // bounce off booked slot
  const bounceX = interpolate(frame, [45, 55, 65], [0, 30, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bounceY = interpolate(frame, [45, 55, 65], [0, -20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const apptOp = interpolate(frame, [30, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Booked" indicator shake
  const shake =
    frame >= 45 && frame < 55
      ? Math.sin((frame - 45) * 3) * 3
      : 0;

  // Reminder notification (second half)
  const reminderOp = interpolate(frame, [70, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const reminderScale = interpolate(frame, [70, 85], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOp = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slots = [
    { time: "9:00 AM", booked: true },
    { time: "10:00 AM", booked: true },
    { time: "11:00 AM", booked: false },
    { time: "12:00 PM", booked: false },
    { time: "1:00 PM", booked: true },
  ];

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bgDark,
        opacity: exitOp,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          padding: "0 100px",
          gap: 80,
        }}
      >
        {/* Left: Calendar */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              opacity: titleOp,
              fontSize: 40,
              fontWeight: 700,
              color: theme.colors.textPrimary,
              fontFamily: theme.fonts.heading,
              textAlign: "center",
            }}
          >
            Never double-books.
          </div>

          <div
            style={{
              opacity: calOp,
              background: theme.colors.bgCard,
              borderRadius: 20,
              padding: 24,
              width: 500,
              position: "relative",
            }}
          >
            {slots.map((slot, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 20px",
                  borderBottom:
                    i < slots.length - 1
                      ? `1px solid ${theme.colors.textMuted}20`
                      : "none",
                  transform: i === 0 || i === 1 ? `translateX(${shake}px)` : undefined,
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: theme.colors.textSecondary,
                    fontFamily: theme.fonts.mono,
                    width: 100,
                  }}
                >
                  {slot.time}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 36,
                    borderRadius: 8,
                    background: slot.booked
                      ? `${theme.colors.danger}25`
                      : `${theme.colors.success}15`,
                    border: `1px solid ${slot.booked ? theme.colors.danger : theme.colors.success}40`,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 14,
                    fontSize: 14,
                    fontWeight: 600,
                    color: slot.booked
                      ? theme.colors.dangerLight
                      : theme.colors.success,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {slot.booked ? "Booked" : "Available"}
                </div>
              </div>
            ))}

            {/* Dropping appointment block */}
            <div
              style={{
                position: "absolute",
                top: 14 + 63 * 0, // starts at first slot
                left: 140,
                opacity: apptOp,
                transform: `translateY(${apptDrop}px) translateX(${bounceX}px) translateY(${bounceY}px)`,
                background: theme.colors.accent,
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 14,
                fontWeight: 700,
                color: "white",
                fontFamily: theme.fonts.body,
                boxShadow: `0 4px 20px ${theme.colors.accent}40`,
              }}
            >
              New Appointment
            </div>
          </div>
        </div>

        {/* Right: Reminder notification */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              opacity: reminderOp,
              transform: `scale(${reminderScale})`,
              background: theme.colors.bgCard,
              borderRadius: 24,
              padding: "40px 48px",
              border: `1px solid ${theme.colors.accent}30`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              boxShadow: `0 0 60px ${theme.colors.accent}15`,
            }}
          >
            <div style={{ fontSize: 56 }}>🔔</div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.heading,
                textAlign: "center",
              }}
            >
              Reminder Sent
            </div>
            <div
              style={{
                background: `${theme.colors.success}15`,
                border: `1px solid ${theme.colors.success}30`,
                borderRadius: 12,
                padding: "16px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  color: theme.colors.success,
                  fontWeight: 600,
                  fontFamily: theme.fonts.body,
                }}
              >
                Appointment Tomorrow
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.heading,
                  marginTop: 4,
                }}
              >
                10:00 AM
              </div>
            </div>
            <div
              style={{
                fontSize: 16,
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.body,
              }}
            >
              Customers actually show up.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
