import { Composition } from "remotion";
import { CrecimosVideo } from "./CrecimosVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CrecimosVideo"
        component={CrecimosVideo}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
