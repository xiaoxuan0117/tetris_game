import * as React from "react";

import { useAppDispatch } from "../../../hooks";
import { setPlayerTetrominoes } from "../../../model/player";
import { setIsPaused } from "../../../model/board";

import Button from "../../Atoms/Button";
import Board from "../../Molecules/Board";
import ScoreBoard from "../../Molecules/ScoreBoard";
import Previews from "../../Molecules/Previews";
import GameController from "../../Molecules/GameController";

import styles from "./index.module.css";

export interface ITetrisProps {}

export default function Tetris(props: ITetrisProps) {
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
          <div className={styles.controller}>
            <Button
              className={styles.pause}
              onClick={() => {
                dispatch(setIsPaused(true));
              }}
            >
              Pause (P)
            </Button>
          </div>
        </div>
      </div>
      <GameController />
    </div>
  );
}
