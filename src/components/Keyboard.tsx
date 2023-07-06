import { useActiveRow } from "../contexts/useActiveRow";
import { useWordStore } from "../contexts/useWordStore";
import { useGameState } from "../contexts/useGameState";
import { NUMBER_OF_TRIES } from "./GameLayout";
import { useWinCounter } from "../contexts/useWinCounter";
import { useGameLetters } from "../contexts/useGameLetters";
import { toast } from "react-toastify";
import { useCheckWordExistance } from "../hooks/useCheckWordExistance";
import { useState } from "react";

const Keyboard = () => {
  const keyLayout: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["Borrar", "Z", "X", "C", "V", "B", "N", "M", "Enviar"],
  ];

  const [wordForChecking, setWordForChecking] = useState<string>("");
  const {
    missedLetters,
    hittedLettersWithBadPosition,
    hittedLettersWithGoodPosition,
    addMissedLetters,
    addHittedLettersWithBadPosition,
    removeHittedLettersWithBadPosition,
    addHittedLettersWithGoodPosition,
    resetMissedLetters,
    resetHittedLettersWithBadPosition,
    resetHittedLettersWithGoodPosition,
  } = useGameLetters();

  const { word, wordAttemp, popOnWordAttemp, pushOnWordAttemp, setWordAttemp } =
    useWordStore();
  const { activeRow, nextActiveRow } = useActiveRow();

  const { setGameState } = useGameState();

  const { incrementCounter } = useWinCounter();

  const checkWordExistance = useCheckWordExistance(wordForChecking);

  const setWin = () => {
    incrementCounter();
    setGameState("win");
  };

  const reset = () => {
    resetMissedLetters();
    resetHittedLettersWithGoodPosition();
    resetHittedLettersWithBadPosition();
  };

  const checkKeyPosition = (keyIndex: number, keyboardKey: string) => {
    const wordToArray = word.split("");
    if (wordToArray[keyIndex] === wordAttemp[keyIndex]) {
      if (hittedLettersWithBadPosition[keyIndex] === keyboardKey) {
        removeHittedLettersWithBadPosition(keyboardKey, keyIndex);
      }
      addHittedLettersWithGoodPosition(keyboardKey, keyIndex);
    } else {
      addHittedLettersWithBadPosition(keyboardKey, keyIndex);
    }
  };

  const checkWord = async () => {
    const wordToCheck = wordAttemp.join("");
    setWordForChecking(wordToCheck);
    if (wordToCheck === word) {
      reset();
      setWin();
    } else {
      const wordExists = await checkWordExistance.mutateAsync();
      if (wordExists.n_results > 0) {
        if (activeRow === NUMBER_OF_TRIES - 1) {
          reset();
          setGameState("lose");
        } else {
          wordAttemp.map((keyboardKey, index) => {
            if (!word.includes(keyboardKey)) {
              addMissedLetters(keyboardKey);
            } else {
              checkKeyPosition(index, keyboardKey);
            }
          });
          setWordAttemp();
          nextActiveRow();
        }
      } else {
        toast.error("La palabra no existe", { position: "top-center" });
      }
    }
  };

  const handleClick = async (keyboardKey: string) => {
    switch (keyboardKey) {
      case "Borrar":
        popOnWordAttemp();
        break;
      case "Enviar":
        await checkWord();
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

    const [color] = Object.entries(colorMapping).find(
      ([_, condition]) => condition
    ) || ["bg-gray-200", true];

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
