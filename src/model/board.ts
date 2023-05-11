import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaultCell, Cell } from "../static/cell";
import { quickDownPosition, Tetromino } from "./player";

export interface BoardState {
  size: {
    row: number;
    column: number;
  };
  rows: (typeof defaultCell)[][];
  level: number;
  lines: number;
  points: number;
  isGameOver: boolean;
  isPaused: boolean;
  failed: boolean;
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
  isGameOver: true,
  isPaused: false,
  failed: false,
};

export const buildBoard = ({
  row,
  column,
  collided,
  position,
  shape,
  className = "",
  preRows,
  ghost,
}: {
  row: number;
  column: number;
  collided: boolean;
  position: { y: number; x: number };
  shape: number[][];
  className: string;
  preRows?: Cell[][];
  ghost?: boolean;
}) => {
  let buildRows: (typeof defaultCell)[][] = [];
  let buildRowseWithGhost: (typeof defaultCell)[][] = [];
  let buildRowseWithCurrentShape: (typeof defaultCell)[][] = [];
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
    if (ghost) {
      const ghostPositionY = quickDownPosition(
        position.y,
        position.x,
        buildRows,
        shape
      );

      buildRowseWithGhost = transferShapeToBoard(
        buildRows,
        false,
        { y: position.y + ghostPositionY - 1, x: position.x },
        shape,
        "ghost"
      );
    }

    buildRowseWithCurrentShape = transferShapeToBoard(
      buildRowseWithGhost,
      collided,
      position,
      shape,
      className
    );
  }

  if (buildRowseWithCurrentShape.length) {
    return { failed: false, rows: buildRowseWithCurrentShape };
  } else {
    return { failed: true, rows: buildRows };
  }
};

export const buildPreviewRows = ({
  row,
  column,
  position,
  shape,
  className = "",
}: {
  row: number;
  column: number;
  position: { y: number; x: number };
  shape: number[][];
  className: string;
}) => {
  let buildRows: (typeof defaultCell)[][] = [];
  buildRows = Array.from({ length: row }, () =>
    Array.from({ length: column }, () => ({ ...defaultCell }))
  );

  if (shape) {
    buildRows = transferShapeToBoard(
      buildRows,
      false,
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

const storeScore = (score: number) => {
  let scores = localStorage.getItem("scores");
  if (scores) {
    const currentScores = scores ? JSON.parse(scores) : null;
    const insertIndex = currentScores?.findIndex((s: number) => s < score);

    if (insertIndex === -1) {
      currentScores.push(score);
    } else {
      currentScores.splice(insertIndex, 0, score);
    }

    localStorage.setItem("scores", JSON.stringify(currentScores.slice(0, 5)));
  } else {
    localStorage.setItem("scores", JSON.stringify([score]));
  }
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
      const { failed, rows } = buildBoard({
        row,
        column,
        collided: collided || false,
        position: { y, x },
        shape: tetromino.shape,
        className: tetromino.className,
        preRows: state.rows,
        ghost: true,
      });

      const { lines, rows: clearedRows } = clearLine(rows);
      state.rows = clearedRows;

      if (!failed) {
        state.level = Math.floor(state.lines / 10);
        state.lines += lines;
        state.points += lines * 100;
      } else {
        storeScore(state.points);
        state.isPaused = true;
        state.failed = true;
        state.level = 0;
        state.lines = 0;
        state.points = 0;
      }
    },
    setIsGameOver: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.isPaused = false;
        state.failed = false;
        state.rows = [];
      }
      state.isGameOver = action.payload;
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    newGame: (
      state,
      action: PayloadAction<{
        row: number;
        column: number;
        position: { y: number; x: number };
        tetromino: Tetromino;
      }>
    ) => {
      const {
        row,
        column,
        position: { y, x },
        tetromino,
      } = action.payload;
      const { rows } = buildBoard({
        row,
        column,
        collided: false,
        position: { y, x },
        shape: tetromino.shape,
        className: tetromino.className,
        preRows: [],
      });
      state.rows = rows;
      state.isPaused = false;
      state.failed = false;
      state.level = 0;
      state.lines = 0;
      state.points = 0;
    },
  },
});

export const { setRows, setIsGameOver, setIsPaused, newGame } =
  boardSlice.actions;

export default boardSlice.reducer;
