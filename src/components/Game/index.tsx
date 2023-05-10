import * as React from "react";

import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

import Landing from "../Organisms/Landing";
import Tetris from "../Organisms/Tetris";

import styles from "./index.module.css";

export default function Game() {
  const isGameOver = useAppSelector(
    (state: RootState) => state.board.isGameOver
  );
  return (
    <div className={styles.game}>{isGameOver ? <Landing /> : <Tetris />}</div>
  );
}
