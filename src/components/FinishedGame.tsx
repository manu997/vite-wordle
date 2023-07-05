import { useMemo } from "react";
import { useGameState } from "../contexts/useGameState";
import { useWordStore } from "../contexts/useWordStore";
import { useWinCounter } from "../contexts/useWinCounter";
import { useQueryClient } from "@tanstack/react-query";
import { useActiveRow } from "../contexts/useActiveRow";

const FinishedGame = () => {
  const { gameState, setGameState } = useGameState();
  const { word } = useWordStore();
  const { counter } = useWinCounter();
  const { resetActiveRow } = useActiveRow();
  const queryClient = useQueryClient();

  const message = useMemo(() => {
    switch (gameState) {
      case "win":
        return "¡Felicidades, has acertado la palabra!";
      case "lose":
        return "¡Vaya, no has acertado la palabra!";
      default:
        return "No hay resultados";
    }
  }, [gameState]);

  const newGame = () => {
    queryClient.invalidateQueries(["word"]);
    resetActiveRow();
    setGameState("playing");
  };

  return (
    <div className="border-4 border-gray-200 rounded-2xl m-10 flex flex-col gap-5 justify-center p-10">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-100">
        {message}
      </h1>
      <span className="text-lg md:text-xl font-medium text-center text-gray-100">
        Palabra: {word}
      </span>
      <span className="text-lg md:text-xl font-medium text-center text-gray-100">
        Número de victorias acumuladas: {counter}
      </span>
      <button
        className="bg-gray-200 text-gray-900 p-2 rounded-md w-2/3 self-center text-xl"
        onClick={newGame}
      >
        Volver a jugar
      </button>
    </div>
  );
};

export default FinishedGame;
