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
  holdTetromino,
  toggleSound,
  resetPlayer,
  setPlayerTetrominoes,
} from "../../../model/player";

import { setIsPaused, newGame, setIsGameOver } from "../../../model/board";

import leftArrowIcon from "../../../images/icon/left-arrow.svg";
import downArrowIcon from "../../../images/icon/down-arrow.svg";
import rightArrowIcon from "../../../images/icon/right-arrow.svg";
import quickDownIcon from "../../../images/icon/quick-down.svg";
import rotateIcon from "../../../images/icon/rotate.svg";
import placeSound from "../../../audio/placeSound.mp3";
import functionSound from "../../../audio/functionSound.mp3";

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
  const [sound] = React.useState(new Audio());
  const {
    board: { rows, level, isPaused, failed },
    player: { position, tetromino, dropTime, holdedTetromino, soundOn },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const playSound = (src: string) => {
    if (soundOn) {
      sound.src = src;
      sound.volume = 0.03;
      sound.play();
    }
  };

  const quickDrop = () => {
    playSound(placeSound);
    dispatch(quickDown({ rows }));
  };

  const rotateShape = () => {
    dispatch(rotate({ rows }));
  };

  const quitGame = () => {
    playSound(functionSound);
    dispatch(resetPlayer());
    dispatch(setIsGameOver(true));
  };

  const pauseGame = () => {
    playSound(functionSound);
    dispatch(setIsPaused(true));
  };

  const continueGame = () => {
    playSound(functionSound);
    dispatch(setIsPaused(false));
  };

  const startNewGame = () => {
    playSound(functionSound);
    dispatch(setPlayerTetrominoes(4));
    dispatch(
      newGame({
        row: 20,
        column: 10,
        position,
        tetromino,
      })
    );
  };

  const holdTheTetromino = () => {
    playSound(placeSound);
    dispatch(holdTetromino());
    if (!holdedTetromino.shape.length) {
      dispatch(setNewTetromino());
    }
  };

  const toggleSoundOn = () => {
    dispatch(toggleSound());
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isPaused) {
      if (["ArrowLeft", "ArrowDown", "ArrowRight"].indexOf(e.code) !== -1) {
        dispatch(
          movePosition({ rows: rows, movement: movements[keyCode[e.code]] })
        );
      } else if (e.code === "Space") {
        quickDrop();
      } else if (e.code === "ArrowUp") {
        rotateShape();
      } else if (e.code === "KeyH") {
        holdTheTetromino();
      }
    }
    if (e.code === "KeyQ") {
      quitGame();
    } else if (e.code === "KeyP") {
      pauseGame();
    } else if (e.code === "KeyC") {
      continueGame();
    } else if (e.code === "KeyS") {
      startNewGame();
    } else if (e.code === "KeyA") {
      toggleSoundOn();
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
            quickDrop();
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
            rotateShape();
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
      ></input>
      {isPaused &&
        createPortal(
          <div className={styles.modal}>
            <div className={styles.container}>
              {!failed && (
                <Button
                  className={styles.pause}
                  onClick={() => {
                    continueGame();
                  }}
                >
                  Continue (C)
                </Button>
              )}
              <Button
                className={styles.pause}
                onClick={() => {
                  startNewGame();
                }}
              >
                Start New Game (S)
              </Button>
              <Button
                className={styles.pause}
                onClick={() => {
                  quitGame();
                }}
              >
                Quit (Q)
              </Button>
              <Button
                className={styles.pause}
                onClick={() => {
                  dispatch(toggleSound());
                }}
              >
                {`${soundOn ? "Sound Off(A)" : "Sound On(A)"}`}
              </Button>
            </div>
          </div>,
          document.getElementById("game") as HTMLElement
        )}
    </div>
  );
}
