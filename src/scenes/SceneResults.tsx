import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { GlowOrb } from "../components/GlowOrb";

export const SceneResults: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const exitOpacity = interpolate(frame, [70, 90], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const results = [
    { value: "100%", label: "Calls Answered", color: theme.colors.success },
    { value: "3x", label: "More Bookings", color: theme.colors.accent },
    { value: "24/7", label: "Availability", color: theme.colors.primaryLight },
  ];

  return (
    <AbsoluteFill style={{ background: theme.colors.bgDark, justifyContent: "center", alignItems: "center", opacity: exitOpacity }}>
      <GlowOrb x={50} y={50} size={800} color={theme.colors.success} delay={0} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60, zIndex: 1 }}>
        <div style={{ opacity: titleOpacity, textAlign: "center" }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: theme.colors.textPrimary, fontFamily: theme.fonts.heading }}>
            Real results.{" "}
            <span style={{ background: theme.colors.gradientPrimary, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Real growth.
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 80 }}>
          {results.map((result, index) => {
            const delay = 15 + index * 15;
            const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const scale = interpolate(frame - delay, [0, 20], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            // Counter animation for the value
            const counterProgress = interpolate(frame - delay, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div
                key={index}
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                  textAlign: "center",
                  padding: "48px 56px",
                  background: theme.colors.bgCard,
                  borderRadius: 24,
                  border: `1px solid ${result.color}30`,
                }}
              >
                <div style={{
                  fontSize: 80,
                  fontWeight: 800,
                  color: result.color,
                  fontFamily: theme.fonts.heading,
                  lineHeight: 1,
                }}>
                  {result.value}
                </div>
                <div style={{
                  fontSize: 22,
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.body,
                  marginTop: 16,
                }}>
                  {result.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
