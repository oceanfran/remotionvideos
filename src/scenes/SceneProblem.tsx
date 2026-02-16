import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { GlowOrb } from "../components/GlowOrb";

export const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();

  // Title
  const titleOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [5, 25], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stats appear one by one
  const stat1Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stat1Y = interpolate(frame, [30, 50], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const stat2Opacity = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stat2Y = interpolate(frame, [45, 65], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const stat3Opacity = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stat3Y = interpolate(frame, [60, 80], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Exit
  const exitOpacity = interpolate(frame, [130, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const StatBlock: React.FC<{ number: string; label: string; opacity: number; y: number; color: string }> = ({
    number, label, opacity, y, color,
  }) => (
    <div style={{ opacity, transform: `translateY(${y}px)`, textAlign: "center", flex: 1 }}>
      <div style={{ fontSize: 80, fontWeight: 800, color, fontFamily: theme.fonts.heading, lineHeight: 1 }}>
        {number}
      </div>
      <div style={{ fontSize: 22, color: theme.colors.textSecondary, fontFamily: theme.fonts.body, marginTop: 12, lineHeight: 1.4 }}>
        {label}
      </div>
    </div>
  );

  return (
    <AbsoluteFill style={{ background: theme.colors.bgDark, justifyContent: "center", alignItems: "center", opacity: exitOpacity }}>
      <GlowOrb x={50} y={30} size={500} color={theme.colors.danger} delay={0} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60, padding: "0 120px", zIndex: 1 }}>
        <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: theme.colors.textPrimary, fontFamily: theme.fonts.heading }}>
            Every missed call is a
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, color: theme.colors.danger, fontFamily: theme.fonts.heading }}>
            missed opportunity.
          </div>
        </div>

        <div style={{ display: "flex", gap: 80, width: "100%" }}>
          <StatBlock number="62%" label="of calls to small businesses go unanswered" opacity={stat1Opacity} y={stat1Y} color={theme.colors.danger} />
          <StatBlock number="85%" label="of callers won't call back if unanswered" opacity={stat2Opacity} y={stat2Y} color={theme.colors.warning} />
          <StatBlock number="$1.2M" label="average revenue lost per year from missed calls" opacity={stat3Opacity} y={stat3Y} color={theme.colors.danger} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
