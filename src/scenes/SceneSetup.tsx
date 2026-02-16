import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 7 — Easy Setup + Consultation  (40-48 s · 240 frames)
   Steps animate in with spring, checkmarks appear,
   then consultation CTA. Vertical Apple keynote layout.
   ────────────────────────────────────────────────── */

export const SceneSetup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  // Steps
  const step1 = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 100 } });
  const step2 = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 100 } });
  const step3 = spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 100 } });
  const step4 = spring({ frame: frame - 80, fps, config: { damping: 14, stiffness: 100 } });

  // Big checkmark
  const checkSpring = spring({ frame: frame - 100, fps, config: { damping: 10, stiffness: 120 } });

  // "Under 10 minutes" text
  const textSpring = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const textY = interpolate(textSpring, [0, 1], [30, 0]);

  // Consultation
  const consultSpring = spring({ frame: frame - 155, fps, config: { damping: 14 } });
  const consultY = interpolate(consultSpring, [0, 1], [30, 0]);

  const exitOp = interpolate(frame, [215, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const steps = [
    { label: "Connect your number", op: step1 },
    { label: "Customize your greeting", op: step2 },
    { label: "Set your hours", op: step3 },
    { label: "Go live", op: step4 },
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
          Quick Setup
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
          Do it yourself.
        </div>
      </div>

      {/* Steps */}
      <div
        style={{
          position: "absolute",
          top: 520,
          width: 780,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {steps.map((s, i) => {
          const isComplete = s.op > 0.8;
          const x = interpolate(s.op, [0, 1], [60, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: s.op,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "24px 32px",
                background: isComplete ? `${theme.colors.success}10` : theme.colors.bgCard,
                borderRadius: 20,
                border: `1.5px solid ${isComplete ? theme.colors.success : theme.colors.textTertiary}25`,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: isComplete ? theme.colors.success : theme.colors.bgCardHover,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                {isComplete ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: theme.colors.textSecondary,
                      fontFamily: theme.fonts.mono,
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 600,
                  color: theme.colors.text,
                  fontFamily: theme.fonts.body,
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Big checkmark */}
      <div
        style={{
          position: "absolute",
          top: 1100,
          opacity: checkSpring,
          transform: `scale(${checkSpring})`,
        }}
      >
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill={theme.colors.success} />
          <path d="M16 9l-5 5-2.5-2.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* "Under 10 minutes" */}
      <div
        style={{
          position: "absolute",
          top: 1240,
          opacity: textSpring,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
          }}
        >
          Under{" "}
          <span style={{ color: theme.colors.success }}>10 minutes.</span>
        </div>
      </div>

      {/* Consultation */}
      <div
        style={{
          position: "absolute",
          bottom: 260,
          opacity: consultSpring,
          transform: `translateY(${consultY}px)`,
          background: theme.colors.bgCard,
          borderRadius: 20,
          padding: "28px 44px",
          border: `1px solid ${theme.colors.accent}25`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.body,
          }}
        >
          Or{" "}
          <span style={{ color: theme.colors.accent, fontWeight: 700 }}>
            book a consultation
          </span>
          <br />
          and we'll help you set it up.
        </div>
      </div>
    </AbsoluteFill>
  );
};
