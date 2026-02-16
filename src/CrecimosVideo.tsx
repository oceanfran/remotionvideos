import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SceneHook } from "./scenes/SceneIntro";
import { SceneCost } from "./scenes/SceneCost";
import { SceneAIAnswering } from "./scenes/SceneAIAnswering";
import { SceneNoDoubleBook } from "./scenes/SceneNoDoubleBook";
import { SceneFlexibility } from "./scenes/SceneFlexibility";
import { SceneCRM } from "./scenes/SceneCRM";
import { SceneSetup } from "./scenes/SceneSetup";
import { SceneCTA } from "./scenes/SceneCTA";

/*
  60-second video · 30 fps · 1800 frames total

  Scene                  Seconds   Frames
  ─────────────────────  ────────  ──────
  1. The Hook            0–6       0–180
  2. The Cost            6–12      180–360
  3. AI Answering        12–24     360–720
  4. No Double Booking   24–28     720–840
  5. Flexibility         28–34     840–1020
  6. CRM + Bilingual     34–40     1020–1200
  7. Easy Setup          40–48     1200–1440
  8. CTA                 48–60     1440–1800
*/

export const CrecimosVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0F1117" }}>
      {/* Scene 1: The Hook — 0-6s */}
      <Sequence from={0} durationInFrames={180}>
        <SceneHook />
      </Sequence>

      {/* Scene 2: The Cost — 6-12s */}
      <Sequence from={180} durationInFrames={180}>
        <SceneCost />
      </Sequence>

      {/* Scene 3: AI Answering — 12-24s */}
      <Sequence from={360} durationInFrames={360}>
        <SceneAIAnswering />
      </Sequence>

      {/* Scene 4: No Double Booking — 24-28s */}
      <Sequence from={720} durationInFrames={120}>
        <SceneNoDoubleBook />
      </Sequence>

      {/* Scene 5: Flexibility — 28-34s */}
      <Sequence from={840} durationInFrames={180}>
        <SceneFlexibility />
      </Sequence>

      {/* Scene 6: CRM + Bilingual — 34-40s */}
      <Sequence from={1020} durationInFrames={180}>
        <SceneCRM />
      </Sequence>

      {/* Scene 7: Easy Setup — 40-48s */}
      <Sequence from={1200} durationInFrames={240}>
        <SceneSetup />
      </Sequence>

      {/* Scene 8: CTA — 48-60s */}
      <Sequence from={1440} durationInFrames={360}>
        <SceneCTA />
      </Sequence>

      {/* Voiceover — place voiceover.mp3 in public/ */}
      <VoiceoverAudio />

      {/* Background music — place bgmusic.mp3 in public/ */}
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
    return <Audio src={src} volume={0.15} />;
  } catch {
    return null;
  }
};
