import Row from "./Row";

export const NUMBER_OF_TRIES = 5;

const GameLayout = () => {
  return (
    <div className="grid grid-rows-5 gap-2 w-full h-[75vh] md:h-[65vh] 3xl:h-[50vh] p-5 2xl:py-8 2xl:px-12 lg:px-12 3xl:px-8">
      {[...Array(NUMBER_OF_TRIES)].map((_e, index) => (

        <Row key={index} index={index} />
      ))}
    </div>
  );
};

export default GameLayout;
