import { create } from "zustand";
import words from "../utils/words.json";

interface WordState {
  wordsSet: Set<string>;
  word: string;
  wordAttemp: Array<string>;
  setWordsSet: () => void;
  setWord: (word: string) => void;
  setWordAttemp: () => void;
  pushOnWordAttemp: (letter: string) => void;
  popOnWordAttemp: () => void;
}

export const useWordStore = create<WordState>()((set, get) => ({
  wordsSet: new Set<string>(),
  word: "",
  wordAttemp: new Array<string>(),
  setWordsSet: () => set({ wordsSet: new Set(words) }),
  setWord: (newWord) => set({ word: newWord.toUpperCase() }),
  setWordAttemp: () =>
    set({
      wordAttemp: new Array<string>(get().word.split("").length).fill(""),
    }),
  pushOnWordAttemp: (letter) => {
    const pushLetter = [...get().wordAttemp];
    pushLetter[pushLetter.indexOf("")] = letter;
    return set({ wordAttemp: [...pushLetter] });
  },

  popOnWordAttemp: () => {
    const popLetter = [...get().wordAttemp];
    !popLetter.includes("")
      ? (popLetter[popLetter.length - 1] = "")
      : (popLetter[popLetter.indexOf("") - 1] = "");
    return set({ wordAttemp: [...popLetter] });
  },
}));
