import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { string } from "yup";
import { db, storage } from "../../firebase";
import { Song } from "../../types/song";

interface MySonsState {
  mySongs: Song[];
  isLoading: boolean;
  errorMessage: string;
  isDeleting: boolean;
  isUpdating: boolean;
}

const initialState: MySonsState = {
  mySongs: [],
  isLoading: true,
  errorMessage: "",
  isDeleting: false,
  isUpdating: false,
};

export const fetchUserSongs = createAsyncThunk(
  "mySongs/fetchUserSongs",
  async (uid: string, thunkApi) => {
    try {
      const songsCol = collection(db, "songs");
      const q = query(songsCol, where("uid", "==", uid));
      const snapshot = await getDocs(q);
      const songs: Song[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Song[];
      return { songs };
    } catch (error) {
      return thunkApi.rejectWithValue("Error fetching your songs");
    }
  }
);

export const deleteSong = createAsyncThunk(
  "mySongs/deleteSongs",
  async (song: Song, thunkApi) => {
    try {
      const { id } = song;
      const songRef = doc(db, "songs", id);
      const audioFileRef = ref(storage, `songs/${id}`);
      const coverImageRef = ref(storage, `thumbnails/${id}`);
      await deleteObject(coverImageRef);
      await deleteObject(audioFileRef);
      await deleteDoc(songRef);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue("Error deleting song");
    }
  }
);

interface UpdateSongPayload {
  id: string;
  title: string;
  artist: string;
  genre: string;
}

const mySongsSlice = createSlice({
  name: "mySongs",
  initialState,
  reducers: {
    resetMySongs: (state) => {
      return initialState;
    },
    addMySong: (state, action) => {
      state.mySongs.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSongs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserSongs.fulfilled, (state, action) => {
        const songs = action.payload.songs;
        state.mySongs = songs;
        state.isLoading = false;
      })
      .addCase(fetchUserSongs.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
        state.isLoading = false;
      })
      .addCase(deleteSong.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        const filteredSongs = state.mySongs.filter(
          (song) => song.id !== action.payload
        );
        state.mySongs = filteredSongs;
        state.isDeleting = false;
      });
  },
});

export const { resetMySongs, addMySong } = mySongsSlice.actions;
export default mySongsSlice.reducer;
