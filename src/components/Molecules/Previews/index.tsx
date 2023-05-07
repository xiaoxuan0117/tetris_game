import * as React from "react";

import Preview from "../../Atoms/Preview";

import styles from "./index.module.css";

export interface IPreviewsProps {
  previews: number[];
}

const previewSapes = [
  {
    row: 4,
    column: 4,
  },
  {
    row: 4,
    column: 4,
  },
  {
    row: 4,
    column: 4,
  },
];

export default function Previews(props: IPreviewsProps) {
  return (
    <div className={styles.previews}>
      {previewSapes.map((shape, index) => (
        <Preview key={index} shape={shape} />
      ))}
    </div>
  );
}
