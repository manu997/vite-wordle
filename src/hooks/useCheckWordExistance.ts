import { useMutation } from "@tanstack/react-query";

const checkWordExintance = async (word: string) => {
  const response = await fetch(
    `https://lexicala1.p.rapidapi.com/search?${new URLSearchParams({
      text: word.toLowerCase(),
    })}`,
    {
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
      },
    }
  );

  if (!response.ok) {
    console.error(response.text);
  } else {
    const data = await response.json();
    return data;
  }
};

export const useCheckWordExistance = (word: string) => {
  return useMutation({
    mutationKey: ["wordExistance", word],
    mutationFn: () => checkWordExintance(word),
  });
};
