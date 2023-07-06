import { useEffect, useMemo, useState } from "react";
import { useActiveRow } from "../contexts/useActiveRow";
import { useWordStore } from "../contexts/useWordStore";
import Cell from "./Cell";

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

  const layout = useMemo(() => {
    return word.map((letter, i) => {
      return <Cell key={i} letter={letter} row={index} col={i} />;
    });
  }, [word, activeRow]);

  return <div className="flex flex-row gap-1 md:gap-2">{layout}</div>;
};

export default Row;
