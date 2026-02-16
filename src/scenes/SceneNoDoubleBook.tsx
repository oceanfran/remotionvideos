import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 4 — No Double Booking + Reminders  (24-28 s · 120 frames)
   Calendar card springs in, appointment finds the right
   slot, reminder notification appears below.
   ────────────────────────────────────────────────── */

export const SceneNoDoubleBook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  const calSpring = spring({ frame: frame - 10, fps, config: { damping: 16, stiffness: 100 } });
  const calScale = interpolate(calSpring, [0, 1], [0.9, 1]);

  // Appointment drops + bounces to available slot
  const apptSpring = spring({ frame: frame - 30, fps, config: { damping: 8, stiffness: 120 } });
  const apptY = interpolate(frame, [30, 42], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bounceX = interpolate(frame, [42, 50, 58], [0, 20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Shift down to row index 2 (11:00 AM)
  const slotShift = interpolate(frame, [50, 60], [0, 136], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shake on booked rows
  const shake = frame >= 42 && frame < 52 ? Math.sin((frame - 42) * 3.5) * 4 : 0;

  // Reminder
  const reminderSpring = spring({ frame: frame - 68, fps, config: { damping: 12, stiffness: 100 } });
  const reminderY = interpolate(reminderSpring, [0, 1], [40, 0]);

  const exitOp = interpolate(frame, [100, 120], [1, 0], {
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
        background: theme.colors.bg,
        alignItems: "center",
        opacity: exitOp,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 240,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
          fontSize: 64,
          fontWeight: 700,
          color: theme.colors.text,
          fontFamily: theme.fonts.display,
          textAlign: "center",
          letterSpacing: -1,
        }}
      >
        Never double-books.
      </div>

      {/* Calendar card */}
      <div
        style={{
          position: "absolute",
          top: 420,
          opacity: calSpring,
          transform: `scale(${calScale})`,
          width: 800,
          background: theme.colors.bgCard,
          borderRadius: 28,
          padding: 32,
          border: `1px solid ${theme.colors.textTertiary}30`,
        }}
      >
        {slots.map((slot, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "18px 24px",
              borderBottom: i < slots.length - 1 ? `1px solid ${theme.colors.textTertiary}20` : "none",
              transform: (i === 0 || i === 1) ? `translateX(${shake}px)` : undefined,
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.mono,
                width: 160,
              }}
            >
              {slot.time}
            </div>
            <div
              style={{
                flex: 1,
                height: 48,
                borderRadius: 12,
                background: slot.booked ? `${theme.colors.danger}15` : `${theme.colors.success}10`,
                border: `1.5px solid ${slot.booked ? theme.colors.danger : theme.colors.success}30`,
                display: "flex",
                alignItems: "center",
                paddingLeft: 20,
                fontSize: 22,
                fontWeight: 600,
                color: slot.booked ? theme.colors.danger : theme.colors.success,
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
            top: 32 + 84 * 0,
            left: 210,
            opacity: apptSpring,
            transform: `translateY(${apptY + slotShift}px) translateX(${bounceX}px)`,
            background: theme.colors.accent,
            borderRadius: 14,
            padding: "12px 28px",
            fontSize: 22,
            fontWeight: 700,
            color: "white",
            fontFamily: theme.fonts.body,
            boxShadow: `0 8px 32px ${theme.colors.accent}40`,
          }}
        >
          New Appointment
        </div>
      </div>

      {/* Reminder notification */}
      <div
        style={{
          position: "absolute",
          bottom: 280,
          opacity: reminderSpring,
          transform: `translateY(${reminderY}px)`,
          background: theme.colors.bgCard,
          borderRadius: 24,
          padding: "32px 48px",
          border: `1px solid ${theme.colors.success}25`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          boxShadow: `0 0 60px ${theme.colors.success}10`,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={theme.colors.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.text, fontFamily: theme.fonts.display }}>
          Reminder Sent
        </div>
        <div style={{ fontSize: 22, color: theme.colors.textSecondary, fontFamily: theme.fonts.body }}>
          Customers actually show up.
        </div>
      </div>
    </AbsoluteFill>
  );
};
