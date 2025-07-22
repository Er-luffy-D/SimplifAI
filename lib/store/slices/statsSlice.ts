import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatsState {
  totalUsers: number;
  totalParsedDocuments: number;
  totalFlashcards: number;
}

const initialState: StatsState = {
  totalUsers: 0,
  totalParsedDocuments: 0,
  totalFlashcards: 0,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setStats(state, action: PayloadAction<StatsState>) {
      state.totalUsers = action.payload.totalUsers;
      state.totalParsedDocuments = action.payload.totalParsedDocuments;
      state.totalFlashcards = action.payload.totalFlashcards;
    },
    resetStats(state) {
      state.totalUsers = 0;
      state.totalParsedDocuments = 0;
      state.totalFlashcards = 0;
    },
  },
});

export const { setStats, resetStats } = statsSlice.actions;
export default statsSlice.reducer;
