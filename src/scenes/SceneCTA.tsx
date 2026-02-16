import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

/* ──────────────────────────────────────────────────
   Scene 8 — The CTA  (48-60 s · 360 frames)
   Logo springs in, "Crecimos.com" types out,
   tagline holds, fade to black. Apple keynote outro.
   ────────────────────────────────────────────────── */

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance — spring scale from 0 → 1, then gentle float
  const logoSpring = spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 80 } });
  const logoFloat = Math.sin(frame * 0.04) * 6;

  // "Sign up today" fades in
  const signUpSpring = spring({ frame: frame - 30, fps, config: { damping: 15 } });
  const signUpY = interpolate(signUpSpring, [0, 1], [30, 0]);

  // URL typing effect — "Crecimos.com" with capital C
  const url = "Crecimos.com";
  const typedLength = Math.min(
    url.length,
    Math.floor(
      interpolate(frame, [60, 100], [0, url.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
  const urlOp = interpolate(frame, [55, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor blink
  const cursorOp = frame >= 60 && frame < 140 ? (Math.floor(frame / 8) % 2 === 0 ? 1 : 0) : 0;

  // Subtitle
  const subSpring = spring({ frame: frame - 120, fps, config: { damping: 15 } });
  const subY = interpolate(subSpring, [0, 1], [30, 0]);

  // Final tagline
  const tagSpring = spring({ frame: frame - 190, fps, config: { damping: 12, stiffness: 80 } });
  const tagScale = interpolate(tagSpring, [0, 1], [0.85, 1]);

  // Fade to black
  const fadeOut = interpolate(frame, [320, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: theme.colors.bg }}>
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          left: "50%",
          top: "35%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}10, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 36,
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoSpring,
            transform: `scale(${logoSpring}) translateY(${logoFloat}px)`,
            marginBottom: 20,
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{
              width: 220,
              height: 220,
              objectFit: "contain",
            }}
          />
        </div>

        {/* Sign up today */}
        <div
          style={{
            opacity: signUpSpring,
            transform: `translateY(${signUpY}px)`,
            fontSize: 40,
            fontWeight: 600,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.display,
          }}
        >
          Sign up today.
        </div>

        {/* Crecimos.com — typed */}
        <div
          style={{
            opacity: urlOp,
            fontSize: 96,
            fontWeight: 800,
            fontFamily: theme.fonts.display,
            background: theme.colors.gradientAccent,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {url.slice(0, typedLength)}
          <span
            style={{
              display: "inline-block",
              width: 5,
              height: 88,
              background: theme.colors.accent,
              marginLeft: 4,
              opacity: cursorOp,
              borderRadius: 3,
            }}
          />
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subSpring,
            transform: `translateY(${subY}px)`,
            fontSize: 32,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.body,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          Your AI receptionist is
          <br />
          10 minutes away.
        </div>

        {/* Final tagline */}
        <div
          style={{
            opacity: tagSpring,
            transform: `scale(${tagScale})`,
            marginTop: 48,
            fontSize: 56,
            fontWeight: 800,
            color: theme.colors.text,
            fontFamily: theme.fonts.display,
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          Never miss
          <br />
          another call.
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
