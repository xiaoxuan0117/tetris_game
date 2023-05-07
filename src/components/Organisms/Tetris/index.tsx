import * as React from "react";

import Board from "../../Molecules/Board";
import ScoreBoard from "../../Molecules/ScoreBoard";

export interface ITetrisProps {}

export default function Tetris(props: ITetrisProps) {
  return (
    <div>
      <ScoreBoard />
      <Board />
    </div>
  );
}
