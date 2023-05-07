import * as React from "react";

import Button from "../../Atoms/Button";

import styles from "./index.module.css";

export interface ILandingProps {}

export default function Landing(props: ILandingProps) {
  return (
    <div className={styles.landing}>
      <h1>Tetris</h1>
      <Button
        onClick={() => {
          console.log("start");
        }}
      >
        Start
      </Button>
    </div>
  );
}
