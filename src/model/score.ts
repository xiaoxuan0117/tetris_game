import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScoreState {
  level: number;
  linesToLevel: number;
  points: number;
}

const initialState: ScoreState = {
  level: 0,
  linesToLevel: 0,
  points: 0,
};

export const scoreSlice = createSlice({
  name: "Score",
  initialState,
  reducers: {},
});

export const {} = scoreSlice.actions;

export default scoreSlice.reducer;
