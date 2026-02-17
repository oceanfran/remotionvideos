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
   Scene 6 — Building for the Future (41-50s · 270 frames)
   Enhanced with economic/technological trend graphics
   to show why this is inevitable.
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

/* ── Trend data points for the background ── */
const trendStats = [
  {
    label: "AI Market Size",
    value: "$1.8T",
    subtext: "by 2030",
    color: molt.colors.gold,
    x: 80,
    y: 140,
    delay: 60,
  },
  {
    label: "Gig Economy Growth",
    value: "+17%",
    subtext: "YoY",
    color: molt.colors.cyan,
    x: 1640,
    y: 150,
    delay: 75,
  },
  {
    label: "AI Agents Deployed",
    value: "500M+",
    subtext: "by 2028",
    color: molt.colors.goldLight,
    x: 100,
    y: 750,
    delay: 90,
  },
  {
    label: "Remote Workers",
    value: "1.2B",
    subtext: "worldwide",
    color: molt.colors.blue,
    x: 1620,
    y: 740,
    delay: 105,
  },
];

/* ── Technology trend icons ── */
const trendIcons = [
  { icon: "chip", x: 180, y: 380, delay: 55, color: molt.colors.gold },
  { icon: "cloud", x: 1720, y: 400, delay: 70, color: molt.colors.cyan },
  { icon: "graph", x: 140, y: 550, delay: 85, color: molt.colors.goldLight },
  { icon: "network", x: 1740, y: 560, delay: 100, color: molt.colors.purple },
];

/* ── Film grain noise overlay ── */
const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();
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
        width: 300,
        height: 200,
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
      <div
        style={{
          fontSize: 72,
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
      <div
        style={{
          fontSize: 16,
          fontWeight: 500,
          fontFamily: molt.fonts.body,
          color: molt.colors.textSecondary,
          letterSpacing: "0.02em",
          marginTop: 14,
        }}
      >
        {label}
      </div>
    </div>
  );
};

/* ── Trend line SVG component ── */
const TrendLine: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  progress: number;
  delay: number;
  frame: number;
}> = ({ x, y, width, height, color, progress }) => {
  const points = [];
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    const px = (i / steps) * width;
    const py = height - (i / steps) * height * 0.8 - Math.sin(i * 0.8) * 10;
    points.push(`${px},${py}`);
  }
  const pathD = `M ${points.join(" L ")}`;

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: progress * 0.4,
        overflow: "visible",
      }}
    >
      {/* Trend line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={width * 2}
        strokeDashoffset={width * 2 * (1 - progress)}
      />
      {/* Arrow at end */}
      {progress > 0.8 && (
        <polygon
          points={`${width - 8},${height * 0.15 + 5} ${width},${height * 0.15 - 3} ${width - 8},${height * 0.15 - 11}`}
          fill={color}
          opacity={0.6}
        />
      )}
    </svg>
  );
};

