import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
  collided: boolean;
  isFastDrop: boolean;
  position: { x: number; y: number };
  tetrominoes: Tetromino[];
  tetromino: Tetromino;
}

const initialState: PlayerState = {
  collided: false,
  isFastDrop: false,
  position: { x: 0, y: 4 },
  tetrominoes: [],
  tetromino: { shape: [], className: "" },
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
      [0, 1, 0, 0]
    ],
    className: `${className}__i`
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    className: `${className}__j`
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    className: `${className}__l`
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    className: `${className}__o`
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    className: `${className}__s`
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ],
    className: `${className}__t`
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    className: `${className}__z`
  }
};

const randomTetromino = ():Tetromino => {
  const keys = Object.keys(tetrominos);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  console.log('random')
  return tetrominos[key];
}

export const playerSlice = createSlice({
  name: "Player",
  initialState,
  reducers: {
    setPlayerTetrominoes: (state, action: PayloadAction<number>) => {
      const tetrominoes = [];
      for(let i = 0; i < action.payload; i++) {
        tetrominoes.push(randomTetromino());
      }
      state.tetrominoes = tetrominoes;
    }
  },
});

export const {setPlayerTetrominoes} = playerSlice.actions;

export default playerSlice.reducer;
