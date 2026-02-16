import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneProblem } from "./scenes/SceneProblem";
import { SceneSolution } from "./scenes/SceneSolution";
import { SceneFeatures } from "./scenes/SceneFeatures";
import { SceneHowItWorks } from "./scenes/SceneHowItWorks";
import { SceneResults } from "./scenes/SceneResults";
import { SceneCTA } from "./scenes/SceneCTA";

export const CrecimosVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0F" }}>
      {/* Scene 1: Intro / Logo Reveal - 0 to 4s */}
      <Sequence from={0} durationInFrames={120}>
        <SceneIntro />
      </Sequence>

      {/* Scene 2: The Problem - 4s to 9s */}
      <Sequence from={120} durationInFrames={150}>
        <SceneProblem />
      </Sequence>

      {/* Scene 3: The Solution - 9s to 14s */}
      <Sequence from={270} durationInFrames={150}>
        <SceneSolution />
      </Sequence>

      {/* Scene 4: Key Features - 14s to 20s */}
      <Sequence from={420} durationInFrames={180}>
        <SceneFeatures />
      </Sequence>

      {/* Scene 5: How It Works - 20s to 24s */}
      <Sequence from={600} durationInFrames={120}>
        <SceneHowItWorks />
      </Sequence>

      {/* Scene 6: Results / Stats - 24s to 27s */}
      <Sequence from={720} durationInFrames={90}>
        <SceneResults />
      </Sequence>

      {/* Scene 7: CTA - 27s to 30s */}
      <Sequence from={810} durationInFrames={90}>
        <SceneCTA />
      </Sequence>

      {/* Voiceover audio - place voiceover.mp3 in public/ folder */}
      <VoiceoverAudio />
    </AbsoluteFill>
  );
};

const VoiceoverAudio: React.FC = () => {
  try {
    const src = staticFile("voiceover.mp3");
    return <Audio src={src} />;
  } catch {
    return null;
  }
};
