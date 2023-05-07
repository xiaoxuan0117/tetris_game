import * as React from "react";

import { defaultCell } from "../static/cell";

export const useBoard = () => {
  const buildBoard = React.useCallback(
    ({ row, column }: { row: number; column: number }) => {
      const buildRows: (typeof defaultCell)[][] = Array.from(
        { length: row },
        () => Array.from({ length: column }, () => ({ ...defaultCell }))
      );
      return buildRows;
    },
    []
  );

  return [buildBoard];
};
