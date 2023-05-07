import * as React from "react";

import Landing from "../Organisms/Landing";

import styles from "./index.module.css";

export default function Game() {
  return (
    <div className={styles.game}>
      <Landing />
    </div>
  );
}
