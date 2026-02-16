import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 6 — Easy Setup  (42-49s · 210 frames)
   "You can do it yourself in under 10 minutes.
   Or book a consultation and we'll help you set it up."

   Steps check off, big "10 minutes" number,
   consultation CTA button.
   ────────────────────────────────────────────────── */

export const SceneSetup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);

  const step1 = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 90 } });
  const step2 = spring({ frame: frame - 35, fps, config: { damping: 12, stiffness: 90 } });
  const step3 = spring({ frame: frame - 50, fps, config: { damping: 12, stiffness: 90 } });
  const step4 = spring({ frame: frame - 65, fps, config: { damping: 12, stiffness: 90 } });

  // "Under 10 minutes" — big number reveal
  const numberSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const numberScale = interpolate(numberSpring, [0, 1], [0.5, 1]);

  // Consultation CTA
  const consultSpring = spring({
    frame: frame - 130,
    fps,
    config: { damping: 14 },
  });
  const consultY = interpolate(consultSpring, [0, 1], [30, 0]);

  const exitOp = interpolate(frame, [185, 210], [1, 0], {
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
          top: 200,
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
          Quick Setup
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
          Do it yourself.
        </div>
      </div>

      {/* Steps */}
      <div
        style={{
          position: "absolute",
          top: 480,
          width: 840,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 1,
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
                padding: "26px 36px",
                background: isComplete
                  ? `${theme.colors.success}08`
                  : theme.colors.bgCard,
                borderRadius: theme.radius.lg,
                border: `1.5px solid ${isComplete ? `${theme.colors.success}30` : theme.colors.border}`,
                boxShadow: isComplete ? "none" : theme.shadows.card,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: isComplete
                    ? theme.colors.success
                    : theme.colors.bgSubtle,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0,
                  border: isComplete
                    ? "none"
                    : `2px solid ${theme.colors.border}`,
                }}
              >
                {isComplete ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: theme.colors.textMuted,
                      fontFamily: theme.fonts.mono,
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  color: theme.colors.text,
                  fontFamily: theme.fonts.body,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Big "10 minutes" */}
      <div
        style={{
          position: "absolute",
          top: 1060,
          opacity: numberSpring,
          transform: `scale(${numberScale})`,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            fontFamily: theme.fonts.display,
            letterSpacing: "-0.05em",
            background: theme.colors.gradientText,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}
        >
          10
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.body,
            marginTop: 8,
          }}
        >
          minutes to set up
        </div>
      </div>

      {/* Consultation CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          opacity: consultSpring,
          transform: `translateY(${consultY}px)`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: theme.colors.gradientButton,
            borderRadius: theme.radius.full,
            padding: "28px 60px",
            boxShadow: "0 8px 32px rgba(0,112,224,0.25)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "white",
              fontFamily: theme.fonts.body,
            }}
          >
            Or book a consultation
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.8)",
              fontFamily: theme.fonts.body,
              marginTop: 6,
            }}
          >
            We'll help you set it up
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
