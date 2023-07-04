import { BounceLoader } from "react-spinners";
import GameLayout from "./components/GameLayout";
import Keyboard from "./components/Keyboard";
import { useWord } from "./hooks/useWord";
import { useEffect } from "react";
import { useWordStore } from "./contexts/useWordStore";

const App = () => {
  const { data, isSuccess } = useWord();

  const { setWord, setWordAttemp } = useWordStore();

  useEffect(() => {
    if (isSuccess) {
      setWord(data);
      setWordAttemp();
    }
  }, [isSuccess, data]);

  return (
    <div className="flex flex-col mx-auto h-screen w-screen md:w-2/3 lg:w-1/2 2xl:w-1/3 3xl:w-1/4 items-center justify-between md:justify-around pb-[15vh] md:pt-5 pt-5">
      <h1 className="text-2xl md:text-5xl font-bold text-center italic text-gray-100">
        Bienvenido a mi versión de Wordle
      </h1>
      {isSuccess ? (
        <GameLayout />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <BounceLoader color="#f3f4f6" />
          <p className="text-2xl text-gray-100">Cargando palabra...</p>
        </div>
      )}
      <Keyboard />
    </div>
  );
};

export default App;
