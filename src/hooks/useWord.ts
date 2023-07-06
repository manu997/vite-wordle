import { useQuery } from "@tanstack/react-query";

const fetchWord = async () => {
  const response = await fetch(
    `https://clientes.api.greenborn.com.ar/public-random-word?${new URLSearchParams({
      c: "1",
      l: "5",
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
