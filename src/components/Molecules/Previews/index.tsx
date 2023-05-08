import * as React from "react";


import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { useAppDispatch } from "../../../hooks";
import {setNewTetromino} from "../../../model/player";

import Preview from "../../Atoms/Preview";

import styles from "./index.module.css";

export interface IPreviewsProps {
  previews: number[];
}

export default function Previews(props: IPreviewsProps) {
  const dispatch = useAppDispatch();
  const tetrominoes = useAppSelector((state: RootState) => state.player.tetrominoes);
  
  return (
    <div className={styles.previews}>
      {tetrominoes.map((tetromino, index) => (
        <Preview key={index} shape={tetromino.shape} className={tetromino.className} />
      ))}
      
      <button onClick={()=> {dispatch(setNewTetromino())}}>change</button>
    </div>
  );
}
