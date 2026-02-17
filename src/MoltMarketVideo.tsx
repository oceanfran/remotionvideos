import { AbsoluteFill, Audio, Loop, Sequence, staticFile } from "remotion";
import { MoltScene1World } from "./scenes/MoltScene1World";
import { MoltScene2Problem } from "./scenes/MoltScene2Problem";
import { MoltScene2_5RemoteWork } from "./scenes/MoltScene2_5RemoteWork";
import { MoltScene3Flow } from "./scenes/MoltScene3Flow";
import { MoltScene4Earns } from "./scenes/MoltScene4Earns";
import { MoltScene5a_FutureHiring } from "./scenes/MoltScene5a_FutureHiring";
import { MoltScene5OrgChart } from "./scenes/MoltScene5OrgChart";
import { MoltScene5c_Platform } from "./scenes/MoltScene5c_Platform";
import { MoltScene6Timeline } from "./scenes/MoltScene6Timeline";
import { MoltScene7CTA } from "./scenes/MoltScene7CTA";

/* ──────────────────────────────────────────────────
   Molt Market — ~106s promo  (1920×1080, 30fps)
   Total: 3182 frames (synced to voiceover timestamps)

   Scene 1:      0.0-6.6s    (0-198)        The World Right Now
   Scene 2:      6.6-9.7s    (198-292)      The Problem
   Scene 2.5:    9.7-23.5s   (292-705)      Remote Work → MoltMarket
   Scene 3a:     23.5-29.1s  (705-872)      Human → AI flow
   Scene 3b:     29.1-35.1s  (872-1054)     AI → Human flow
   Scene 3c:     35.1-39.6s  (1054-1189)    AI → AI flow
   Scene 3d:     39.6-42.1s  (1189-1264)    Every direction
   Scene 4:      42.1-54.7s  (1264-1642)    Your Agent Earns for You
   Scene 5a:     54.7-61.1s  (1642-1832)    Not just freelance
   Scene 5b:     61.1-71.4s  (1832-2143)    Role cards
   Scene 5c:     71.4-81.1s  (2143-2432)    Platform features
   Scene 6:      81.1-94.7s  (2432-2842)    Building for the Future
   Scene 7:      94.7-106.1s (2842-3182)    CTA
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

      {/* Scene 3a: Human → AI (23.5-29.1s) — "Someone posts a job" */}
      <Sequence from={705} durationInFrames={167}>
        <MoltScene3Flow variant="human-to-ai" />
      </Sequence>

      {/* Scene 3b: AI → Human (29.1-35.1s) — "AI posts a task" */}
      <Sequence from={872} durationInFrames={182}>
        <MoltScene3Flow variant="ai-to-human" />
      </Sequence>

      {/* Scene 3c: AI → AI (35.1-39.6s) — "AI hires another agent" */}
      <Sequence from={1054} durationInFrames={135}>
        <MoltScene3Flow variant="ai-to-ai" />
      </Sequence>

      {/* Scene 3d: Every Direction (39.6-42.1s) — "Every direction" */}
      <Sequence from={1189} durationInFrames={75}>
        <MoltScene3Flow variant="all-directions" />
      </Sequence>

      {/* Scene 4: Your Agent Earns for You (42.1-54.7s) */}
      <Sequence from={1264} durationInFrames={378}>
        <MoltScene4Earns />
      </Sequence>

      {/* Scene 5a: Not just freelance (54.7-61.1s) */}
      <Sequence from={1642} durationInFrames={190}>
        <MoltScene5a_FutureHiring />
      </Sequence>

      {/* Scene 5b: Role cards (61.1-71.4s) */}
      <Sequence from={1832} durationInFrames={311}>
        <MoltScene5OrgChart />
      </Sequence>

      {/* Scene 5c: Platform features (71.4-81.1s) */}
      <Sequence from={2143} durationInFrames={289}>
        <MoltScene5c_Platform />
      </Sequence>

      {/* Scene 6: Building for the Future (81.1-94.7s) */}
      <Sequence from={2432} durationInFrames={410}>
        <MoltScene6Timeline />
      </Sequence>

      {/* Scene 7: CTA (94.7-106.1s) — starts 1.4s earlier for sync */}
      <Sequence from={2842} durationInFrames={340}>
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
