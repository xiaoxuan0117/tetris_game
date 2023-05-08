import * as React from "react";
import classnames from "classnames";

import {buildBoard} from "../../../model/board";

import BoardCell from "../BoardCell";

import styles from "./index.module.css";

export interface IPreviewProps {
  shape: number[][];
  className: string;
}

export default function Preview(props: IPreviewProps) {
  const boardStyles = {
    gridTemplateRows: `repeat(${4}, 1fr)`,
    gridTemplateColumns: `repeat(${4}, 1fr)`,
  };

  return (
    <div className={styles.preview} style={boardStyles}>
      {buildBoard({ row: 4, column: 4, position: {y: 0, x: 0}, shape: props.shape, className: props.className }).map((row, index) =>
        row.map((cell, index) => (
          <BoardCell
            key={index}
            occupied={cell.occupied}
            className={classnames(styles.previewCell)}
            color={cell.className}
          />
        ))
      )}
    </div>
  );
}
