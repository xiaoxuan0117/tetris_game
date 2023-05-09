import * as React from "react";

import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";

import styles from "./index.module.css";

export interface IScoreBoardProps {}

export default function ScoreBoard(props: IScoreBoardProps) {
  const { level, lines, points } = useAppSelector(
    (state: RootState) => state.board
  );
  return (
    <div className={styles.scoreBoard}>
      <div className={styles.level}>
        <p className={styles.title}>Level</p>
        <p>{level}</p>
      </div>
      <div className={styles.linesToLevel}>
        <p className={styles.title}>Lines To Level</p>
        <p>{lines}</p>
      </div>
      <div className={styles.points}>
        <p className={styles.title}>Points</p>
        <p>{points}</p>
      </div>
    </div>
  );
}
