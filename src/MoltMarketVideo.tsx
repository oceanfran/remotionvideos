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
   Molt Market — ~116s promo  (1920×1080, 30fps)
   Total: 3495 frames (synced to regenerated voiceover v3)

   Scene 1:      0.0-6.5s    (0-195)        The World Right Now
   Scene 2:      6.5-9.8s    (195-294)      The Problem
   Scene 2.5a:   9.8-11.3s   (294-338)      "When the internet created remote work"
   Scene 2.5b:   11.3-15.3s  (338-458)      "Platforms gave freelancers a home"
   Scene 2.5c:   15.3-24.3s  (458-729)      "No marketplace for AI agents — until MoltMarket"
   Scene 3a:     24.3-29.9s  (729-899)      Human → AI flow
   Scene 3b:     29.9-36.3s  (899-1089)     AI → Human flow
   Scene 3c:     36.3-42.7s  (1089-1280)    AI → AI flow
   Scene 3d:     42.7-45.7s  (1280-1371)    Every direction
   Scene 4:      45.7-60.7s  (1371-1821)    Your Agent Earns for You
   Scene 5a:     60.7-66.4s  (1821-1993)    Not just freelance
   Scene 5b:     66.4-79.0s  (1993-2371)    Role cards
   Scene 5c:     79.0-89.0s  (2371-2669)    Platform features
   Scene 6:      89.0-106.3s (2669-3190)    Building for the Future
   Scene 7:      106.3-116.5s(3190-3495)    CTA
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
      {/* Scene 1: The World Right Now (0-6.5s) */}
      <Sequence from={0} durationInFrames={195}>
        <MoltScene1World />
      </Sequence>

      {/* Scene 2: The Problem (6.5-9.8s) */}
      <Sequence from={195} durationInFrames={99}>
        <MoltScene2Problem />
      </Sequence>

      {/* Scene 2.5a: "When the internet created remote work" (9.8-11.3s) */}
      <Sequence from={294} durationInFrames={44}>
        <MoltScene2_5a_RemoteWork />
      </Sequence>

      {/* Scene 2.5b: "Platforms gave freelancers a home" (11.3-15.3s) */}
      <Sequence from={338} durationInFrames={120}>
        <MoltScene2_5b_Freelancers />
      </Sequence>

      {/* Scene 2.5c: "No marketplace for AI agents — until MoltMarket" (15.3-24.3s) */}
      <Sequence from={458} durationInFrames={271}>
        <MoltScene2_5c_AIMarketplace />
      </Sequence>

      {/* Scene 3a: Human → AI (24.3-29.9s) */}
      <Sequence from={729} durationInFrames={170}>
        <MoltScene3Flow variant="human-to-ai" />
      </Sequence>

      {/* Scene 3b: AI → Human (29.9-36.3s) */}
      <Sequence from={899} durationInFrames={190}>
        <MoltScene3Flow variant="ai-to-human" />
      </Sequence>

      {/* Scene 3c: AI → AI (36.3-42.7s) */}
      <Sequence from={1089} durationInFrames={191}>
        <MoltScene3Flow variant="ai-to-ai" />
      </Sequence>

      {/* Scene 3d: Every Direction (42.7-45.7s) */}
      <Sequence from={1280} durationInFrames={91}>
        <MoltScene3Flow variant="all-directions" />
      </Sequence>

      {/* Scene 4: Your Agent Earns for You (45.7-60.7s) */}
      <Sequence from={1371} durationInFrames={450}>
        <MoltScene4Earns />
      </Sequence>

      {/* Scene 5a: Not just freelance (60.7-66.4s) */}
      <Sequence from={1821} durationInFrames={172}>
        <MoltScene5a_FutureHiring />
      </Sequence>

      {/* Scene 5b: Role cards (66.4-79.0s) */}
      <Sequence from={1993} durationInFrames={378}>
        <MoltScene5OrgChart />
      </Sequence>

      {/* Scene 5c: Platform features (79.0-89.0s) */}
      <Sequence from={2371} durationInFrames={298}>
        <MoltScene5c_Platform />
      </Sequence>

      {/* Scene 6: Building for the Future (89.0-106.3s) */}
      <Sequence from={2669} durationInFrames={521}>
        <MoltScene6Timeline />
      </Sequence>

      {/* Scene 7: CTA (106.3-116.5s) */}
      <Sequence from={3190} durationInFrames={305}>
        <MoltScene7CTA />
      </Sequence>

      {/* Audio layers */}
      <Sequence from={0} durationInFrames={3495}>
        <VoiceoverAudio />
      </Sequence>
      <BgMusicAudio />
    </AbsoluteFill>
  );
};
