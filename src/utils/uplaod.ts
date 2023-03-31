import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const uploadAudio = async (songId: string, audioFile: File) => {
  const songStorage = ref(storage, `/songs/${songId}`);
  const songUploadTask = await uploadBytesResumable(songStorage, audioFile);
  const songUrl = await getDownloadURL(songUploadTask.ref);
  return songUrl;
};

const uploadThumbnail = async (songId: string, thumbnailImg: File) => {
  const thumbnailStorage = ref(storage, `/thumbnails/${songId}`);
  const thumbnailLoadTask = await uploadBytesResumable(
    thumbnailStorage,
    thumbnailImg
  );
  const thumbnailUrl = await getDownloadURL(thumbnailLoadTask.ref);
  return thumbnailUrl;
};

export { uploadAudio, uploadThumbnail };
