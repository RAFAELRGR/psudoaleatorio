import { useRandomNumber } from "../hooks/useRandomNumber";

const Test = () => {
  const randomNumber = useRandomNumber((state) => state.numbers);
  return (
    <>
      <p>A</p>
      <p>{randomNumber}</p>
    </>
  );
};

export default Test;
