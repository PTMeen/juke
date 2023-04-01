export interface NewComment {
  postedBy: {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
  };
  postedAt: string;
  content: string;
  songId: string;
}

export interface Comment {
  postedBy: {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
  };
  postedAt: string;
  content: string;
  songId: string;
  id: string;
}
