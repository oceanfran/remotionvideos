import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 8 — The CTA  (48-60 s · 360 frames)
   crecimos.com types itself, taglines animate in,
   final "Never miss another call.", fade to black.
   ────────────────────────────────────────────────── */

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();

  // "Sign up today" fades in
  const signUpOp = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const signUpY = interpolate(frame, [10, 30], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL typing effect
  const url = "crecimos.com";
  const typedLength = Math.min(
    url.length,
    Math.floor(
      interpolate(frame, [40, 80], [0, url.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
  const urlOp = interpolate(frame, [35, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor blink
  const cursorOp = frame >= 40 && frame < 120 ? (Math.floor(frame / 8) % 2 === 0 ? 1 : 0) : 0;

  // Subtitle
  const subOp = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [100, 120], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final tagline — hold for 4 seconds starting at frame 180
  const tagOp = interpolate(frame, [180, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagScale = interpolate(frame, [180, 200], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade to black
  const fadeOut = interpolate(frame, [320, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: theme.colors.bgDark }}>
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.primary}15, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 28,
          zIndex: 1,
        }}
      >
        {/* Sign up today */}
        <div
          style={{
            opacity: signUpOp,
            transform: `translateY(${signUpY}px)`,
            fontSize: 36,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.heading,
          }}
        >
          Sign up today.
        </div>

        {/* crecimos.com — typed */}
        <div
          style={{
            opacity: urlOp,
            fontSize: 88,
            fontWeight: 800,
            fontFamily: theme.fonts.heading,
            background: theme.colors.gradientPrimary,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {url.slice(0, typedLength)}
          <span
            style={{
              display: "inline-block",
              width: 4,
              height: 80,
              background: theme.colors.accent,
              marginLeft: 4,
              opacity: cursorOp,
              borderRadius: 2,
            }}
          />
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subOp,
            transform: `translateY(${subY}px)`,
            fontSize: 28,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.body,
            textAlign: "center",
          }}
        >
          Your AI receptionist is 10 minutes away.
        </div>

        {/* Final tagline */}
        <div
          style={{
            opacity: tagOp,
            transform: `scale(${tagScale})`,
            marginTop: 40,
            fontSize: 48,
            fontWeight: 800,
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.heading,
            textAlign: "center",
          }}
        >
          Never miss another call.
        </div>
      </div>

      {/* Fade to black overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "black",
          opacity: fadeOut,
          zIndex: 10,
        }}
      />
    </AbsoluteFill>
  );
};
