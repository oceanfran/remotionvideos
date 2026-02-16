import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { FeatureCard } from "../components/FeatureCard";
import { GlowOrb } from "../components/GlowOrb";

export const SceneFeatures: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 20], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const exitOpacity = interpolate(frame, [160, 180], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const features = [
    { icon: "🤖", title: "24/7 AI Answering", description: "Never miss a call. Your AI assistant picks up instantly, day or night." },
    { icon: "📅", title: "Smart Booking", description: "Automatically schedules appointments and syncs with your calendar." },
    { icon: "⚡", title: "5-Minute Setup", description: "Go live in minutes. No complex integrations or technical skills required." },
    { icon: "🔗", title: "CRM Integration", description: "Seamlessly connects with your existing tools and workflows." },
  ];

  return (
    <AbsoluteFill style={{ background: theme.colors.bgDark, justifyContent: "center", alignItems: "center", opacity: exitOpacity }}>
      <GlowOrb x={20} y={60} size={500} color={theme.colors.primary} delay={0} />
      <GlowOrb x={80} y={40} size={400} color={theme.colors.accent} delay={10} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60, zIndex: 1 }}>
        <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 500, color: theme.colors.accent, fontFamily: theme.fonts.body, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
            Why Crecimos
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, color: theme.colors.textPrimary, fontFamily: theme.fonts.heading }}>
            Everything you need to{" "}
            <span style={{ background: theme.colors.gradientPrimary, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              grow
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 28 }}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={25 + index * 15}
              index={index}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
