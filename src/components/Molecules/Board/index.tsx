import * as React from "react";

import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { useAppDispatch } from "../../../hooks";
import { setRows } from "../../../model/board";

import BoardCell from "../../Atoms/BoardCell";

import styles from "./index.module.css";

export interface IBoardProps {}

export default function Board(props: IBoardProps) {
  const {
    board: { rows },
    player: { position, tetromino },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const boardStyles = {
    gridTemplateRows: `repeat(${20}, 1fr)`,
    gridTemplateColumns: `repeat(${10}, 1fr)`,
  };

  React.useEffect(() => {
    dispatch(setRows({ row: 20, column: 10, position, tetromino }));
  }, [dispatch, position, tetromino]);
  return (
    <div className={styles.board} style={boardStyles}>
      {rows.map((row, index) =>
        row.map((cell, index) => (
          <BoardCell
            key={index}
            occupied={cell.occupied}
            color={cell.className}
          />
        ))
      )}
    </div>
  );
}
