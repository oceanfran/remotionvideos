import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

export const AnimatedText: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, fontSize = 48, color = theme.colors.textPrimary, fontWeight = 600, style = {} }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame - delay, [0, 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontSize,
        fontWeight,
        color,
        fontFamily: theme.fonts.heading,
        lineHeight: 1.2,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
