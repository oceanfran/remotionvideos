import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { GlowOrb } from "../components/GlowOrb";

export const SceneHowItWorks: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 20], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const exitOpacity = interpolate(frame, [100, 120], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const steps = [
    { number: "01", title: "Customer Calls", desc: "A customer dials your business number" },
    { number: "02", title: "AI Answers", desc: "Crecimos picks up instantly and engages naturally" },
    { number: "03", title: "Books & Confirms", desc: "Appointment is scheduled and confirmed automatically" },
  ];

  return (
    <AbsoluteFill style={{ background: theme.colors.bgDark, justifyContent: "center", alignItems: "center", opacity: exitOpacity }}>
      <GlowOrb x={50} y={50} size={600} color={theme.colors.primary} delay={0} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60, zIndex: 1 }}>
        <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: theme.colors.textPrimary, fontFamily: theme.fonts.heading }}>
            How it works
          </div>
        </div>

        <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
          {steps.map((step, index) => {
            const stepDelay = 25 + index * 20;
            const stepOpacity = interpolate(frame - stepDelay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const stepY = interpolate(frame - stepDelay, [0, 20], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            // Connector line
            const lineWidth = index < steps.length - 1
              ? interpolate(frame - (stepDelay + 15), [0, 15], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
              : 0;

            return (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: 48 }}>
                <div style={{ opacity: stepOpacity, transform: `translateY(${stepY}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: 320 }}>
                  <div style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: theme.colors.gradientPrimary,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 36,
                    fontWeight: 800,
                    color: "white",
                    fontFamily: theme.fonts.mono,
                  }}>
                    {step.number}
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.textPrimary, fontFamily: theme.fonts.heading, textAlign: "center" }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 18, color: theme.colors.textSecondary, fontFamily: theme.fonts.body, textAlign: "center", lineHeight: 1.5 }}>
                    {step.desc}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div style={{ width: 100, height: 3, overflow: "hidden" }}>
                    <div style={{ width: `${lineWidth}%`, height: "100%", background: theme.colors.gradientPrimary, borderRadius: 2 }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
