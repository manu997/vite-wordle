import { useActiveRow } from "../contexts/useActiveRow";
import { useWordStore } from "../contexts/useWordStore";
import { useGameState } from "../contexts/useGameState";
import { NUMBER_OF_TRIES } from "./GameLayout";
import { useWinCounter } from "../contexts/useWinCounter";

const Keyboard = () => {
  const keyLayout: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["Borrar", "Z", "X", "C", "V", "B", "N", "M", "Enviar"],
  ];

  const { word, wordAttemp, popOnWordAttemp, pushOnWordAttemp, setWordAttemp } =
    useWordStore();
  const { activeRow, nextActiveRow } = useActiveRow();

  const { setGameState } = useGameState();

  const { incrementCounter } = useWinCounter();

  const checkWord = () => {
    const wordToCheck = wordAttemp.join("");

    if (wordToCheck === word) {
      incrementCounter();
      setGameState("win");
    } else if (activeRow === NUMBER_OF_TRIES - 1) {
      setGameState("lose");
    } else {
      setWordAttemp();
      nextActiveRow();
    }
  };

  const hangleClick = async (keyboardKey: string) => {
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

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-2 h-[20vh] w-full">
      {keyLayout.map((keyboardRow, rowIndex) => (
        <div className="flex flex-row gap-1 justify-center " key={rowIndex}>
          {keyboardRow.map((keyboardKey, letterIndex) => (
            <div
              className=" bg-gray-200 rounded-md text-center text-xl md:text-2xl p-2 w-full cursor-pointer select-none"
              key={letterIndex}
              onClick={() => hangleClick(keyboardKey)}
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
