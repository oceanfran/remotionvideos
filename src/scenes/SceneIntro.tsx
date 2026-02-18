import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 1 — The Hook  (0-5s · 150 frames)
   "How many calls did your business miss this week?
   Be honest."

   Dramatic entrance: counter ticking up, scattered
   missed-call badges, pulsing phone rings with
   triple ripple waves, floating notification particles,
   dynamic gradient background.
   ────────────────────────────────────────────────── */

/* ─── Floating notification badge ─── */
const NotificationBadge: React.FC<{
  delay: number;
  x: number;
  y: number;
  label: string;
}> = ({ delay, x, y, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const float = frame > delay + 10 ? Math.sin((frame - delay) * 0.06) * 8 : 0;
  const drift = frame > delay + 10 ? Math.cos((frame - delay) * 0.03) * 4 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: enter * 0.9,
        transform: `translate(-50%, -50%) translateY(${float}px) translateX(${drift}px) scale(${interpolate(enter, [0, 1], [0.3, 1])})`,
      }}
    >
      <div
        style={{
          background: "rgba(239, 68, 68, 0.12)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(239, 68, 68, 0.25)",
          borderRadius: theme.radius.full,
          padding: "10px 24px",
          fontSize: 22,
          fontWeight: 700,
          color: theme.colors.danger,
          fontFamily: theme.fonts.body,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
};

/* ─── Pulsing phone ring with triple ripple waves ─── */
const PulseRing: React.FC<{
  delay: number;
  x: number;
  y: number;
  size?: number;
}> = ({ delay, x, y, size = 120 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const ringProgress = Math.max(0, (frame - delay - 8) * 0.05);
  const ring1Scale = 1 + (ringProgress % 1) * 0.8;
  const ring1Op = 1 - (ringProgress % 1);
  const ring2Scale = 1 + ((ringProgress + 0.33) % 1) * 0.8;
  const ring2Op = 1 - ((ringProgress + 0.33) % 1);
  const ring3Scale = 1 + ((ringProgress + 0.66) % 1) * 0.8;
  const ring3Op = 1 - ((ringProgress + 0.66) % 1);

  // Vibrate effect
  const vibrate =
    frame > delay + 5 && frame < delay + 45
      ? Math.sin(frame * 1.2) * 3
      : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${enter}) translateX(${vibrate}px)`,
        opacity: enter,
      }}
    >
      {/* Triple ripple rings */}
      {frame > delay + 8 && (
        <>
          <div
            style={{
              position: "absolute",
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
              borderRadius: "50%",
              border: `2.5px solid ${theme.colors.primary}`,
              opacity: ring1Op * 0.5,
              transform: `scale(${ring1Scale})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
              borderRadius: "50%",
              border: `2px solid ${theme.colors.primary}`,
              opacity: ring2Op * 0.35,
              transform: `scale(${ring2Scale})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
              borderRadius: "50%",
              border: `1.5px solid ${theme.colors.primary}`,
              opacity: ring3Op * 0.2,
              transform: `scale(${ring3Scale})`,
            }}
          />
        </>
      )}

      {/* Phone circle with glow */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `linear-gradient(145deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: `0 8px 40px rgba(0,112,224,0.35), 0 0 ${20 + Math.sin(frame * 0.1) * 10}px rgba(0,112,224,0.2)`,
          position: "relative",
          left: -size / 2,
          top: -size / 2,
        }}
      >
        <svg
          width={size * 0.38}
          height={size * 0.38}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* "Missed" badge with bounce */}
      <div
        style={{
          position: "absolute",
          top: -size / 2 - 20,
          left: size * 0.15,
          background: `linear-gradient(135deg, ${theme.colors.danger}, #DC2626)`,
          borderRadius: theme.radius.full,
          padding: "8px 22px",
          fontSize: 20,
          fontWeight: 700,
          color: "white",
          fontFamily: theme.fonts.body,
          opacity: interpolate(frame - delay, [15, 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${interpolate(frame - delay, [15, 22], [0.3, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })})`,
          boxShadow: "0 4px 20px rgba(239,68,68,0.4)",
        }}
      >
        Missed
      </div>
    </div>
  );
};

/* ─── Animated missed-call counter ─── */
const MissedCounter: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const enterY = interpolate(enter, [0, 1], [40, 0]);

  // Count up from 0 to 47
  const countProgress = interpolate(frame - delay, [10, 60], [0, 47], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const count = Math.floor(countProgress);

  // Pulse on each increment
  const pulse =
    count > 0 && frame > delay + 10
      ? 1 + Math.sin(frame * 0.4) * 0.02
      : 1;

  return (
    <div
      style={{
        position: "absolute",
        top: 140,
        right: 80,
        opacity: enter,
        transform: `translateY(${enterY}px) scale(${pulse})`,
        textAlign: "center",
        zIndex: 2,
      }}
    >
      <div
        style={{
          background: "rgba(239, 68, 68, 0.08)",
          backdropFilter: "blur(16px)",
          borderRadius: theme.radius.xl,
          padding: "24px 36px",
          border: "1px solid rgba(239, 68, 68, 0.15)",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            fontFamily: theme.fonts.display,
            color: theme.colors.danger,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {count}
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.body,
            marginTop: 6,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          missed calls
        </div>
      </div>
    </div>
  );
};

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered title entrance
  const line1Spring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const line1Y = interpolate(line1Spring, [0, 1], [60, 0]);

  const line2Spring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const line2Y = interpolate(line2Spring, [0, 1], [60, 0]);

  const honestSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const honestY = interpolate(honestSpring, [0, 1], [30, 0]);
  const honestScale = interpolate(honestSpring, [0, 1], [0.8, 1]);

  // Background gradient shift
  const bgShift = interpolate(frame, [0, 150], [0, 20], {
    extrapolateRight: "clamp",
  });

  const exitOp = interpolate(frame, [125, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        alignItems: "center",
        opacity: exitOp,
      }}
    >
      {/* Dynamic gradient background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at 50% ${25 + bgShift * 0.3}%, hsl(210, 95%, 96%) 0%, transparent 55%)`,
        }}
      />
      {/* Secondary glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          left: -80,
          bottom: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,112,224,0.06), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Accent glow top-right */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          right: -60,
          top: 100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(239,68,68,0.05), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Title — staggered lines */}
      <div
        style={{
          position: "absolute",
          top: 320,
          textAlign: "center",
          padding: "0 80px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: line1Spring,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              color: theme.colors.text,
              fontFamily: theme.fonts.display,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            How many calls
            <br />
            did your business
          </div>
        </div>
        <div
          style={{
            opacity: line2Spring,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              fontFamily: theme.fonts.display,
              marginTop: 12,
              letterSpacing: "-0.03em",
              background: theme.colors.gradientText,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            miss this week?
          </div>
        </div>
      </div>

      {/* "Be honest." — with emphasis */}
      <div
        style={{
          position: "absolute",
          top: 740,
          opacity: honestSpring,
          transform: `translateY(${honestY}px) scale(${honestScale})`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            fontFamily: theme.fonts.body,
            letterSpacing: "-0.01em",
            fontStyle: "italic",
            background: `linear-gradient(135deg, ${theme.colors.textSecondary}, ${theme.colors.text})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Be honest.
        </div>
      </div>

      {/* Subtle divider line */}
      <div
        style={{
          position: "absolute",
          top: 810,
          width: 60,
          height: 3,
          borderRadius: 2,
          background: theme.colors.primary,
          opacity: interpolate(frame, [25, 35], [0, 0.4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          zIndex: 2,
        }}
      />

      {/* Missed call counter badge */}
      <MissedCounter delay={12} />

      {/* Phone pulse rings — scattered with variety */}
      <PulseRing delay={6} x={220} y={1020} size={110} />
      <PulseRing delay={18} x={540} y={1200} size={130} />
      <PulseRing delay={32} x={860} y={1050} size={100} />
      <PulseRing delay={45} x={380} y={1400} size={90} />

      {/* Floating notification badges */}
      <NotificationBadge delay={20} x={180} y={900} label="3 missed" />
      <NotificationBadge delay={35} x={780} y={920} label="Voicemail full" />
      <NotificationBadge delay={50} x={500} y={1500} label="No answer" />
      <NotificationBadge delay={60} x={850} y={1380} label="Hung up" />
    </AbsoluteFill>
  );
};
