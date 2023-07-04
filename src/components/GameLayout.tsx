interface GameLayout {
  word: string;
}

const GameLayout = ({ word }: GameLayout) => {
  const NUMBER_OF_TRIES = 5;
  return (
    <div className="grid grid-rows-5 gap-2 w-full h-[75vh] md:h-[65vh] 3xl:h-[50vh] p-5 xl:p-16 ">
      {[...Array(NUMBER_OF_TRIES)].map((index) => {
        return (
          <div key={index} className="flex flex-row gap-1 md:gap-2">
            {[...word].map((letter, index) => {
              return (
                <div key={index} className="flex justify-center items-center border-2 border-gray-500 w-full gap-2 text-5xl text-gray-100 font-semibold">
                  {letter.toUpperCase()}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameLayout;
