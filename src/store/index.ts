import { configureStore } from "@reduxjs/toolkit";

import { gameStatusSlice } from "../model/gameStatus";
import { boardSlice } from "../model/board";
import { playerSlice } from "../model/player";

export const store = configureStore({
  reducer: {
    gameStatus: gameStatusSlice.reducer,
    board: boardSlice.reducer,
    player: playerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
