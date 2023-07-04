import { useQuery } from "@tanstack/react-query";

const fetchWord = async () => {
  const response = await fetch(
    `https://random-word-api.herokuapp.com/word?${new URLSearchParams({
      lang: "es",
      number: "1",
      length: "5",
    })}`
  );

  if (!response.ok) {
    console.error(response.text);
  } else {
    const data = await response.json();
    return data[0];
  }
};

export const useWord = () => {
  return useQuery(["word"], () => fetchWord());
};
