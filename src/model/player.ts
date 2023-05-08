import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cell } from "../static/cell";

export interface PlayerState {
  collided: boolean;
  isFastDrop: boolean;
  position: { y: number; x: number };
  tetromino: Tetromino;
  tetrominoes: Tetromino[];
}

const initialState: PlayerState = {
  collided: false,
  isFastDrop: false,
  position: { y: 0, x: 4 },
  tetromino: { shape: [], className: "" },
  tetrominoes: [],
};

export interface Tetromino {
  shape: number[][];
  className: string;
}

export interface Tetrominos {
  [key: string]: Tetromino;
}

const className = "tetromino";

export const tetrominos: Tetrominos = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    className: `${className}__i`,
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    className: `${className}__j`,
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    className: `${className}__l`,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    className: `${className}__o`,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    className: `${className}__s`,
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    className: `${className}__t`,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    className: `${className}__z`,
  },
};

const randomTetromino = (): Tetromino => {
  const keys = Object.keys(tetrominos);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  return tetrominos[key];
};

const isWithinBoard = (
  shape: number[][],
  position: { y: number; x: number },
  rows: Cell[][]
): boolean => {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        if (!rows[y + position.y] || !rows[y + position.y][x + position.x]) {
          return false;
        }
      }
    }
  }
  return true;
};

const isCollided = (
  shape: number[][],
  position: { y: number; x: number },
  rows: Cell[][]
): boolean => {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        if (
          rows[y + position.y] &&
          rows[y + position.y][x + position.x] &&
          rows[y + position.y][x + position.x].occupied
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export const playerSlice = createSlice({
  name: "Player",
  initialState,
  reducers: {
    setPlayerTetrominoes: (state, action: PayloadAction<number>) => {
      const tetrominoes = [];
      for (let i = 0; i < action.payload; i++) {
        tetrominoes.push(randomTetromino());
      }
      state.tetromino = tetrominoes.pop() as Tetromino;
      state.tetrominoes = tetrominoes;
    },
    setNewTetromino: (state) => {
      let newTetrominos = [...state.tetrominoes];
      newTetrominos.unshift(randomTetromino());
      state.tetromino = newTetrominos.pop() as Tetromino;
      state.tetrominoes = newTetrominos;
    },
    rotate: (state, action: PayloadAction<{ rows: Cell[][] }>) => {
      const { shape: currentShape } = state.tetromino;
      const tranposedTetrominoShape = currentShape.map((_, index) =>
        currentShape.map((col) => col[index])
      );
      const rotatedTetrominoShape = tranposedTetrominoShape.map((row) =>
        row.reverse()
      );
      if (
        isWithinBoard(
          rotatedTetrominoShape,
          state.position,
          action.payload.rows
        ) &&
        !isCollided(rotatedTetrominoShape, state.position, action.payload.rows)
      ) {
        state.tetromino.shape = rotatedTetrominoShape;
      }
    },
    left: (state, action: PayloadAction<{ rows: Cell[][] }>) => {
      console.log("left");
    },
    down: (state, action: PayloadAction<{ rows: Cell[][] }>) => {
      console.log("down");
    },
    quickDown: (state, action: PayloadAction<{ rows: Cell[][] }>) => {
      console.log("quickDown");
    },
    right: (state, action: PayloadAction<{ rows: Cell[][] }>) => {
      console.log("right");
    },
  },
});

export const {
  setPlayerTetrominoes,
  setNewTetromino,
  rotate,
  left,
  down,
  quickDown,
  right,
} = playerSlice.actions;

export default playerSlice.reducer;
