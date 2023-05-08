import * as React from "react";

import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { useAppDispatch } from "../../../hooks";
import { rotate, left, down, quickDown, right } from "../../../model/player";

import leftArrowIcon from "../../../images/icon/left-arrow.svg";
import downArrowIcon from "../../../images/icon/down-arrow.svg";
import rightArrowIcon from "../../../images/icon/right-arrow.svg";
import quickDownIcon from "../../../images/icon/quick-down.svg";
import rotateIcon from "../../../images/icon/rotate.svg";

import Button from "../../Atoms/Button";

import styles from "./index.module.css";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Cell } from "../../../static/cell";

export interface IGameControllerProps {}

const keyCode: { [key: string]: string } = {
  ArrowLeft: "left",
  ArrowDown: "down",
  Space: "quickDown",
  ArrowRight: "right",
  ArrowUp: "rotate",
};

const actions: {
  [key: string]: ActionCreatorWithPayload<{
    rows: Cell[][];
  }>;
} = {
  left: left,
  down: down,
  quickDown: quickDown,
  right: right,
  rotate: rotate,
};

export default function GameController(props: IGameControllerProps) {
  const {
    board: { rows },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "Space"].indexOf(
        e.code
      ) === -1
    )
      return;
    dispatch(actions[keyCode[e.code]]({ rows }));
  };
  return (
    <>
      <div className={styles.gameController}>
        <Button
          className={styles.button}
          onClick={() => {
            dispatch(left({ rows }));
          }}
        >
          <img src={leftArrowIcon} alt="left-arrow" />
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            dispatch(down({ rows }));
          }}
        >
          <img src={downArrowIcon} alt="down-arrow" />
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            dispatch(quickDown({ rows }));
          }}
        >
          <img src={quickDownIcon} alt="quickDown" />
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            dispatch(rotate({ rows }));
          }}
        >
          <img src={rotateIcon} alt="rotate" />
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            dispatch(right({ rows }));
          }}
        >
          <img src={rightArrowIcon} alt="right-arrow" />
        </Button>
      </div>
      <input
        className={styles.input}
        autoFocus
        onKeyDown={onKeyDown}
        onKeyUp={() => {}}
      ></input>
    </>
  );
}
