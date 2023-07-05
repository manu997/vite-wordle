import { useEffect, useMemo, useState } from "react";
import { useActiveRow } from "../contexts/useActiveRow";
import { useWordStore } from "../contexts/useWordStore";

interface RowProps {
  index: number;
}

const Row = ({ index }: RowProps) => {
  const [word, setWord] = useState<string[]>([]);

  const { wordAttemp } = useWordStore();
  const { activeRow } = useActiveRow();

  useEffect(() => {
    if (word.length === 0) {
      setWord(new Array(wordAttemp.length).fill(""));
    } else {
      activeRow === index && setWord([...wordAttemp]);
    }
  }, [wordAttemp]);

  const Layout = useMemo(() => {
    return word.map((letter, i) => {
      return (
        <div
          key={i}
          className={`flex justify-center items-center border-2 border-gray-500 w-full gap-2 text-4xl text-gray-100 font-semibold ${
            activeRow === index &&
            "border-[6px] border-gray-200 transition-all duration-300"
          }`}
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
    });
  }, [word, activeRow]);

  return <div className="flex flex-row gap-1 md:gap-2">{Layout}</div>;
};

export default Row;
