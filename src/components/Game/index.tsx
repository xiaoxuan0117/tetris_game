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

  React.useEffect(() => {
    // ref: https://ithelp.ithome.com.tw/articles/10249090
    let windowsVH = window.innerHeight / 100;
    document
      .getElementById("game")
      ?.style.setProperty("--vh", windowsVH + "px");
    window.addEventListener("resize", function () {
      document
        .getElementById("game")
        ?.style.setProperty("--vh", windowsVH + "px");
    });
  });
  return (
    <div id="game" className={styles.game}>
      {isGameOver ? <Landing /> : <Tetris />}
    </div>
  );
}
