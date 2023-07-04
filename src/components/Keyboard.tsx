const Keyboard = () => {
  const keyLayout: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["Borrar", "Z", "X", "C", "V", "B", "N", "M", "Enviar"],
  ];
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-2 h-[20vh] w-full">
      {keyLayout.map((keyboardRow, rowIndex) => (
        <div className="flex flex-row gap-1 justify-center " key={rowIndex}>
          {keyboardRow.map((letter, letterIndex) => (
            <div
              className=" bg-gray-200 rounded-md text-center text-xl md:text-2xl p-2 w-full cursor-pointer"
              key={letterIndex}
              onClick={() => console.log(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
