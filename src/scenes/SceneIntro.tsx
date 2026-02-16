import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 1 — The Hook  (0-6 s · 180 frames)
   Large text fades in with spring, three phone
   outlines ring and show "Missed" — Apple keynote style.
   ────────────────────────────────────────────────── */

const PhoneOutline: React.FC<{
  delay: number;
  missDelay: number;
  label: string;
  y: number;
}> = ({ delay, missDelay, label, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120 } });
  const missed = spring({ frame: frame - missDelay, fps, config: { damping: 12, stiffness: 100 } });

  // Ringing vibration
  const isRinging = frame >= delay && frame < missDelay;
  const vibrate = isRinging ? Math.sin((frame - delay) * 2.2) * 6 : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: "50%",
        transform: `translateX(-50%) translateX(${vibrate}px) scale(${enter})`,
        opacity: enter,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: 200,
          height: 120,
          borderRadius: 28,
          border: `3px solid ${isRinging ? theme.colors.accent : theme.colors.textTertiary}`,
          background: isRinging ? `${theme.colors.accent}08` : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          position: "relative",
        }}
      >
        {/* Phone icon */}
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
            stroke={isRinging ? theme.colors.accent : theme.colors.textTertiary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: isRinging ? theme.colors.accent : theme.colors.textSecondary,
            fontFamily: theme.fonts.body,
          }}
        >
          {label}
        </div>

        {/* Missed badge */}
        <div
          style={{
            position: "absolute",
            top: -16,
            right: -16,
            transform: `scale(${missed})`,
            opacity: missed,
            background: theme.colors.danger,
            borderRadius: 20,
            padding: "8px 20px",
            fontSize: 18,
            fontWeight: 700,
            color: "white",
            fontFamily: theme.fonts.body,
            whiteSpace: "nowrap",
          }}
        >
          Missed
        </div>
      </div>
    </div>
  );
};

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);

  const exitOp = interpolate(frame, [155, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Counter
  const missedCount = frame < 50 ? 0 : frame < 85 ? 1 : frame < 120 ? 2 : 3;
  const counterSpring = spring({
    frame: frame - (missedCount === 1 ? 50 : missedCount === 2 ? 85 : 120),
    fps,
    config: { damping: 12 },
  });

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
          top: 280,
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          How many calls
          <br />
          did your business
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: theme.colors.danger,
            fontFamily: theme.fonts.display,
            marginTop: 8,
            letterSpacing: -1,
          }}
        >
          miss this week?
        </div>
      </div>

      {/* Three phones stacked vertically */}
      <PhoneOutline delay={15} missDelay={50} label="Office" y={780} />
      <PhoneOutline delay={50} missDelay={85} label="Front Desk" y={940} />
      <PhoneOutline delay={85} missDelay={120} label="Mobile" y={1100} />

      {/* Missed counter */}
      {missedCount > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 340,
            transform: `scale(${Math.min(counterSpring, 1)})`,
            opacity: Math.min(counterSpring, 1),
            background: `${theme.colors.danger}15`,
            border: `2px solid ${theme.colors.danger}40`,
            borderRadius: 24,
            padding: "18px 48px",
            fontSize: 32,
            fontWeight: 700,
            color: theme.colors.danger,
            fontFamily: theme.fonts.display,
          }}
        >
          {missedCount} Missed Call{missedCount > 1 ? "s" : ""}
        </div>
      )}
    </AbsoluteFill>
  );
};
