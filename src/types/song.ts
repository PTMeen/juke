export interface Song {
  id: string;
  title: string;
  uid: string;
  artist?: string[];
  genres?: string[];
  uploadedAt: string;
  uploadedBy: string;
  url: string;
  cover?: string;
}
