import { useCallback, useState } from "react";
import { VideoCam } from "./VideoCam";
import { Init } from "./Init";
import { Preview } from "./Preview";

enum Screens {
  INIT,
  CAMERA,
  PREVIEW,
  SEND,
}
export const ScreenHandler = () => {
  const [photo, setPhoto] = useState("");
  const [screen, setScreen] = useState<Screens>(Screens.INIT);

  const goInit = useCallback(() => setScreen(Screens.INIT), []);
  const goCamera = useCallback(() => {
    setPhoto("");
    setScreen(Screens.CAMERA);
  }, []);
  const goPreview = useCallback((photo: string) => {
    setPhoto(photo);
    setScreen(Screens.PREVIEW);
  }, []);

  if (screen === Screens.INIT) {
    return <Init goCamera={goCamera} />;
  }
  if (screen === Screens.CAMERA) {
    return <VideoCam goInit={goInit} goPreview={goPreview} />;
  }
  if (screen === Screens.PREVIEW) {
    return <Preview goCamera={goCamera} photo={photo} />;
  }

  return null;
};
