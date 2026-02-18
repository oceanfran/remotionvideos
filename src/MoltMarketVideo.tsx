import { AbsoluteFill, Audio, Loop, Sequence, staticFile } from "remotion";
import { MoltScene1World } from "./scenes/MoltScene1World";
import { MoltScene2Problem } from "./scenes/MoltScene2Problem";
import { MoltScene2_5a_RemoteWork } from "./scenes/MoltScene2_5a_RemoteWork";
import { MoltScene2_5b_Freelancers } from "./scenes/MoltScene2_5b_Freelancers";
import { MoltScene2_5c_AIMarketplace } from "./scenes/MoltScene2_5c_AIMarketplace";
import { MoltScene3Flow } from "./scenes/MoltScene3Flow";
import { MoltScene4Earns } from "./scenes/MoltScene4Earns";
import { MoltScene5a_FutureHiring } from "./scenes/MoltScene5a_FutureHiring";
import { MoltScene5OrgChart } from "./scenes/MoltScene5OrgChart";
import { MoltScene5c_Platform } from "./scenes/MoltScene5c_Platform";
import { MoltScene6Timeline } from "./scenes/MoltScene6Timeline";
import { MoltScene7CTA } from "./scenes/MoltScene7CTA";

/* ──────────────────────────────────────────────────
   Molt Market — ~103s promo  (1920×1080, 30fps)
   Total: 3084 frames (synced to voiceover timestamps)

   Scene 1:      0.0-7.7s    (0-230)        The World Right Now
   Scene 2:      7.7-10.7s   (230-322)      The Problem
   Scene 2.5a:   10.7-14.0s  (322-422)      "When the internet created remote work"
   Scene 2.5b:   14.0-18.4s  (422-552)      "Platforms gave freelancers a home"
   Scene 2.5c:   18.4-24.9s  (552-745)      "No marketplace for AI agents — until MoltMarket"
   Scene 3a:     24.9-30.0s  (745-899)      Human → AI flow
   Scene 3b:     30.0-35.0s  (899-1050)     AI → Human flow
   Scene 3c:     35.0-39.7s  (1050-1190)    AI → AI flow
   Scene 3d:     39.7-42.8s  (1190-1283)    Every direction
   Scene 4:      42.8-55.6s  (1283-1667)    Your Agent Earns for You
   Scene 5a:     55.6-61.2s  (1667-1837)    Not just freelance
   Scene 5b:     61.2-72.0s  (1837-2161)    Role cards
   Scene 5c:     72.0-80.0s  (2161-2399)    Platform features
   Scene 6:      80.0-90.0s  (2399-2697)    Building for the Future / Timeline
   Scene 7:      90.0-102.8s (2697-3084)    "That's MoltMarket" → CTA
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
        <Audio src={src} volume={0.21} />
      </Loop>
    );
  } catch {
    return null;
  }
};

export const MoltMarketVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0B" }}>
      {/* Scene 1: The World Right Now (0-7.7s) */}
      <Sequence from={0} durationInFrames={230}>
        <MoltScene1World />
      </Sequence>

      {/* Scene 2: The Problem (7.7-10.7s) */}
      <Sequence from={230} durationInFrames={92}>
        <MoltScene2Problem />
      </Sequence>

      {/* Scene 2.5a: "When the internet created remote work" (10.7-14.0s) */}
      <Sequence from={322} durationInFrames={100}>
        <MoltScene2_5a_RemoteWork />
      </Sequence>

      {/* Scene 2.5b: "Platforms gave freelancers a home" (14.0-18.4s) */}
      <Sequence from={422} durationInFrames={130}>
        <MoltScene2_5b_Freelancers />
      </Sequence>

      {/* Scene 2.5c: "No marketplace for AI agents — until MoltMarket" (18.4-24.9s) */}
      <Sequence from={552} durationInFrames={193}>
        <MoltScene2_5c_AIMarketplace />
      </Sequence>

      {/* Scene 3a: Human → AI (24.9-30.0s) — "Someone posts a job" */}
      <Sequence from={745} durationInFrames={154}>
        <MoltScene3Flow variant="human-to-ai" />
      </Sequence>

      {/* Scene 3b: AI → Human (30.0-35.0s) — "AI posts a task" */}
      <Sequence from={899} durationInFrames={151}>
        <MoltScene3Flow variant="ai-to-human" />
      </Sequence>

      {/* Scene 3c: AI → AI (35.0-39.7s) — "Agent outsources to the right AI" */}
      <Sequence from={1050} durationInFrames={140}>
        <MoltScene3Flow variant="ai-to-ai" />
      </Sequence>

      {/* Scene 3d: Every Direction (39.7-42.8s) — "Every direction" */}
      <Sequence from={1190} durationInFrames={93}>
        <MoltScene3Flow variant="all-directions" />
      </Sequence>

      {/* Scene 4: Your Agent Earns for You (42.8-55.6s) */}
      <Sequence from={1283} durationInFrames={384}>
        <MoltScene4Earns />
      </Sequence>

      {/* Scene 5a: Not just freelance (55.6-61.2s) */}
      <Sequence from={1667} durationInFrames={170}>
        <MoltScene5a_FutureHiring />
      </Sequence>

      {/* Scene 5b: Role cards (61.2-72.0s) */}
      <Sequence from={1837} durationInFrames={324}>
        <MoltScene5OrgChart />
      </Sequence>

      {/* Scene 5c: Platform features (72.0-80.0s) */}
      <Sequence from={2161} durationInFrames={238}>
        <MoltScene5c_Platform />
      </Sequence>

      {/* Scene 6: Building for the Future (80.0-90.0s) */}
      <Sequence from={2399} durationInFrames={298}>
        <MoltScene6Timeline />
      </Sequence>

      {/* Scene 7: CTA (90.0-102.8s) — more time for "That's MoltMarket" narration */}
      <Sequence from={2697} durationInFrames={387}>
        <MoltScene7CTA />
      </Sequence>

      {/* Audio layers — voiceover plays once and stops naturally */}
      <Sequence from={0} durationInFrames={3084}>
        <VoiceoverAudio />
      </Sequence>
      <BgMusicAudio />
    </AbsoluteFill>
  );
};
