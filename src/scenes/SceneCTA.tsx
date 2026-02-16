import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { GlowOrb } from "../components/GlowOrb";

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleScale = interpolate(frame, [5, 25], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [20, 40], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const buttonOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const buttonScale = interpolate(frame, [35, 50], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Pulsing glow on button
  const pulseScale = interpolate(frame % 30, [0, 15, 30], [1, 1.05, 1], { extrapolateRight: "clamp" });

  const urlOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: theme.colors.bgDark, justifyContent: "center", alignItems: "center" }}>
      <GlowOrb x={50} y={40} size={800} color={theme.colors.primary} delay={0} />
      <GlowOrb x={30} y={70} size={500} color={theme.colors.accent} delay={10} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, zIndex: 1 }}>
        <div style={{ opacity: titleOpacity, transform: `scale(${titleScale})`, textAlign: "center" }}>
          <div style={{
            fontSize: 72,
            fontWeight: 800,
            fontFamily: theme.fonts.heading,
            background: theme.colors.gradientPrimary,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}>
            Start growing today.
          </div>
        </div>

        <div style={{ opacity: subtitleOpacity, transform: `translateY(${subtitleY}px)`, fontSize: 28, color: theme.colors.textSecondary, fontFamily: theme.fonts.body, textAlign: "center" }}>
          Set up in 5 minutes. Start your free trial now.
        </div>

        <div style={{ opacity: buttonOpacity, transform: `scale(${buttonScale * pulseScale})`, marginTop: 16 }}>
          <div style={{
            padding: "22px 64px",
            background: theme.colors.gradientPrimary,
            borderRadius: 16,
            fontSize: 26,
            fontWeight: 700,
            color: "white",
            fontFamily: theme.fonts.heading,
            boxShadow: `0 0 40px ${theme.colors.primary}50`,
          }}>
            Try Crecimos Free →
          </div>
        </div>

        <div style={{ opacity: urlOpacity, fontSize: 22, color: theme.colors.textMuted, fontFamily: theme.fonts.body, marginTop: 8 }}>
          crecimos.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
