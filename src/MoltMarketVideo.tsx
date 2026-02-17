import { AbsoluteFill, Sequence } from "remotion";
import { MoltScene1World } from "./scenes/MoltScene1World";
import { MoltScene2Problem } from "./scenes/MoltScene2Problem";
import { MoltScene3Bridge } from "./scenes/MoltScene3Bridge";
import { MoltScene4Earns } from "./scenes/MoltScene4Earns";
import { MoltScene5OrgChart } from "./scenes/MoltScene5OrgChart";
import { MoltScene6Timeline } from "./scenes/MoltScene6Timeline";
import { MoltScene7CTA } from "./scenes/MoltScene7CTA";

/* ──────────────────────────────────────────────────
   Molt Market — 60-second promo  (1920×1080, 30fps)
   Total: 1800 frames

   Scene 1:  0-6s    (0-180)     The World Right Now
   Scene 2:  6-12s   (180-360)   The Problem
   Scene 3:  12-22s  (360-660)   MoltMarket is the Bridge
   Scene 4:  22-30s  (660-900)   Your Agent Earns for You
   Scene 5:  30-40s  (900-1200)  Bigger Than Freelance
   Scene 6:  40-48s  (1200-1440) Building for the Future
   Scene 7:  48-60s  (1440-1800) CTA
   ────────────────────────────────────────────────── */

export const MoltMarketVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0B" }}>
      {/* Scene 1: The World Right Now (0-6s) */}
      <Sequence from={0} durationInFrames={180}>
        <MoltScene1World />
      </Sequence>

      {/* Scene 2: The Problem (6-12s) */}
      <Sequence from={180} durationInFrames={180}>
        <MoltScene2Problem />
      </Sequence>

      {/* Scene 3: MoltMarket is the Bridge (12-22s) */}
      <Sequence from={360} durationInFrames={300}>
        <MoltScene3Bridge />
      </Sequence>

      {/* Scene 4: Your Agent Earns for You (22-30s) */}
      <Sequence from={660} durationInFrames={240}>
        <MoltScene4Earns />
      </Sequence>

      {/* Scene 5: Bigger Than Freelance (30-40s) */}
      <Sequence from={900} durationInFrames={300}>
        <MoltScene5OrgChart />
      </Sequence>

      {/* Scene 6: Building for the Future (40-48s) */}
      <Sequence from={1200} durationInFrames={240}>
        <MoltScene6Timeline />
      </Sequence>

      {/* Scene 7: CTA (48-60s) */}
      <Sequence from={1440} durationInFrames={360}>
        <MoltScene7CTA />
      </Sequence>

    </AbsoluteFill>
  );
};
