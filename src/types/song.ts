export interface Song {
  id: string;
  title: string;
  uid: string;
  artist: string;
  genre: string;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
  cover?: string;
}

export interface UpdateSongData {
  id: string;
  title: string;
  artist: string;
  genre: string;
  cover: File | null | undefined;
  audio: File | null | undefined;
}

export interface FilterOptions {
  title: string;
  artist: string;
  genre: string;
  sort: "title" | "uploadedDate";
}
