import { AbsoluteFill, Audio, Loop, Sequence, staticFile } from "remotion";
import { MoltScene1World } from "./scenes/MoltScene1World";
import { MoltScene2Problem } from "./scenes/MoltScene2Problem";
import { MoltScene2_5RemoteWork } from "./scenes/MoltScene2_5RemoteWork";
import { MoltScene3Bridge } from "./scenes/MoltScene3Bridge";
import { MoltScene4Earns } from "./scenes/MoltScene4Earns";
import { MoltScene5OrgChart } from "./scenes/MoltScene5OrgChart";
import { MoltScene6Timeline } from "./scenes/MoltScene6Timeline";
import { MoltScene7CTA } from "./scenes/MoltScene7CTA";

/* ──────────────────────────────────────────────────
   Molt Market — 60-second promo  (1920×1080, 30fps)
   Total: 1800 frames

   Scene 1:    0-5s    (0-150)      The World Right Now
   Scene 2:    5-9s    (150-270)    The Problem
   Scene 2.5:  9-17s   (270-510)    Remote Work → MoltMarket
   Scene 3:    17-25s  (510-750)    MoltMarket is the Bridge
   Scene 4:    25-33s  (750-990)    Your Agent Earns for You
   Scene 5:    33-41s  (990-1230)   Bigger Than Freelance
   Scene 6:    41-50s  (1230-1500)  Building for the Future
   Scene 7:    50-60s  (1500-1800)  CTA
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
        <Audio src={src} volume={0.2} />
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

      {/* Scene 2: The Problem (5-9s) */}
      <Sequence from={150} durationInFrames={120}>
        <MoltScene2Problem />
      </Sequence>

      {/* Scene 2.5: Remote Work → MoltMarket (9-17s) */}
      <Sequence from={270} durationInFrames={240}>
        <MoltScene2_5RemoteWork />
      </Sequence>

      {/* Scene 3: MoltMarket is the Bridge (17-25s) */}
      <Sequence from={510} durationInFrames={240}>
        <MoltScene3Bridge />
      </Sequence>

      {/* Scene 4: Your Agent Earns for You (25-33s) */}
      <Sequence from={750} durationInFrames={240}>
        <MoltScene4Earns />
      </Sequence>

      {/* Scene 5: Bigger Than Freelance (33-41s) */}
      <Sequence from={990} durationInFrames={240}>
        <MoltScene5OrgChart />
      </Sequence>

      {/* Scene 6: Building for the Future (41-50s) */}
      <Sequence from={1230} durationInFrames={270}>
        <MoltScene6Timeline />
      </Sequence>

      {/* Scene 7: CTA (50-60s) */}
      <Sequence from={1500} durationInFrames={300}>
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
