import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cell } from "../static/cell";

export interface PlayerState {
  collided: boolean;
  isFastDrop: boolean;
  position: { y: number; x: number };
  tetromino: Tetromino;
  tetrominoes: Tetromino[];
  holdedTetromino: Tetromino;
  dropTime: number;
  soundOn: boolean;
}

const initialState: PlayerState = {
  collided: false,
  isFastDrop: false,
  position: { y: 0, x: 4 },
  tetromino: { shape: [], className: "" },
  tetrominoes: [],
  holdedTetromino: { shape: [], className: "" },
  dropTime: 1000,
  soundOn: true,
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

export const isWithinBoard = (
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

export const isCollided = (
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

export const movedPosition = (
  prePosition: { y: number; x: number },
  movement: { y: number; x: number }
) => {
  const { y: preY, x: preX } = prePosition;
  const { y, x } = movement;
  const newPositionX = preX + x;
  const newPositionY = preY + y;

  return { x: newPositionX, y: newPositionY };
};

export const quickDownPosition = (
  y: number,
  x: number,
  rows: Cell[][],
  shape: number[][]
) => {
  const maxMovementY = rows.length - y;
  let movementY = 0;
  for (movementY; movementY < maxMovementY; movementY++) {
    if (
      !isWithinBoard(shape, { y: y + movementY, x: x }, rows) ||
      isCollided(shape, { y: y + movementY, x: x }, rows)
    ) {
      break;
    }
  }

  return movementY;
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
      state.holdedTetromino = { shape: [], className: "" };
      state.position = { y: 0, x: 4 };
    },
    setNewTetromino: (state) => {
      let newTetrominos = [...state.tetrominoes];
      newTetrominos.unshift(randomTetromino());
      const firstTetromino = newTetrominos.pop() as Tetromino;
      state.tetromino = firstTetromino as Tetromino;
      state.tetrominoes = newTetrominos;
      state.position = { y: 0, x: 4 };
    },
    resetCollided: (state) => {
      state.collided = false;
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
    movePosition: (
      state,
      action: PayloadAction<{
        rows: Cell[][];
        movement: { y: number; x: number };
      }>
    ) => {
      const { rows, movement } = action.payload;

      const { x, y } = movedPosition(state.position, movement);

      const isWithinBoardResult = isWithinBoard(
        state.tetromino.shape,
        { y, x },
        rows
      );
      const isCollidedResult = isCollided(
        state.tetromino.shape,
        { y, x },
        rows
      );

      const isCollideToBottom =
        !isWithinBoard(
          state.tetromino.shape,
          { y: y, x: state.position.x },
          rows
        ) ||
        isCollided(state.tetromino.shape, { y, x: state.position.x }, rows);

      if (isWithinBoardResult && !isCollidedResult) {
        state.position = { y, x };
      }

      if (isCollideToBottom) {
        state.collided = true;
      }
    },
    quickDown: (state, action: PayloadAction<{ rows: Cell[][] }>) => {
      const { rows } = action.payload;
      const {
        position: { y, x },
        tetromino,
      } = state;
      const movementY = quickDownPosition(y, x, rows, tetromino.shape);

      state.position = { y: y + movementY - 1, x: x };
      state.collided = true;
    },
    setDropTime: (state, action: PayloadAction<number>) => {
      state.dropTime = Math.max(action.payload, 200);
    },
    holdTetromino: (state) => {
      if (state.holdedTetromino) {
        const temp = state.holdedTetromino;
        state.holdedTetromino = state.tetromino;
        state.tetromino = temp;
      } else {
        state.holdedTetromino = state.tetromino;
      }
      state.position = { y: 0, x: 4 };
    },
    toggleSound: (state) => {
      state.soundOn = !state.soundOn;
    },
    resetPlayer: (state) => {
      return { ...initialState };
    },
  },
});

export const {
  setPlayerTetrominoes,
  setNewTetromino,
  resetCollided,
  rotate,
  movePosition,
  quickDown,
  setDropTime,
  holdTetromino,
  toggleSound,
  resetPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
