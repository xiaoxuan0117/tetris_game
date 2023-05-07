import * as React from "react";

import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { useAppDispatch } from "../../../hooks";
import { setRows } from "../../../model/board";

import { useBoard } from "../../../utils/useBoard";

import BoardCell from "../../Atoms/BoardCell";

import styles from "./index.module.css";

export interface IBoardProps {}

export default function Board(props: IBoardProps) {
  const rows = useAppSelector((state: RootState) => state.board.rows);
  const dispatch = useAppDispatch();
  const [buildBoard] = useBoard();

  const boardStyles = {
    gridTemplateRows: `repeat(${20}, 1fr)`,
    gridTemplateColumns: `repeat(${10}, 1fr)`,
  };

  React.useEffect(() => {
    dispatch(setRows(buildBoard({ row: 20, column: 10 })));
  }, [buildBoard, dispatch]);
  return (
    <div className={styles.board} style={boardStyles}>
      {rows.map((row, index) =>
        row.map((cell, index) => (
          <BoardCell
            key={index}
            occupied={cell.occupied}
            className={cell.className}
          />
        ))
      )}
    </div>
  );
}
