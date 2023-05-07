import * as React from "react";

import Board from "../../Molecules/Board";

export interface ITetrisProps {}

export default function Tetris(props: ITetrisProps) {
  return (
    <div>
      <Board />
    </div>
  );
}
