import * as React from "react";

import leftArrow from "../../../images/icon/left-arrow.svg";
import downArrow from "../../../images/icon/down-arrow.svg";
import rightArrow from "../../../images/icon/right-arrow.svg";
import quickDown from "../../../images/icon/quick-down.svg";
import rotate from "../../../images/icon/rotate.svg";

import Button from "../../Atoms/Button";

import styles from "./index.module.css";

export interface IGameControllerProps {}

export default function GameController(props: IGameControllerProps) {
  return (
    <>
      <div className={styles.gameController}>
        <Button
          className={styles.button}
          onClick={() => {
            console.log("left");
          }}
        >
          <img src={leftArrow} alt="left-arrow" />
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            console.log("down");
          }}
        >
          <img src={downArrow} alt="down-arrow" />
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            console.log("quickDown");
          }}
        >
          <img src={quickDown} alt="quickDown" />
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            console.log("rotate");
          }}
        >
          <img src={rotate} alt="rotate" />
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            console.log("right");
          }}
        >
          <img src={rightArrow} alt="right-arrow" />
        </Button>
      </div>
      <input
        className={styles.input}
        autoFocus
        onKeyDown={(e) => {
          console.log("key down", e.code);
        }}
        onKeyUp={(e) => {
          console.log("key up", e.code);
        }}
      ></input>
    </>
  );
}
