import * as React from "react";

import { useAppDispatch } from "../../../hooks";
import {setPlayerTetrominoes} from "../../../model/player";

import Board from "../../Molecules/Board";
import ScoreBoard from "../../Molecules/ScoreBoard";
import Previews from "../../Molecules/Previews";

import styles from "./index.module.css";

export interface ITetrisProps {}

export default function Tetris(props: ITetrisProps) {
  const dispatch = useAppDispatch();
  React.useEffect(()=> {
    console.log('render tetris');
    dispatch(setPlayerTetrominoes(4));
  }, [dispatch]);
  return (
    <div>
      <ScoreBoard />
      <div className={styles.gameContent}>
        <Board />
        <Previews previews={[1, 2, 3]} />
      </div>
    </div>
  );
}
