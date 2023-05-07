import * as React from "react";

import styles from "./index.module.css";

export interface IBoardCellProps {
  occupied: boolean;
  className: string;
}

export default function BoardCell(props: IBoardCellProps) {
  return <div className={styles.boardCell} />;
}
