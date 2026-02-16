import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 7 — Easy Setup + Consultation  (40-48 s · 240 frames)
   Laptop wizard steps animate, green checkmark,
   then "book a consultation" option.
   ────────────────────────────────────────────────── */

export const SceneSetup: React.FC = () => {
  const frame = useCurrentFrame();

  // Laptop appears
  const laptopOp = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const laptopScale = interpolate(frame, [5, 20], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Wizard steps
  const step1 = interpolate(frame, [25, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const step2 = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const step3 = interpolate(frame, [75, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const step4 = interpolate(frame, [100, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Green checkmark
  const checkOp = interpolate(frame, [120, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const checkScale = interpolate(frame, [120, 135], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Bounce
  const checkBounce = interpolate(frame, [130, 140, 145], [1, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text overlay
  const textOp = interpolate(frame, [140, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Consultation option
  const consultOp = interpolate(frame, [170, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const consultY = interpolate(frame, [170, 185], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOp = interpolate(frame, [220, 240], [1, 0], {
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
        background: theme.colors.bgDark,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOp,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
        }}
      >
        {/* Laptop */}
        <div
          style={{
            opacity: laptopOp,
            transform: `scale(${laptopScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Screen */}
          <div
            style={{
              width: 700,
              height: 420,
              background: theme.colors.bgCard,
              borderRadius: "16px 16px 0 0",
              border: `2px solid ${theme.colors.primaryLight}20`,
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              position: "relative",
            }}
          >
            {/* Title bar */}
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: theme.colors.danger }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: theme.colors.warning }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: theme.colors.success }} />
            </div>

            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.heading,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Quick Setup
            </div>

            {/* Steps */}
            {steps.map((s, i) => {
              const isComplete = s.op >= 0.9;
              return (
                <div
                  key={i}
                  style={{
                    opacity: s.op,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "12px 20px",
                    background: isComplete ? `${theme.colors.success}15` : `${theme.colors.textMuted}10`,
                    borderRadius: 12,
                    border: `1px solid ${isComplete ? theme.colors.success : theme.colors.textMuted}30`,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isComplete ? theme.colors.success : theme.colors.bgMid,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "white",
                      fontFamily: theme.fonts.mono,
                    }}
                  >
                    {isComplete ? "✓" : i + 1}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: theme.colors.textPrimary,
                      fontFamily: theme.fonts.body,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              );
            })}

            {/* Big green checkmark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: checkOp,
                background: `${theme.colors.bgDark}D0`,
                borderRadius: 16,
              }}
            >
              <div
                style={{
                  transform: `scale(${checkScale * checkBounce})`,
                  fontSize: 100,
                }}
              >
                ✅
              </div>
            </div>
          </div>

          {/* Laptop base */}
          <div
            style={{
              width: 780,
              height: 20,
              background: theme.colors.bgCard,
              borderRadius: "0 0 8px 8px",
              border: `1px solid ${theme.colors.primaryLight}15`,
              borderTop: "none",
            }}
          />
        </div>

        {/* Text overlay */}
        <div
          style={{
            opacity: textOp,
            fontSize: 36,
            fontWeight: 700,
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.heading,
            textAlign: "center",
          }}
        >
          Set it up yourself in{" "}
          <span style={{ color: theme.colors.success }}>under 10 minutes.</span>
        </div>

        {/* Consultation option */}
        <div
          style={{
            opacity: consultOp,
            transform: `translateY(${consultY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: theme.colors.bgCard,
            borderRadius: 16,
            padding: "18px 32px",
            border: `1px solid ${theme.colors.accent}30`,
          }}
        >
          <div style={{ fontSize: 28 }}>📅</div>
          <div
            style={{
              fontSize: 20,
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.body,
            }}
          >
            Or{" "}
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>
              book a consultation
            </span>{" "}
            and we'll help you set it up.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
