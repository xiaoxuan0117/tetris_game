import { configureStore } from "@reduxjs/toolkit";

import { gameStatusSlice } from "../model/gameStatus";

export const store = configureStore({
  reducer: {
    gameStatus: gameStatusSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
