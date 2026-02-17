import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { molt } from "../moltTheme";

/* ──────────────────────────────────────────────────
   Scene 1 — The World Right Now  (0-6s · 180 frames)
   Apple-style: massive centered text, ambient floating
   orbs in background, cinematic scale-down entrance.
   ────────────────────────────────────────────────── */

const orbs = [
  { x: 25, y: 30, size: 320, color: molt.colors.gold, speed: 0.008, delay: 0 },
  { x: 70, y: 20, size: 260, color: molt.colors.cyan, speed: 0.006, delay: 5 },
  { x: 85, y: 65, size: 280, color: molt.colors.purple, speed: 0.01, delay: 10 },
  { x: 15, y: 70, size: 240, color: molt.colors.gold, speed: 0.007, delay: 8 },
  { x: 50, y: 80, size: 200, color: molt.colors.blue, speed: 0.009, delay: 12 },
  { x: 40, y: 15, size: 180, color: molt.colors.goldLight, speed: 0.011, delay: 15 },
];

export const MoltScene1World: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cinematic zoom: starts slightly scaled up, settles to 1.0
  const zoomScale = interpolate(frame, [0, 50], [1.08, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Scene entrance fade
  const enterOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Headline — Apple-style: high damping, crisp settle
  const headlineSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 24, stiffness: 140, mass: 1 },
  });
  const headlineY = interpolate(headlineSpring, [0, 1], [35, 0]);

  // Subtitle — staggered after headline
  const subSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 24, stiffness: 140, mass: 1 },
  });
  const subY = interpolate(subSpring, [0, 1], [25, 0]);

  // Exit: clean fade + subtle scale-down
  const exitOp = interpolate(frame, [155, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [155, 180], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const combinedOp = Math.min(enterOp, exitOp);

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: combinedOp,
        transform: `scale(${zoomScale * exitScale})`,
      }}
    >
      {/* Deep atmospheric background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 100% 80% at 50% 50%, #141420, ${molt.colors.bg})`,
        }}
      />

      {/* Floating ambient orbs — large, soft blurred glows */}
      {orbs.map((orb, i) => {
        const orbSpring = spring({
          frame: frame - orb.delay,
          fps,
          config: { damping: 30, stiffness: 60 },
        });
        const driftX = Math.sin(frame * orb.speed + i * 2) * 20;
        const driftY = Math.cos(frame * orb.speed * 0.7 + i) * 15;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color}18, ${orb.color}06, transparent 70%)`,
              transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px)`,
              opacity: orbSpring * 0.6,
            }}
          />
        );
      })}

      {/* Particle dots — golden-ratio distributed */}
      {Array.from({ length: 30 }).map((_, i) => {
        const px = (i * 137.5) % 100;
        const py = (i * 83.7) % 100;
        const particleOp = interpolate(frame, [i * 2, i * 2 + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const pulse = Math.sin(frame * 0.04 + i * 0.5) * 0.3 + 0.7;

        return (
          <div
            key={`p-${i}`}
            style={{
              position: "absolute",
              left: `${px}%`,
              top: `${py}%`,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: molt.colors.gold,
              opacity: particleOp * pulse * 0.35,
            }}
          />
        );
      })}

      {/* Center content — massive Apple-style typography */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 120px",
        }}
      >
        <div
          style={{
            opacity: headlineSpring,
            transform: `translateY(${headlineY}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              fontFamily: molt.fonts.display,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: molt.colors.text,
            }}
          >
            AI agents are already
            <br />
            doing{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${molt.colors.goldLight}, ${molt.colors.gold}, ${molt.colors.goldAccent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              real work
            </span>
          </div>
        </div>

        <div
          style={{
            opacity: subSpring,
            transform: `translateY(${subY}px)`,
            marginTop: 28,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: molt.colors.textSecondary,
              fontFamily: molt.fonts.body,
              textAlign: "center",
              letterSpacing: "-0.01em",
            }}
          >
            Millions running right now on machines all over the world
          </div>
        </div>
      </div>

      {/* Subtle noise overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
