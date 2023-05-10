import * as React from "react";

import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { useAppDispatch } from "../../../hooks";
import {
  rotate,
  movePosition,
  quickDown,
  setDropTime,
} from "../../../model/player";

import leftArrowIcon from "../../../images/icon/left-arrow.svg";
import downArrowIcon from "../../../images/icon/down-arrow.svg";
import rightArrowIcon from "../../../images/icon/right-arrow.svg";
import quickDownIcon from "../../../images/icon/quick-down.svg";
import rotateIcon from "../../../images/icon/rotate.svg";

import Button from "../../Atoms/Button";

import styles from "./index.module.css";

export interface IGameControllerProps {}

const keyCode: { [key: string]: string } = {
  ArrowLeft: "left",
  ArrowDown: "down",
  Space: "quickDown",
  ArrowRight: "right",
  ArrowUp: "rotate",
};

const movements: {
  [key: string]: { y: number; x: number };
} = {
  left: { y: 0, x: -1 },
  down: { y: 1, x: 0 },
  right: { y: 0, x: 1 },
};

export default function GameController(props: IGameControllerProps) {
  const {
    board: { rows, level },
    player: { dropTime },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["ArrowLeft", "ArrowDown", "ArrowRight"].indexOf(e.code) !== -1) {
      dispatch(
        movePosition({ rows: rows, movement: movements[keyCode[e.code]] })
      );
    } else if (e.code === "Space") {
      dispatch(quickDown({ rows }));
      // quikDownEvent();
    } else if (e.code === "ArrowUp") {
      dispatch(rotate({ rows }));
    }

    return;
  };

  React.useEffect(() => {
    dispatch(setDropTime(1000 - level * 100));
  }, [dispatch, level]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch(movePosition({ rows, movement: movements["down"] }));
    }, dropTime);
    return () => clearInterval(interval);
  }, [dispatch, rows, dropTime]);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {};
  return (
    <>
      <div className={styles.gameController}>
        <Button
          className={styles.button}
          onClick={() => {
            dispatch(
              movePosition({ rows, movement: movements[keyCode["ArrowLeft"]] })
            );
          }}
        >
          <img src={leftArrowIcon} alt="left-arrow" />
        </Button>
        <Button
          className={styles.button}
          onClick={() => {
            dispatch(
              movePosition({ rows, movement: movements[keyCode["ArrowDown"]] })
            );
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
            dispatch(
              movePosition({ rows, movement: movements[keyCode["ArrowRight"]] })
            );
          }}
        >
          <img src={rightArrowIcon} alt="right-arrow" />
        </Button>
      </div>
      <input
        className={styles.input}
        autoFocus
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      ></input>
    </>
  );
}
