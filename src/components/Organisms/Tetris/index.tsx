import * as React from "react";

import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { useAppDispatch } from "../../../hooks";
import {
  setPlayerTetrominoes,
  setNewTetromino,
  holdTetromino,
} from "../../../model/player";
import { setIsPaused } from "../../../model/board";

import Button from "../../Atoms/Button";
import Preview from "../../Atoms/Preview";
import Board from "../../Molecules/Board";
import ScoreBoard from "../../Molecules/ScoreBoard";
import Previews from "../../Molecules/Previews";
import GameController from "../../Molecules/GameController";

import styles from "./index.module.css";

export interface ITetrisProps {}

export default function Tetris(props: ITetrisProps) {
  const { holdedTetromino } = useAppSelector(
    (state: RootState) => state.player
  );
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setPlayerTetrominoes(4));
  }, [dispatch]);
  return (
    <div className={styles.game}>
      <ScoreBoard />
      <div className={styles.gameContent}>
        <Board />
        <div className={styles.right}>
          <Previews previews={[1, 2, 3]} />
          <Button
            className={styles.pause}
            onClick={() => {
              dispatch(setIsPaused(true));
            }}
          >
            Pause (P)
          </Button>
          <Preview
            shape={holdedTetromino.shape}
            className={holdedTetromino.className}
          />
          <Button
            className={styles.pause}
            onClick={() => {
              dispatch(holdTetromino());
              console.log("holdedTetromino.shape.", holdedTetromino.shape);
              if (!holdedTetromino.shape.length) {
                dispatch(setNewTetromino());
              }
            }}
          >
            Hold (H)
          </Button>
        </div>
      </div>
      <GameController />
    </div>
  );
}
