import { useActiveRow } from "../contexts/useActiveRow";
import { useWordStore } from "../contexts/useWordStore";

const Keyboard = () => {
  const keyLayout: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["Borrar", "Z", "X", "C", "V", "B", "N", "M", "Enviar"],
  ];

  const { popOnWordAttemp, pushOnWordAttemp, setWordAttemp } = useWordStore();
  const { nextActiveRow } = useActiveRow();

  const hangleClick = async (keyboardKey: string) => {
    switch (keyboardKey) {
      case "Borrar":
        popOnWordAttemp();
        break;
      case "Enviar":
        setWordAttemp();
        nextActiveRow();
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
