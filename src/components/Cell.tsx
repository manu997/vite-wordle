import { useEffect, useState } from "react";
import { useActiveRow } from "../contexts/useActiveRow";
import { useGameLetters } from "../contexts/useGameLetters";

interface CellProps {
  letter: string;
  index: number;
}

const Cell = ({ letter, index }: CellProps) => {
  const [cellsBgColor, setCellsBgColor] = useState<string>("");
  const { activeRow } = useActiveRow();

  useEffect(() => {
    activeRow - 1 === index && letter !== "" && keyColor(letter);
  }, [activeRow]);

  const {
    missedLetters,
    hittedLettersWithBadPosition,
    hittedLettersWithGoodPosition,
  } = useGameLetters();

  const keyColor = (keyboardKey: string) => {
    const colorMapping = {
      "bg-red-600": missedLetters.includes(keyboardKey),
      "bg-yellow-600": hittedLettersWithBadPosition.includes(keyboardKey),
      "bg-green-600": hittedLettersWithGoodPosition.includes(keyboardKey),
    };

    const [color] = Object.entries(colorMapping).find(
      ([_, condition]) => condition
    ) || ["", true];

    setCellsBgColor(color);
  };

  return (
    <div
      className={`flex justify-center items-center  border-2 w-full gap-2 text-4xl text-gray-100 font-semibold ${
        activeRow === index
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
