import * as React from "react";
import classnames from "classnames";

import styles from "./index.module.css";

export interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  autofocus?: boolean;
}

export default function Button(props: IButtonProps) {
  return (
    <button
      className={classnames(styles.button, props.className)}
      type="button"
      onClick={() => {
        props.onClick();
      }}
      autoFocus={props.autofocus}
    >
      {props.children}
    </button>
  );
}
