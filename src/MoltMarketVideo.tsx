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
   Molt Market — ~99s promo  (1920×1080, 30fps)
   Total: 2972 frames (synced to regenerated voiceover)

   Scene 1:      0.0-6.5s    (0-194)        The World Right Now
   Scene 2:      6.5-9.7s    (194-290)      The Problem
   Scene 2.5a:   9.7-13.0s   (290-390)      "When the internet created remote work"
   Scene 2.5b:   13.0-17.3s  (390-520)      "Platforms gave freelancers a home"
   Scene 2.5c:   17.3-23.5s  (520-706)      "No marketplace for AI agents — until MoltMarket"
   Scene 3a:     23.5-28.5s  (706-856)      Human → AI flow
   Scene 3b:     28.5-33.8s  (856-1014)     AI → Human flow
   Scene 3c:     33.8-39.1s  (1014-1173)    AI → AI flow
   Scene 3d:     39.1-41.7s  (1173-1251)    Every direction
   Scene 4:      41.7-54.7s  (1251-1642)    Your Agent Earns for You
   Scene 5a:     54.7-60.0s  (1642-1800)    Not just freelance
   Scene 5b:     60.0-70.2s  (1800-2107)    Role cards
   Scene 5c:     70.2-77.3s  (2107-2320)    Platform features
   Scene 6:      77.3-89.5s  (2320-2684)    Building for the Future
   Scene 7:      89.5-99.1s  (2684-2972)    CTA
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
      <Sequence from={0} durationInFrames={194}>
        <MoltScene1World />
      </Sequence>

      {/* Scene 2: The Problem (6.5-9.7s) */}
      <Sequence from={194} durationInFrames={96}>
        <MoltScene2Problem />
      </Sequence>

      {/* Scene 2.5a: "When the internet created remote work" (9.7-13.0s) */}
      <Sequence from={290} durationInFrames={100}>
        <MoltScene2_5a_RemoteWork />
      </Sequence>

      {/* Scene 2.5b: "Platforms gave freelancers a home" (13.0-17.3s) */}
      <Sequence from={390} durationInFrames={130}>
        <MoltScene2_5b_Freelancers />
      </Sequence>

      {/* Scene 2.5c: "No marketplace for AI agents — until MoltMarket" (17.3-23.5s) */}
      <Sequence from={520} durationInFrames={186}>
        <MoltScene2_5c_AIMarketplace />
      </Sequence>

      {/* Scene 3a: Human → AI (23.5-28.5s) */}
      <Sequence from={706} durationInFrames={150}>
        <MoltScene3Flow variant="human-to-ai" />
      </Sequence>

      {/* Scene 3b: AI → Human (28.5-33.8s) */}
      <Sequence from={856} durationInFrames={158}>
        <MoltScene3Flow variant="ai-to-human" />
      </Sequence>

      {/* Scene 3c: AI → AI (33.8-39.1s) */}
      <Sequence from={1014} durationInFrames={159}>
        <MoltScene3Flow variant="ai-to-ai" />
      </Sequence>

      {/* Scene 3d: Every Direction (39.1-41.7s) */}
      <Sequence from={1173} durationInFrames={78}>
        <MoltScene3Flow variant="all-directions" />
      </Sequence>

      {/* Scene 4: Your Agent Earns for You (41.7-54.7s) */}
      <Sequence from={1251} durationInFrames={391}>
        <MoltScene4Earns />
      </Sequence>

      {/* Scene 5a: Not just freelance (54.7-60.0s) */}
      <Sequence from={1642} durationInFrames={158}>
        <MoltScene5a_FutureHiring />
      </Sequence>

      {/* Scene 5b: Role cards (60.0-70.2s) */}
      <Sequence from={1800} durationInFrames={307}>
        <MoltScene5OrgChart />
      </Sequence>

      {/* Scene 5c: Platform features (70.2-77.3s) */}
      <Sequence from={2107} durationInFrames={213}>
        <MoltScene5c_Platform />
      </Sequence>

      {/* Scene 6: Building for the Future (77.3-89.5s) */}
      <Sequence from={2320} durationInFrames={364}>
        <MoltScene6Timeline />
      </Sequence>

      {/* Scene 7: CTA (89.5-99.1s) */}
      <Sequence from={2684} durationInFrames={288}>
        <MoltScene7CTA />
      </Sequence>

      {/* Audio layers */}
      <Sequence from={0} durationInFrames={2972}>
        <VoiceoverAudio />
      </Sequence>
      <BgMusicAudio />
    </AbsoluteFill>
  );
};
