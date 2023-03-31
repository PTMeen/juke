import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Song } from "../../types/song";
import { db } from "../../firebase";
import { useAppSelector } from "../store";

interface SongsState {
  songs: Song[];
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: SongsState = {
  songs: [],
  isLoading: false,
  errorMessage: null,
};

export const fetchSongs = createAsyncThunk(
  "songs/fetchSongs",
  async (_, thunkApi) => {
    try {
      const songsCollection = collection(db, "songs");
      const songsSnapshot = await getDocs(songsCollection);
      let songs: Song[] = songsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Song[];
      return { songs };
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to fetch songs");
    }
  }
);

export const fetchMySongs = createAsyncThunk(
  "songs/fetchMySongs",
  async (uid: string, thunkApi) => {
    try {
      const songsCollection = collection(db, "songs");
      const q = query(songsCollection, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const songs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Song[];
      return { songs };
    } catch (error) {
      return thunkApi.rejectWithValue({
        errorMessage: "Failed to fetched your songs",
      });
    }
  }
);

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    addSong: (state, { payload }: { payload: Song }) => {
      state.songs.unshift(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchSongs.fulfilled,
        (state, action: PayloadAction<{ songs: Song[] }>) => {
          state.songs = action.payload.songs;
          state.isLoading = false;
        }
      )
      .addCase(fetchSongs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { addSong } = songsSlice.actions;
export default songsSlice.reducer;
