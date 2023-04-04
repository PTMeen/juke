import { ReactNode, createContext, useContext, useState } from "react";
import { Howl } from "howler";
import { Song } from "../types/song";

type PlayerContextType = {
  currentSong: Song | null;
  selectSong: (song: Song) => void;
  pauseSong: () => void;
  stopSong: () => void;
  resumeSong: () => void;
  seek: number;
  isPlaying: boolean;
  duration: number;
  onChangeSeek: (seek: number) => void;
  restartSong: () => void;
};

const PlayerContext = createContext<PlayerContextType>({
  currentSong: null,
  selectSong: (song) => {},
  pauseSong: () => {},
  stopSong: () => {},
  resumeSong: () => {},
  seek: 0,
  duration: 0,
  isPlaying: false,
  onChangeSeek: (seek) => {},
  restartSong: () => {},
});

const PlayerContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [sound, setSound] = useState<Howl | null>(null);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectSong = (song: Song) => {
    setCurrentSong(song);

    if (sound) {
      sound.stop();
      setSound(null);
    }

    let seekInterval: any;
    const newSound = new Howl({
      src: [song.url],
      html5: true,
      onload: () => {
        setDuration(newSound.duration());
      },
      onplay: () => {
        seekInterval = setInterval(() => {
          setSeek(newSound.seek());
        }, 300);
        setIsPlaying(true);
      },
      onend: () => {
        clearInterval(seekInterval);
        setIsPlaying(false);
      },
      onstop: () => {
        clearInterval(seekInterval);
        setIsPlaying(false);
      },
      onpause: () => {
        clearInterval(seekInterval);
        setIsPlaying(false);
      },
    });
    newSound.play();
    setSound(newSound);
  };

  const resumeSong = () => {
    if (sound instanceof Howl) {
      sound.seek(seek);
      sound.play();
    }
  };

  const pauseSong = () => {
    if (sound instanceof Howl) {
      sound.pause();
    }
  };

  const stopSong = () => {
    if (sound instanceof Howl) {
      sound.stop();
      setSound(null);
      setCurrentSong(null);
    }
  };

  const onChangeSeek = (seek: number) => {
    setSeek(seek);
  };

  const restartSong = () => {
    if (sound instanceof Howl) {
      sound.seek(0);
      sound.play();
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        selectSong,
        pauseSong,
        stopSong,
        seek,
        isPlaying,
        duration,
        resumeSong,
        onChangeSeek,
        restartSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayerContext = () => useContext(PlayerContext);

export { PlayerContextProvider, usePlayerContext };
