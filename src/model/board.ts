import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaultCell, Cell } from "../static/cell";
import { Tetromino} from "./player";

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


export const buildBoard = ({ row, column, shape, className="" }: { row: number; column: number, shape?: number[][], className?: string}) => {
  let buildRows: (typeof defaultCell)[][] = Array.from(
    { length: row },
    () => Array.from({ length: column }, () => ({ ...defaultCell }))
  );

  if(shape){
    buildRows = transferShapeToBoard(buildRows, shape, {row: 0, column: 0}, className);
  }

  return buildRows;
}

const transferShapeToBoard = (board: Cell[][], shape: number[][], position: {row: number, column: number}, className: string) => {
  shape.forEach((row: number[], y: number) => {row.forEach((cell: number, x: number) => {
    if(cell){
      const shapePositionY = y + position.row;
      const shapePositionX = x + position.column;
      board[shapePositionY][shapePositionX] = {occupied: true, className};
    }
  })})
  return board;
}

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
