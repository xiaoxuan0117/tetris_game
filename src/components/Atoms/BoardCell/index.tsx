import * as React from "react";
import classnames from "classnames";

import styles from "./index.module.css";

export interface IBoardCellProps {
  occupied: boolean;
  className?: string;
  color: string
}

export default function BoardCell(props: IBoardCellProps) {
  return <div className={classnames(styles.boardCell, props.className, props.occupied && styles[`${props.color}`])} />;
}
