import GameLayout from "./components/GameLayout";
import Keyboard from "./components/Keyboard";
import { useEffect, useMemo } from "react";
import { useWordStore } from "./contexts/useWordStore";
import { useGameState } from "./contexts/useGameState";
import FinishedGame from "./components/FinishedGame";
import words from "./utils/words.json";


const App = () => {
  const { gameState } = useGameState();
  const { wordsSet, setWordsSet, setWord, setWordAttemp } =
    useWordStore();

  useEffect(() => {
    if (wordsSet.size === 0) {
      setWordsSet();
    }
    setWord(words[Math.floor(Math.random() * words.length - 1)]);
    setWordAttemp();
  }, [wordsSet]);

  const layout = useMemo(() => {
    if (gameState !== "playing") {
      return <FinishedGame />;
    } else {
      return <GameLayout />;
    }
  }, [gameState, wordsSet]);

  return (
    <div className="flex flex-col mx-auto h-screen w-screen md:w-2/3 lg:w-1/2 xl:w-[45%] 2xl:w-1/3 3xl:w-1/4 items-center justify-between md:justify-around pb-[15vh] md:pt-5 pt-5">
      <h1 className="text-2xl md:text-5xl font-bold text-center italic text-gray-100">
        Bienvenido a mi versión de Wordle
      </h1>
      {layout}
      <Keyboard />
    </div>
  );
};

export default App;
