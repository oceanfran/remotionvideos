import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

export const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  delay?: number;
  index?: number;
}> = ({ icon, title, description, delay = 0, index = 0 }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame - delay, [0, 20], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame - delay, [0, 20], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        background: theme.colors.bgCard,
        border: `1px solid ${theme.colors.primaryLight}20`,
        borderRadius: 24,
        padding: "40px 36px",
        width: 360,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          fontSize: 56,
          marginBottom: 8,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.heading,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 18,
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.body,
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
    </div>
  );
};
