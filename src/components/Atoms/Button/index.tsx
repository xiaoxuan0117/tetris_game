import * as React from "react";

import styles from "./index.module.css";

export interface IButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button(props: IButtonProps) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.children}
    </button>
  );
}
