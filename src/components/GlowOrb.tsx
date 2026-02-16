import { interpolate, useCurrentFrame } from "remotion";

export const GlowOrb: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  delay?: number;
}> = ({ x, y, size, color, delay = 0 }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 30], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(
    frame - delay,
    [0, 60, 120],
    [0.8, 1.1, 0.9],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}40, transparent 70%)`,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        filter: "blur(60px)",
      }}
    />
  );
};
