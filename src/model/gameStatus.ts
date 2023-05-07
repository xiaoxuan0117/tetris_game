import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameStatusState {
  isGameOver: boolean;
}

const initialState: GameStatusState = {
  isGameOver: true,
};

export const gameStatusSlice = createSlice({
  name: "GameStatus",
  initialState,
  reducers: {
    setIsGameOver: (state, action: PayloadAction<boolean>) => {
      state.isGameOver = action.payload;
    },
  },
});

export const { setIsGameOver } = gameStatusSlice.actions;

export default gameStatusSlice.reducer;
