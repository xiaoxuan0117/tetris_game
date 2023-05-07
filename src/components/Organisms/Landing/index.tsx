import * as React from "react";

import { useAppDispatch } from "../../../hooks";
import { setIsGameOver } from "../../../model/gameStatus";

import Button from "../../Atoms/Button";

import styles from "./index.module.css";

export interface ILandingProps {}

export default function Landing(props: ILandingProps) {
  const dispatch = useAppDispatch();
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
    </div>
  );
}
