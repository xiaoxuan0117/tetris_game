import { configureStore } from "@reduxjs/toolkit";

import { gameStatusSlice } from "../model/gameStatus";
import { boardSlice } from "../model/board";

export const store = configureStore({
  reducer: {
    gameStatus: gameStatusSlice.reducer,
    board: boardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
