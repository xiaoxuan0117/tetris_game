import * as React from "react";

import Board from "../../Molecules/Board";
import ScoreBoard from "../../Molecules/ScoreBoard";
import Previews from "../../Molecules/Previews";

import styles from "./index.module.css";

export interface ITetrisProps {}

export default function Tetris(props: ITetrisProps) {
  return (
    <div>
      <ScoreBoard />
      <div className={styles.gameContent}>
        <Board />
        <Previews previews={[1, 2, 3]} />
      </div>
    </div>
  );
}
