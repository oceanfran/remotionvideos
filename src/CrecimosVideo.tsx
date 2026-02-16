import { AbsoluteFill, Audio, Loop, Sequence, staticFile } from "remotion";
import { SceneHook } from "./scenes/SceneIntro";
import { SceneCost } from "./scenes/SceneCost";
import { SceneAIAnswering } from "./scenes/SceneAIAnswering";
import { SceneFlexibility } from "./scenes/SceneFlexibility";
import { SceneCRM } from "./scenes/SceneCRM";
import { SceneSetup } from "./scenes/SceneSetup";
import { SceneCTA } from "./scenes/SceneCTA";

/*
  56-second video · 30 fps · 1680 frames · 1080×1920 (9:16 vertical)

  Synced to new shortened script at 1.15x speed:

  Scene                  Seconds   Frames    Script segment
  ─────────────────────  ────────  ──────    ──────────────
  1. The Hook            0–5       0–150     "How many calls... Be honest."
  2. The Cost            5–14      150–420   "Every one of those callers... Gone."
  3. AI Answering        14–29     420–870   "Now imagine... actually show up."
  4. Flexibility         29–35     870–1050  "Set it to answer... to voicemail."
  5. CRM + Bilingual     35–42     1050–1260 "Built-in CRM... English and Spanish."
  6. Easy Setup          42–49     1260–1470 "Under 10 minutes... set it up."
  7. CTA                 49–56     1470–1680 "Sign up today at Crecimos.com."
*/

export const CrecimosVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      {/* Scene 1: The Hook — 0-5s */}
      <Sequence from={0} durationInFrames={150}>
        <SceneHook />
      </Sequence>

      {/* Scene 2: The Cost — 5-14s */}
      <Sequence from={150} durationInFrames={270}>
        <SceneCost />
      </Sequence>

      {/* Scene 3: AI Answering — 14-29s */}
      <Sequence from={420} durationInFrames={450}>
        <SceneAIAnswering />
      </Sequence>

      {/* Scene 4: Flexibility — 29-35s */}
      <Sequence from={870} durationInFrames={180}>
        <SceneFlexibility />
      </Sequence>

      {/* Scene 5: CRM + Bilingual — 35-42s */}
      <Sequence from={1050} durationInFrames={210}>
        <SceneCRM />
      </Sequence>

      {/* Scene 6: Easy Setup — 42-47s */}
      <Sequence from={1260} durationInFrames={150}>
        <SceneSetup />
      </Sequence>

      {/* Scene 7: CTA — 47-54s */}
      <Sequence from={1410} durationInFrames={210}>
        <SceneCTA />
      </Sequence>

      {/* Voiceover */}
      <VoiceoverAudio />

      {/* Background music */}
      <BgMusicAudio />
    </AbsoluteFill>
  );
};

const VoiceoverAudio: React.FC = () => {
  try {
    const src = staticFile("voiceover.mp3");
    return <Audio src={src} volume={1} />;
  } catch {
    return null;
  }
};

const BgMusicAudio: React.FC = () => {
  try {
    const src = staticFile("bgmusic.mp3");
    return (
      <Loop durationInFrames={900}>
        <Audio src={src} volume={0.12} />
      </Loop>
    );
  } catch {
    return null;
  }
};
