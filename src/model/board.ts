import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaultCell, Cell } from "../static/cell";
import { Tetromino } from "./player";

export interface BoardState {
  size: {
    row: number;
    column: number;
  };
  rows: (typeof defaultCell)[][];
  level: number;
  lines: number;
  points: number;
}

const initialState: BoardState = {
  size: {
    row: 20,
    column: 10,
  },
  rows: [],
  level: 0,
  lines: 0,
  points: 0,
};

export const buildBoard = ({
  row,
  column,
  collided,
  position,
  shape,
  className = "",
  preRows,
}: {
  row: number;
  column: number;
  collided: boolean;
  position: { y: number; x: number };
  shape?: number[][];
  className?: string;
  preRows?: Cell[][];
}) => {
  let buildRows: (typeof defaultCell)[][] = [];
  if (preRows?.length) {
    buildRows = preRows.map((row) =>
      row.map((cell) => (cell.occupied ? { ...cell } : { ...defaultCell }))
    );
  } else {
    buildRows = Array.from({ length: row }, () =>
      Array.from({ length: column }, () => ({ ...defaultCell }))
    );
  }

  if (shape) {
    buildRows = transferShapeToBoard(
      buildRows,
      collided,
      position,
      shape,
      className
    );
  }

  return buildRows;
};

const clearLine = (buildRows: Cell[][]) => {
  const clearedRows = [];
  let clearedLines: number = 0;
  for (let y = 0; y < buildRows.length; y++) {
    if (buildRows[y].every((cell) => cell.occupied)) {
      clearedLines += 1;
      clearedRows.unshift(
        Array.from({ length: buildRows[y].length }, () => ({ ...defaultCell }))
      );
    } else {
      clearedRows.push(buildRows[y]);
    }
  }

  return { lines: clearedLines, rows: clearedRows };
};

const transferShapeToBoard = (
  board: Cell[][],
  collided: boolean,
  position: { y: number; x: number },
  shape: number[][],
  className: string
) => {
  shape.forEach((row: number[], y: number) => {
    row.forEach((cell: number, x: number) => {
      if (cell) {
        const shapePositionY = y + position.y;
        const shapePositionX = x + position.x;
        const boardCell =
          board[shapePositionY] &&
          board[shapePositionY][shapePositionX] &&
          board[shapePositionY][shapePositionX];
        if (boardCell && !boardCell.occupied) {
          board[shapePositionY][shapePositionX] = {
            occupied: collided,
            className,
          };
        } else {
          board = [];
        }
      }
    });
  });
  return board;
};

export const boardSlice = createSlice({
  name: "Board",
  initialState,
  reducers: {
    setRows: (
      state,
      action: PayloadAction<{
        row: number;
        column: number;
        collided?: boolean;
        position: { y: number; x: number };
        tetromino: Tetromino;
      }>
    ) => {
      const {
        row,
        column,
        collided,
        position: { y, x },
        tetromino,
      } = action.payload;
      const rows = buildBoard({
        row,
        column,
        collided: collided || false,
        position: { y, x },
        shape: tetromino.shape,
        className: tetromino.className,
        preRows: state.rows,
      });

      const { lines, rows: clearedRows } = clearLine(rows);
      if (clearedRows.length) {
        state.rows = clearedRows;
      } else {
        state.rows = buildBoard({
          row,
          column,
          collided: false,
          position: { y, x },
          shape: tetromino.shape,
          className: tetromino.className,
          preRows: [],
        });
      }

      state.level = Math.floor(state.lines / 10);
      state.lines += lines;
      state.points += lines * 100;
    },
  },
});

export const { setRows } = boardSlice.actions;

export default boardSlice.reducer;
