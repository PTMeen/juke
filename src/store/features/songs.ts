import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

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

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {},
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

export default songsSlice.reducer;
