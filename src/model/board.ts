import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaultCell } from "../static/cell";

export interface BoardState {
  size: {
    row: number;
    column: number;
  };
  rows: (typeof defaultCell)[][];
}

const initialState: BoardState = {
  size: {
    row: 20,
    column: 10,
  },
  rows: [],
};

export const boardSlice = createSlice({
  name: "Board",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<(typeof defaultCell)[][]>) => {
      state.rows = action.payload;
    },
  },
});

export const { setRows } = boardSlice.actions;

export default boardSlice.reducer;
