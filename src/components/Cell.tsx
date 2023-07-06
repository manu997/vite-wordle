import { useEffect, useState } from "react";
import { useActiveRow } from "../contexts/useActiveRow";
import { useGameLetters } from "../contexts/useGameLetters";

interface CellProps {
  letter: string;
  row: number;
  col: number;
}

const Cell = ({ letter, row, col }: CellProps) => {
  const [cellsBgColor, setCellsBgColor] = useState<string>("");

  const { activeRow } = useActiveRow();
  const {
    missedLetters,
    hittedLettersWithBadPosition,
    hittedLettersWithGoodPosition,
  } = useGameLetters();

  useEffect(() => {
    activeRow - 1 === row && letter !== "" && keyColor(letter, col);
  }, [
    activeRow,
    col,
    hittedLettersWithBadPosition,
    hittedLettersWithGoodPosition,
    missedLetters,
  ]);

  const keyColor = (keyboardKey: string, index: number) => {
    const colorMapping = {
      "bg-red-600": missedLetters.includes(keyboardKey),
      "bg-yellow-600": hittedLettersWithBadPosition[index] === keyboardKey,
      "bg-green-600": hittedLettersWithGoodPosition[index] === keyboardKey,
    };

    const [color] = Object.entries(colorMapping).find(
      ([_, condition]) => condition
    ) || ["", true];

    setCellsBgColor(color);
  };

  return (
    <div
      className={`flex justify-center items-center  border-2 w-full gap-2 text-4xl text-gray-100 font-semibold ${
        activeRow === row
          ? `border-[6px] border-gray-200 transition-all duration-300`
          : `border-gray-500`
      } ${cellsBgColor}`}
    >
      <span
        className={`transition-all transform duration-200 ${
          letter !== "" ? "3xl:scale-150 scale-125 opacity-100" : "opacity-0"
        }`}
      >
        {letter}
      </span>
    </div>
  );
};

export default Cell;
