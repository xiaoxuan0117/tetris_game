import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaultCell, Cell } from "../static/cell";
import { Tetromino } from "./player";

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


export const buildBoard = ({ row, column, position, shape, className="" }: { row: number; column: number, position:{y: number, x: number},  shape?: number[][], className?: string}) => {
  let buildRows: (typeof defaultCell)[][] = Array.from(
    { length: row },
    () => Array.from({ length: column }, () => ({ ...defaultCell }))
  );

  if(shape){
    buildRows = transferShapeToBoard(buildRows, position, shape, className);
  }

  return buildRows;
}

const transferShapeToBoard = (board: Cell[][], position: {y: number, x: number}, shape: number[][], className: string) => {
  shape.forEach((row: number[], y: number) => {row.forEach((cell: number, x: number) => {
    if(cell){
      const shapePositionY = y + position.y;
      const shapePositionX = x + position.x;
      board[shapePositionY][shapePositionX] = {occupied: true, className};
    }
  })})
  return board;
}

export const boardSlice = createSlice({
  name: "Board",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<{ row: number, column: number, tetromino: Tetromino }>) => {
      const {row, column, tetromino} = action.payload;
      const rows = buildBoard({row, column, position: {y: 0, x: 4},  shape: tetromino.shape, className: tetromino.className});
      state.rows = rows;
    },
  },
});

export const { setRows } = boardSlice.actions;

export default boardSlice.reducer;
