import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { GlowOrb } from "../components/GlowOrb";

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();

  // Logo text animation
  const logoOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = interpolate(frame, [20, 50], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoLetterSpacing = interpolate(frame, [20, 60], [30, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [55, 75], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gradient line under logo
  const lineWidth = interpolate(frame, [45, 70], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit animation
  const exitOpacity = interpolate(frame, [100, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bgDark,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      <GlowOrb x={30} y={40} size={600} color={theme.colors.primary} delay={0} />
      <GlowOrb x={70} y={60} size={500} color={theme.colors.accent} delay={10} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, zIndex: 1 }}>
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            fontSize: 96,
            fontWeight: 800,
            fontFamily: theme.fonts.heading,
            background: theme.colors.gradientPrimary,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: logoLetterSpacing,
          }}
        >
          Crecimos
        </div>

        {/* Gradient line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: theme.colors.gradientPrimary,
            borderRadius: 2,
          }}
        />

        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            fontSize: 28,
            fontWeight: 400,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.body,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Never miss a call again
        </div>
      </div>
    </AbsoluteFill>
  );
};
