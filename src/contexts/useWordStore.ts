import { create } from "zustand";

interface WordState {
  word: string;
  wordAttemp: Array<string>;
  setWord: (word: string) => void;
  setWordAttemp: () => void;
  pushOnWordAttemp: (letter: string) => void;
  popOnWordAttemp: () => void;
}

export const useWordStore = create<WordState>()((set, get) => ({
  word: "",
  wordAttemp: new Array<string>(),
  setWord: (newWord) => set({ word: newWord }),
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
