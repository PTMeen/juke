import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import build from "lottie-react";
import { db } from "../../firebase";
import { Song } from "../../types/song";

interface MySonsState {
  mySongs: Song[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: MySonsState = {
  mySongs: [],
  isLoading: false,
  errorMessage: "",
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

const mySongsSlice = createSlice({
  name: "mySongs",
  initialState,
  reducers: {
    resetMySongs: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserSongs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserSongs.fulfilled, (state, action) => {
      const songs = action.payload.songs;
      state.mySongs = songs;
      state.isLoading = false;
    });
    builder.addCase(fetchUserSongs.rejected, (state, action) => {
      state.errorMessage = action.payload as string;
      state.isLoading = false;
    });
  },
});

export const { resetMySongs } = mySongsSlice.actions;
export default mySongsSlice.reducer;
