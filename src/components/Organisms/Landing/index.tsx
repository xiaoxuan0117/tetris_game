import * as React from "react";

import { useAppDispatch } from "../../../hooks";
import { setIsGameOver } from "../../../model/board";

import Button from "../../Atoms/Button";

import styles from "./index.module.css";

export interface ILandingProps {}

export default function Landing(props: ILandingProps) {
  const dispatch = useAppDispatch();
  const [scores, setScores] = React.useState<number[]>([]);

  React.useEffect(() => {
    const scores = localStorage.getItem("scores");
    if (scores) {
      setScores(JSON.parse(scores));
    }
  }, []);
  return (
    <div className={styles.landing}>
      <h1>Tetris</h1>
      <Button
        onClick={() => {
          dispatch(setIsGameOver(false));
        }}
      >
        Start
      </Button>
      {scores.length ? (
        <div className={styles.scoresList}>
          <h2>High Score</h2>
          <div className={styles.list}>
            {scores.map((score, index) => (
              <div key={index} className={styles.score}>
                {score}
                {index === 0 && <span>👑</span>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
