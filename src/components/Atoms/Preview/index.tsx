import * as React from "react";
import classnames from "classnames";

import { useBoard } from "../../../utils/useBoard";

import BoardCell from "../BoardCell";

import styles from "./index.module.css";

export interface IPreviewProps {
  shape: { row: number; column: number };
}

export default function Preview(props: IPreviewProps) {
  const [buildBoard] = useBoard();
  const boardStyles = {
    gridTemplateRows: `repeat(${props.shape.row}, 1fr)`,
    gridTemplateColumns: `repeat(${props.shape.column}, 1fr)`,
  };

  return (
    <div className={styles.preview} style={boardStyles}>
      {buildBoard({ ...props.shape }).map((row, index) =>
        row.map((cell, index) => (
          <BoardCell
            key={index}
            occupied={cell.occupied}
            className={classnames(cell.className, styles.previewCell)}
          />
        ))
      )}
    </div>
  );
}
