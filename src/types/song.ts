export interface Song {
  title: string;
  uid: string;
  artist: string;
  genre: string;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
  cover?: string;
}

export interface FilterOptions {
  title: string;
  artist: string;
  genre: string;
  sort: "title" | "uploadedDate";
}
