import { Composition } from "remotion";
import { CrecimosVideo } from "./CrecimosVideo";
import { MoltMarketVideo } from "./MoltMarketVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CrecimosVideo"
        component={CrecimosVideo}
        durationInFrames={1680}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MoltMarketVideo"
        component={MoltMarketVideo}
        durationInFrames={3495}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
