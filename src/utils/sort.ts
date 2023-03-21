import { Song } from "../types/song";

const sortSongsByTitle = (songs: Song[]) => {
  return songs.sort((a, b) => a.title.localeCompare(b.title));
};

const sortSongsByUploadedDate = (songs: Song[]) => {
  const sortedSongs = songs.sort((a, b) => {
    return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
  });

  return sortedSongs;
};

export { sortSongsByUploadedDate, sortSongsByTitle };
