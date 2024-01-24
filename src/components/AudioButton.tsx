import { useCallback, useEffect, useMemo, useState } from "react";
import ST from "../assets/audio/champions_anthem.mp3";
import play_icon from "../assets/img/icons/play.png";
import stop_icon from "../assets/img/icons/stop.png";

export default function AudioButton() {
  const ost: HTMLAudioElement = useMemo(() => new Audio(ST), []);
  const [active, setActive] = useState(false);

  const handlePlay: VoidFunction = () => {
    setActive(!active);
  };

  const reset: VoidFunction = useCallback(() => {
    if (ost) {
      ost.pause();
      ost.currentTime = 0;
    }
  }, [ost]);

  useEffect(() => {
    if (ost) {
      if (active) {
        ost.volume = 0.1;
        ost.play();
        ost.loop = true;
      } else {
        reset();
      }
    }
    return () => reset();
  }, [active, ost, reset]);

  return (
    <div className="transition-all">
      <div onClick={() => handlePlay()}>
        {active ? (
          <img src={stop_icon} alt="stop" className="w-6" />
        ) : (
          <img src={play_icon} alt="play" className="w-6" />
        )}
      </div>
    </div>
  );
}
