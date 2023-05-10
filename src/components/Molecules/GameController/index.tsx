import * as React from "react";
import { createPortal } from "react-dom";

import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { useAppDispatch } from "../../../hooks";
import {
  rotate,
  movePosition,
  quickDown,
  setDropTime,
  setNewTetromino,
} from "../../../model/player";

import { setIsPaused, newGame, setIsGameOver } from "../../../model/board";

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
  ArrowRight: "right",
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
    board: { rows, level, isPaused, failed },
    player: { position, tetromino, dropTime },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isPaused) {
      if (["ArrowLeft", "ArrowDown", "ArrowRight"].indexOf(e.code) !== -1) {
        dispatch(
          movePosition({ rows: rows, movement: movements[keyCode[e.code]] })
        );
      } else if (e.code === "Space") {
        dispatch(quickDown({ rows }));
      } else if (e.code === "ArrowUp") {
        dispatch(rotate({ rows }));
      }
    }
    if (e.code === "KeyQ") {
      dispatch(setNewTetromino());
      dispatch(setIsGameOver(true));
    } else if (e.code === "KeyP") {
      dispatch(setIsPaused(true));
    } else if (e.code === "KeyC") {
      dispatch(setIsPaused(false));
    } else if (e.code === "KeyS") {
      dispatch(setNewTetromino());
      dispatch(
        newGame({
          row: 20,
          column: 10,
          position,
          tetromino,
        })
      );
    }

    return;
  };

  React.useEffect(() => {
    dispatch(setDropTime(1000 - level * 100));
  }, [dispatch, level]);

  React.useEffect(() => {
    let interval: NodeJS.Timer;
    if (!isPaused) {
      interval = setInterval(() => {
        dispatch(movePosition({ rows, movement: movements["down"] }));
      }, dropTime);
    }
    return () => clearInterval(interval);
  }, [dispatch, rows, dropTime, isPaused]);

  React.useEffect(() => {
    const input = document.getElementById("gameController");
    document.addEventListener("click", () => {
      input?.focus();
    });
  });

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {};
  return (
    <div>
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
            dispatch(quickDown({ rows }));
          }}
        >
          <img src={quickDownIcon} alt="quickDown" />
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
        id="gameController"
        className={styles.input}
        autoFocus
        autoComplete="false"
        type="button"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      ></input>
      {isPaused &&
        createPortal(
          <div className={styles.modal}>
            <div className={styles.container}>
              {!failed && (
                <Button
                  className={styles.pause}
                  onClick={() => {
                    dispatch(setIsPaused(false));
                  }}
                >
                  Continue (C)
                </Button>
              )}
              <Button
                className={styles.pause}
                onClick={() => {
                  dispatch(setNewTetromino());
                  dispatch(
                    newGame({
                      row: 20,
                      column: 10,
                      position,
                      tetromino,
                    })
                  );
                }}
              >
                Start New Game (S)
              </Button>
              <Button
                className={styles.pause}
                onClick={() => {
                  dispatch(setNewTetromino());
                  dispatch(setIsGameOver(true));
                }}
              >
                Quit (Q)
              </Button>
            </div>
          </div>,
          document.getElementById("game") as HTMLElement
        )}
    </div>
  );
}
