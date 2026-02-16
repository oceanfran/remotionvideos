import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { GlowOrb } from "../components/GlowOrb";

export const SceneSolution: React.FC = () => {
  const frame = useCurrentFrame();

  // "Meet Crecimos" text
  const meetOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const meetY = interpolate(frame, [5, 25], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Description
  const descOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descY = interpolate(frame, [30, 50], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Phone mockup
  const phoneOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phoneScale = interpolate(frame, [40, 65], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Notification badges
  const badge1Opacity = interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badge1X = interpolate(frame, [70, 85], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const badge2Opacity = interpolate(frame, [85, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badge2X = interpolate(frame, [85, 100], [-50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Exit
  const exitOpacity = interpolate(frame, [130, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: theme.colors.bgDark, opacity: exitOpacity }}>
      <GlowOrb x={50} y={50} size={700} color={theme.colors.primary} delay={0} />
      <GlowOrb x={70} y={30} size={400} color={theme.colors.accent} delay={15} />

      <div style={{ display: "flex", height: "100%", alignItems: "center", padding: "0 120px", zIndex: 1 }}>
        {/* Left side - text */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ opacity: meetOpacity, transform: `translateY(${meetY}px)` }}>
            <div style={{ fontSize: 24, fontWeight: 500, color: theme.colors.accent, fontFamily: theme.fonts.body, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              The solution
            </div>
            <div style={{ fontSize: 64, fontWeight: 800, color: theme.colors.textPrimary, fontFamily: theme.fonts.heading, lineHeight: 1.1 }}>
              Meet{" "}
              <span style={{ background: theme.colors.gradientPrimary, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Crecimos
              </span>
            </div>
          </div>

          <div style={{ opacity: descOpacity, transform: `translateY(${descY}px)`, fontSize: 26, color: theme.colors.textSecondary, fontFamily: theme.fonts.body, lineHeight: 1.6, maxWidth: 520 }}>
            Your AI-powered phone assistant that answers every call, books appointments instantly, and ensures your business never sleeps.
          </div>
        </div>

        {/* Right side - phone mockup */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
          <div style={{
            opacity: phoneOpacity,
            transform: `scale(${phoneScale})`,
            width: 320,
            height: 560,
            background: theme.colors.bgCard,
            borderRadius: 40,
            border: `2px solid ${theme.colors.primaryLight}30`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px 24px 24px",
            position: "relative",
            boxShadow: `0 0 80px ${theme.colors.primary}20`,
          }}>
            {/* Phone notch */}
            <div style={{ position: "absolute", top: 16, width: 120, height: 28, background: theme.colors.bgDark, borderRadius: 14 }} />

            {/* Call interface */}
            <div style={{ marginTop: 40, textAlign: "center" }}>
              <div style={{ fontSize: 16, color: theme.colors.textMuted, fontFamily: theme.fonts.body }}>Incoming Call</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.textPrimary, fontFamily: theme.fonts.heading, marginTop: 8 }}>John Smith</div>
              <div style={{ fontSize: 16, color: theme.colors.textSecondary, fontFamily: theme.fonts.body, marginTop: 4 }}>(555) 123-4567</div>
            </div>

            {/* AI Answering indicator */}
            <div style={{
              marginTop: 40,
              padding: "16px 32px",
              background: `${theme.colors.success}20`,
              borderRadius: 16,
              border: `1px solid ${theme.colors.success}40`,
            }}>
              <div style={{ fontSize: 14, color: theme.colors.success, fontFamily: theme.fonts.body, fontWeight: 600, textAlign: "center" }}>
                AI Assistant Active
              </div>
              <div style={{ fontSize: 20, color: theme.colors.textPrimary, fontFamily: theme.fonts.heading, marginTop: 4, textAlign: "center" }}>
                Answering call...
              </div>
            </div>

            {/* Waveform */}
            <div style={{ display: "flex", gap: 4, marginTop: 32, alignItems: "center" }}>
              {[20, 35, 50, 40, 55, 30, 45, 35, 50, 40, 25].map((h, i) => {
                const barHeight = interpolate(
                  frame + i * 3,
                  [0, 15, 30],
                  [h * 0.5, h, h * 0.6],
                  { extrapolateRight: "extend" }
                );
                return (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: Math.abs(barHeight % 60) + 10,
                      background: theme.colors.gradientPrimary,
                      borderRadius: 3,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Floating badges */}
          <div style={{
            position: "absolute",
            right: 40,
            top: 160,
            opacity: badge1Opacity,
            transform: `translateX(${badge1X}px)`,
            background: theme.colors.bgCard,
            border: `1px solid ${theme.colors.success}40`,
            borderRadius: 16,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <div style={{ fontSize: 24 }}>✅</div>
            <div style={{ fontSize: 16, color: theme.colors.textPrimary, fontFamily: theme.fonts.body, fontWeight: 600 }}>Appointment Booked</div>
          </div>

          <div style={{
            position: "absolute",
            left: 40,
            bottom: 180,
            opacity: badge2Opacity,
            transform: `translateX(${badge2X}px)`,
            background: theme.colors.bgCard,
            border: `1px solid ${theme.colors.accent}40`,
            borderRadius: 16,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <div style={{ fontSize: 24 }}>📋</div>
            <div style={{ fontSize: 16, color: theme.colors.textPrimary, fontFamily: theme.fonts.body, fontWeight: 600 }}>Details captured</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
