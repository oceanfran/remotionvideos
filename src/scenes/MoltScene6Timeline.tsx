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
   Scene 6 — Building for the Future (40-48s · 240 frames)
   Apple-inspired redesign: centered compositions,
   massive typography, high-damping springs, film grain.
   ────────────────────────────────────────────────── */

const milestones = [
  {
    year: "2026",
    label: "Early Adopters",
    color: molt.colors.gold,
    delay: 45,
  },
  {
    year: "2028",
    label: "Mainstream Adoption",
    color: molt.colors.goldLight,
    delay: 85,
  },
  {
    year: "2030",
    label: "The New Normal",
    color: molt.colors.goldLight,
    delay: 125,
  },
];

/* ── Film grain noise overlay ── */
const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
  // Generate a pseudo-random SVG noise that shifts every frame
  const seed = frame % 100;
  return (
    <AbsoluteFill
      style={{
        opacity: 0.025,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    >
      <svg width="100%" height="100%">
        <filter id={`grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#grain-${seed})`}
          opacity={1}
        />
      </svg>
    </AbsoluteFill>
  );
};

/* ── Glass milestone card ── */
const MilestoneCard: React.FC<{
  year: string;
  label: string;
  color: string;
  progress: number;
  frame: number;
}> = ({ year, label, color, progress, frame }) => {
  const translateY = interpolate(progress, [0, 1], [30, 0]);
  const scale = interpolate(progress, [0, 1], [0.94, 1]);

  // Subtle breathing glow on the year number
  const glowPulse = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.4, 0.7],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 320,
        height: 220,
        background: `linear-gradient(
          165deg,
          rgba(19, 19, 22, 0.85) 0%,
          rgba(19, 19, 22, 0.55) 100%
        )`,
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderRadius: molt.radius.xl,
        border: `1px solid ${molt.colors.border}`,
        boxShadow: `
          ${molt.shadows.card},
          inset 0 1px 0 rgba(255, 255, 255, 0.04)
        `,
        opacity: progress,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      {/* Big year number */}
      <div
        style={{
          fontSize: 80,
          fontWeight: 700,
          fontFamily: molt.fonts.display,
          color: color,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          textShadow: `0 0 40px ${color}${Math.round(glowPulse * 255)
            .toString(16)
            .padStart(2, "0")}`,
        }}
      >
        {year}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 500,
          fontFamily: molt.fonts.body,
          color: molt.colors.textSecondary,
          letterSpacing: "0.02em",
          marginTop: 16,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const MoltScene6Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Entrance fade (0-15 frames) ── */
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Exit fade with scale-down (last 25 frames: 215-240) ── */
  const exitOpacity = interpolate(frame, [215, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [215, 240], [1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  /* ── Title spring (high damping) ── */
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 26, stiffness: 150 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [25, 0]);

  /* ── Label "BUILDING FOR THE FUTURE" ── */
  const labelOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const labelY = interpolate(frame, [0, 18], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Milestone card springs (high damping) ── */
  const cardSprings = milestones.map((m) =>
    spring({
      frame: Math.max(0, frame - m.delay),
      fps,
      config: { damping: 24, stiffness: 140 },
    }),
  );

  /* ── Timeline connecting line ── */
  const lineProgress = interpolate(frame, [40, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Bottom message spring ── */
  const bottomSpring = spring({
    frame: Math.max(0, frame - 170),
    fps,
    config: { damping: 24, stiffness: 130 },
  });
  const bottomY = interpolate(bottomSpring, [0, 1], [25, 0]);

  /* ── Layout constants ── */
  const cardGap = 60;
  const cardWidth = 320;
  const totalCardsWidth = cardWidth * 3 + cardGap * 2;
  const cardsStartX = (1920 - totalCardsWidth) / 2;
  const cardsCenterY = 480;

  /* ── Timeline line position (connects card centers) ── */
  const lineStartX = cardsStartX + cardWidth / 2;
  const lineEndX = cardsStartX + totalCardsWidth - cardWidth / 2;
  const lineWidth = lineEndX - lineStartX;

  return (
    <AbsoluteFill
      style={{
        background: molt.colors.bg,
        opacity: entranceOpacity * exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Subtle radial glow — centered, diffused */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(
            ellipse 60% 45% at 50% 48%,
            ${molt.colors.goldGlow},
            transparent 70%
          )`,
        }}
      />

      {/* ── Gold label ── */}
      <div
        style={{
          position: "absolute",
          top: 140,
          width: "100%",
          textAlign: "center",
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 600,
            fontFamily: molt.fonts.body,
            color: molt.colors.gold,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Building for the Future
        </span>
      </div>

      {/* ── Main headline ── */}
      <div
        style={{
          position: "absolute",
          top: 185,
          width: "100%",
          textAlign: "center",
          opacity: titleSpring,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            fontFamily: molt.fonts.display,
            color: molt.colors.text,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          This is{" "}
          <span
            style={{
              background: `linear-gradient(
                135deg,
                ${molt.colors.goldLight} 0%,
                ${molt.colors.gold} 50%,
                ${molt.colors.goldDark} 100%
              )`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            inevitable
          </span>
        </div>
      </div>

      {/* ── Horizontal timeline line ── */}
      {/* Track (dim base) */}
      <div
        style={{
          position: "absolute",
          left: lineStartX,
          top: cardsCenterY + 110 + 14,
          width: lineWidth,
          height: 2,
          background: molt.colors.border,
          borderRadius: 1,
        }}
      />
      {/* Animated gold line */}
      <div
        style={{
          position: "absolute",
          left: lineStartX,
          top: cardsCenterY + 110 + 14,
          width: lineWidth * lineProgress,
          height: 2,
          background: `linear-gradient(
            90deg,
            ${molt.colors.goldDark},
            ${molt.colors.gold},
            ${molt.colors.goldLight}
          )`,
          borderRadius: 1,
          boxShadow: `0 0 16px ${molt.colors.goldGlowStrong}`,
        }}
      />

      {/* ── Three milestone dots on the line ── */}
      {milestones.map((m, i) => {
        const dotX = lineStartX + (lineWidth / 2) * i;
        const dotScale = interpolate(cardSprings[i], [0, 1], [0, 1]);
        return (
          <div
            key={`dot-${i}`}
            style={{
              position: "absolute",
              left: dotX - 6,
              top: cardsCenterY + 110 + 14 - 6,
              width: 12,
              height: 12,
              borderRadius: molt.radius.full,
              background: cardSprings[i] > 0.3 ? m.color : molt.colors.border,
              boxShadow:
                cardSprings[i] > 0.3
                  ? `0 0 12px ${m.color}80`
                  : "none",
              transform: `scale(${dotScale})`,
              zIndex: 3,
            }}
          />
        );
      })}

      {/* ── Milestone cards ── */}
      {milestones.map((m, i) => {
        const cardX = cardsStartX + i * (cardWidth + cardGap);
        return (
          <div
            key={`card-${i}`}
            style={{
              position: "absolute",
              left: cardX,
              top: cardsCenterY - 110,
              width: cardWidth,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MilestoneCard
              year={m.year}
              label={m.label}
              color={m.color}
              progress={cardSprings[i]}
              frame={frame}
            />
          </div>
        );
      })}

      {/* ── Bottom message ── */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: "100%",
          textAlign: "center",
          opacity: bottomSpring,
          transform: `translateY(${bottomY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            fontFamily: molt.fonts.display,
            color: molt.colors.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.4,
          }}
        >
          The platforms that establish themselves early{" "}
          <span
            style={{
              background: `linear-gradient(
                135deg,
                ${molt.colors.goldLight} 0%,
                ${molt.colors.gold} 60%,
                ${molt.colors.goldDark} 100%
              )`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            define the market
          </span>
        </div>
      </div>

      {/* ── Film grain overlay ── */}
      <FilmGrain />
    </AbsoluteFill>
  );
};
