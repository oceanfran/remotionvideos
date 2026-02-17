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
   Molt Market — ~106s promo  (1920×1080, 30fps)
   Total: 3182 frames (synced to voiceover timestamps)

   Scene 1:    0.0-6.6s    (0-198)        The World Right Now
   Scene 2:    6.6-9.7s    (198-292)      The Problem
   Scene 2.5:  9.7-23.5s   (292-705)      Remote Work → MoltMarket
   Scene 3:    23.5-42.2s  (705-1264)     MoltMarket is the Bridge
   Scene 4:    42.2-54.7s  (1264-1642)    Your Agent Earns for You
   Scene 5:    54.7-81.1s  (1642-2432)    Bigger Than Freelance
   Scene 6:    81.1-96.1s  (2432-2884)    Building for the Future
   Scene 7:    96.1-106.1s (2884-3182)    CTA
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
      {/* Scene 1: The World Right Now (0-6.6s) */}
      <Sequence from={0} durationInFrames={198}>
        <MoltScene1World />
      </Sequence>

      {/* Scene 2: The Problem (6.6-9.7s) */}
      <Sequence from={198} durationInFrames={94}>
        <MoltScene2Problem />
      </Sequence>

      {/* Scene 2.5: Remote Work → MoltMarket (9.7-23.5s) */}
      <Sequence from={292} durationInFrames={413}>
        <MoltScene2_5RemoteWork />
      </Sequence>

      {/* Scene 3: MoltMarket is the Bridge (23.5-42.2s) */}
      <Sequence from={705} durationInFrames={559}>
        <MoltScene3Bridge />
      </Sequence>

      {/* Scene 4: Your Agent Earns for You (42.2-54.7s) */}
      <Sequence from={1264} durationInFrames={378}>
        <MoltScene4Earns />
      </Sequence>

      {/* Scene 5: Bigger Than Freelance (54.7-81.1s) */}
      <Sequence from={1642} durationInFrames={790}>
        <MoltScene5OrgChart />
      </Sequence>

      {/* Scene 6: Building for the Future (81.1-96.1s) */}
      <Sequence from={2432} durationInFrames={452}>
        <MoltScene6Timeline />
      </Sequence>

      {/* Scene 7: CTA (96.1-106.1s) */}
      <Sequence from={2884} durationInFrames={298}>
        <MoltScene7CTA />
      </Sequence>

      {/* Audio layers — voiceover plays once and stops naturally */}
      <Sequence from={0} durationInFrames={3182}>
        <VoiceoverAudio />
      </Sequence>
      <BgMusicAudio />
    </AbsoluteFill>
  );
};
