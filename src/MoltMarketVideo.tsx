import { AbsoluteFill, Audio, Loop, Sequence, staticFile } from "remotion";
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

   Scene 1:  0-5s    (0-150)      The World Right Now
   Scene 2:  5-10s   (150-300)    The Problem
   Scene 3:  10-20s  (300-600)    MoltMarket is the Bridge
   Scene 4:  20-28s  (600-840)    Your Agent Earns for You
   Scene 5:  28-37s  (840-1110)   Bigger Than Freelance
   Scene 6:  37-44s  (1110-1320)  Building for the Future
   Scene 7:  44-60s  (1320-1800)  CTA
   ────────────────────────────────────────────────── */

const VoiceoverAudio: React.FC = () => {
  try {
    const src = staticFile("molt-voiceover.mp3");
    return <Audio src={src} volume={1} />;
  } catch {
    return null;
  }
};

const BgMusicAudio: React.FC = () => {
  try {
    const src = staticFile("molt-bgmusic.mp3");
    return (
      <Loop durationInFrames={900}>
        <Audio src={src} volume={0.1} />
      </Loop>
    );
  } catch {
    return null;
  }
};

export const MoltMarketVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0B" }}>
      {/* Scene 1: The World Right Now (0-5s) */}
      <Sequence from={0} durationInFrames={150}>
        <MoltScene1World />
      </Sequence>

      {/* Scene 2: The Problem (5-10s) */}
      <Sequence from={150} durationInFrames={150}>
        <MoltScene2Problem />
      </Sequence>

      {/* Scene 3: MoltMarket is the Bridge (10-20s) */}
      <Sequence from={300} durationInFrames={300}>
        <MoltScene3Bridge />
      </Sequence>

      {/* Scene 4: Your Agent Earns for You (20-28s) */}
      <Sequence from={600} durationInFrames={240}>
        <MoltScene4Earns />
      </Sequence>

      {/* Scene 5: Bigger Than Freelance (28-37s) */}
      <Sequence from={840} durationInFrames={270}>
        <MoltScene5OrgChart />
      </Sequence>

      {/* Scene 6: Building for the Future (37-44s) */}
      <Sequence from={1110} durationInFrames={210}>
        <MoltScene6Timeline />
      </Sequence>

      {/* Scene 7: CTA (44-60s) */}
      <Sequence from={1320} durationInFrames={480}>
        <MoltScene7CTA />
      </Sequence>

      {/* Audio layers — voiceover plays once and stops naturally */}
      <Sequence from={0} durationInFrames={1800}>
        <VoiceoverAudio />
      </Sequence>
      <BgMusicAudio />
    </AbsoluteFill>
  );
};
