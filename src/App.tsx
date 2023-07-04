import { useState } from "react";
import GameLayout from "./components/GameLayout";
import Keyboard from "./components/Keyboard";

const App = () => {
  const [word] = useState("hello")
  return (
    <div className="flex flex-col mx-auto h-screen w-screen md:w-2/3 lg:w-1/2 2xl:w-1/3 3xl:w-1/4 items-center justify-between md:justify-around pb-[15vh] md:pt-5 pt-5">
      <h1 className="text-5xl font-bold text-center italic text-gray-100">Bienvenido a mi versión de Wordle</h1>
      <GameLayout word={word}/>
      <Keyboard />
    </div>
  );
};

export default App;
