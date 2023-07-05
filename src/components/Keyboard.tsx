import { useActiveRow } from "../contexts/useActiveRow";
import { useWordStore } from "../contexts/useWordStore";
import { useGameState } from "../contexts/useGameState";
import { NUMBER_OF_TRIES } from "./GameLayout";
import { useWinCounter } from "../contexts/useWinCounter";
import { useState } from "react";

const Keyboard = () => {
  const keyLayout: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["Borrar", "Z", "X", "C", "V", "B", "N", "M", "Enviar"],
  ];

  const [missedLetters, setMissedLetters] = useState<string[]>([]);
  const [hittedLettersWithBadPosition, setHittedLettersWithBadPosition] =
    useState<string[]>([]);
  const [hittedLettersWithGoodPosition, setHittedLettersWithGoodPosition] =
    useState<string[]>([]);

  const { word, wordAttemp, popOnWordAttemp, pushOnWordAttemp, setWordAttemp } =
    useWordStore();
  const { activeRow, nextActiveRow } = useActiveRow();

  const { setGameState } = useGameState();

  const { incrementCounter } = useWinCounter();

  const checkKeyPosition = (keyboardKey: string) => {
    const wordToArray = word.split("");
    const keyPositionInWord = wordToArray.indexOf(keyboardKey);
    const keyPositionInWordAttemp = wordAttemp.indexOf(keyboardKey);
    if (keyPositionInWord === keyPositionInWordAttemp) {
      if (hittedLettersWithBadPosition.includes(keyboardKey)) {
        setHittedLettersWithBadPosition((oldArray) =>
          oldArray.filter((letter) => letter !== keyboardKey)
        );
      }
      setHittedLettersWithGoodPosition((oldArray) => [
        ...oldArray,
        keyboardKey,
      ]);
    } else {
      setHittedLettersWithBadPosition((oldArray) => [...oldArray, keyboardKey]);
    }
  };

  const setWin = () => {
    incrementCounter();
    setHittedLettersWithGoodPosition([]);
    setHittedLettersWithBadPosition([]);
    setMissedLetters([]);
    setGameState("win");
  };

  const checkWord = () => {
    const wordToCheck = wordAttemp.join("");
    if (wordToCheck === word) {
      setWin();
    } else if (activeRow === NUMBER_OF_TRIES - 1) {
      setGameState("lose");
    } else {
      console.log(`WordAttemp: ${wordAttemp}`);
      wordAttemp.map((keyboardKey) => {
        if (!word.includes(keyboardKey)) {
          setMissedLetters((oldArray) => [...oldArray, keyboardKey]);
        } else {
          checkKeyPosition(keyboardKey);
        }
      });
      setWordAttemp();
      nextActiveRow();
    }
  };

  const handleClick = async (keyboardKey: string) => {
    switch (keyboardKey) {
      case "Borrar":
        popOnWordAttemp();
        break;
      case "Enviar":
        checkWord();
        break;
      default:
        pushOnWordAttemp(keyboardKey);
    }
  };

  const keyColor = (keyboardKey: string) => {
    const colorMapping = {
      "bg-red-500": missedLetters.includes(keyboardKey),
      "bg-yellow-500": hittedLettersWithBadPosition.includes(keyboardKey),
      "bg-green-500": hittedLettersWithGoodPosition.includes(keyboardKey),
    };
  
    const [color] = Object.entries(colorMapping).find(([_, condition]) => condition) || ["bg-gray-200", true];
  
    return color;
  };
  

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-2 h-[20vh] w-full">
      {keyLayout.map((keyboardRow, rowIndex) => (
        <div className="flex flex-row gap-1 justify-center" key={rowIndex}>
          {keyboardRow.map((keyboardKey, letterIndex) => (
            <div
              className={`${keyColor(
                keyboardKey
              )} rounded-md text-center text-xl md:text-2xl p-2 w-full cursor-pointer select-none`}
              key={letterIndex}
              onClick={() => handleClick(keyboardKey)}
            >
              {keyboardKey}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