/* ── Icon components ── */
const TrendIcon: React.FC<{
  icon: string;
  color: string;
  progress: number;
  frame: number;
}> = ({ icon, color, progress, frame }) => {
  const drift = Math.sin(frame * 0.025) * 4;

  if (icon === "chip") {
    return (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          opacity: progress * 0.5,
          transform: `translateY(${drift}px)`,
        }}
      >
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          rx="2"
          stroke={color}
          strokeWidth="1.5"
        />
        <rect x="9" y="9" width="6" height="6" rx="1" fill={color} opacity={0.4} />
        <line x1="8" y1="2" x2="8" y2="5" stroke={color} strokeWidth="1.5" />
        <line x1="12" y1="2" x2="12" y2="5" stroke={color} strokeWidth="1.5" />
        <line x1="16" y1="2" x2="16" y2="5" stroke={color} strokeWidth="1.5" />
        <line x1="8" y1="19" x2="8" y2="22" stroke={color} strokeWidth="1.5" />
        <line x1="12" y1="19" x2="12" y2="22" stroke={color} strokeWidth="1.5" />
        <line x1="16" y1="19" x2="16" y2="22" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  }
  if (icon === "cloud") {
    return (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          opacity: progress * 0.5,
          transform: `translateY(${drift}px)`,
        }}
      >
        <path
          d="M6 19a4 4 0 01-.8-7.9A5.5 5.5 0 0118 9a4.5 4.5 0 01.5 9H6z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (icon === "graph") {
    return (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          opacity: progress * 0.5,
          transform: `translateY(${drift}px)`,
        }}
      >
        <polyline
          points="3,18 8,13 12,15 21,6"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="16,6 21,6 21,11"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // network
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        opacity: progress * 0.5,
        transform: `translateY(${drift}px)`,
      }}
    >
      <circle cx="12" cy="5" r="2.5" stroke={color} strokeWidth="1.5" />
      <circle cx="5" cy="19" r="2.5" stroke={color} strokeWidth="1.5" />
      <circle cx="19" cy="19" r="2.5" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="7.5" x2="7" y2="16.5" stroke={color} strokeWidth="1" opacity={0.5} />
      <line x1="12" y1="7.5" x2="17" y2="16.5" stroke={color} strokeWidth="1" opacity={0.5} />
      <line x1="7.5" y1="19" x2="16.5" y2="19" stroke={color} strokeWidth="1" opacity={0.5} />
    </svg>
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

  /* ── Exit fade with scale-down (last 25 frames: 245-270) ── */
  const exitOpacity = interpolate(frame, [245, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(frame, [245, 270], [1, 0.97], {
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
    frame: Math.max(0, frame - 175),
    fps,
    config: { damping: 24, stiffness: 130 },
  });
  const bottomY = interpolate(bottomSpring, [0, 1], [25, 0]);

  /* ── Trend stat springs ── */
  const trendStatSprings = trendStats.map((t) =>
    spring({
      frame: Math.max(0, frame - t.delay),
      fps,
      config: { damping: 26, stiffness: 130 },
    }),
  );

  /* ── Trend icon springs ── */
  const trendIconSprings = trendIcons.map((t) =>
    spring({
      frame: Math.max(0, frame - t.delay),
      fps,
      config: { damping: 28, stiffness: 120 },
    }),
  );

  /* ── Trend line progress ── */
  const trendLineProgress = interpolate(frame, [50, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  /* ── Layout constants ── */
  const cardGap = 50;
  const cardWidth = 300;
  const totalCardsWidth = cardWidth * 3 + cardGap * 2;
  const cardsStartX = (1920 - totalCardsWidth) / 2;
  const cardsCenterY = 460;

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

      {/* ══════ TREND STAT CARDS (corners) ══════ */}
      {trendStats.map((stat, i) => {
        const sProgress = trendStatSprings[i];
        const sY = interpolate(sProgress, [0, 1], [20, 0]);
        const drift = Math.sin(frame * 0.02 + i * 1.5) * 3;

        return (
          <div
            key={`stat-${i}`}
            style={{
              position: "absolute",
              left: stat.x,
              top: stat.y,
              opacity: sProgress * 0.7,
              transform: `translateY(${sY + drift}px)`,
              padding: "14px 20px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              backdropFilter: "blur(12px)",
              minWidth: 140,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: molt.colors.textMuted,
                fontFamily: molt.fonts.body,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: stat.color,
                fontFamily: molt.fonts.display,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: molt.colors.textMuted,
                fontFamily: molt.fonts.body,
                marginTop: 4,
              }}
            >
              {stat.subtext}
            </div>
          </div>
        );
      })}

      {/* ══════ TREND ICONS (sides) ══════ */}
      {trendIcons.map((ti, i) => {
        const iProgress = trendIconSprings[i];
        return (
          <div
            key={`icon-${i}`}
            style={{
              position: "absolute",
              left: ti.x,
              top: ti.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <TrendIcon
              icon={ti.icon}
              color={ti.color}
              progress={iProgress}
              frame={frame}
            />
          </div>
        );
      })}

      {/* ══════ UPWARD TREND LINES (left and right) ══════ */}
      <TrendLine
        x={60}
        y={620}
        width={120}
        height={80}
        color={molt.colors.gold}
        progress={trendLineProgress}
        delay={50}
        frame={frame}
      />
      <TrendLine
        x={1740}
        y={630}
        width={110}
        height={70}
        color={molt.colors.cyan}
        progress={trendLineProgress}
        delay={65}
        frame={frame}
      />

      {/* ── Gold label ── */}
      <div
        style={{
          position: "absolute",
          top: 120,
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
          top: 165,
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
          top: cardsCenterY + 100 + 14,
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
          top: cardsCenterY + 100 + 14,
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
              top: cardsCenterY + 100 + 14 - 6,
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
              top: cardsCenterY - 100,
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
          bottom: 100,
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
