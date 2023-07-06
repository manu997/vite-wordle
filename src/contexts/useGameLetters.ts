import { create } from "zustand";

interface GameLetters {
  missedLetters: string[];
  hittedLettersWithBadPosition: string[];
  hittedLettersWithGoodPosition: string[];
  addMissedLetters: (letter: string) => void;
  addHittedLettersWithBadPosition: (letter: string, position: number) => void;
  removeHittedLettersWithBadPosition: (
    letter: string,
    position: number
  ) => void;
  addHittedLettersWithGoodPosition: (letter: string, position: number) => void;
  resetMissedLetters: () => void;
  resetHittedLettersWithBadPosition: () => void;
  resetHittedLettersWithGoodPosition: () => void;
}

export const useGameLetters = create<GameLetters>()((set, get) => ({
  missedLetters: [],
  hittedLettersWithBadPosition: new Array<string>(5).fill(""),
  hittedLettersWithGoodPosition: new Array<string>(5).fill(""),
  addMissedLetters: (letter: string) =>
    set({ missedLetters: [...get().missedLetters, letter] }),
  addHittedLettersWithBadPosition: (letter: string, position: number) => {
    const pushInPosition = [...get().hittedLettersWithBadPosition];
    pushInPosition[position] = letter;
    set({
      hittedLettersWithBadPosition: pushInPosition,
    });
  },

  removeHittedLettersWithBadPosition: (letter: string, position: number) => {
    const removeInPosition = [...get().hittedLettersWithBadPosition];
    removeInPosition[position] = letter;
    set({
      hittedLettersWithBadPosition: removeInPosition,
    });
  },
  addHittedLettersWithGoodPosition: (letter: string, position: number) => {
    const pushInPosition = [...get().hittedLettersWithGoodPosition];
    pushInPosition[position] = letter;
    set({
      hittedLettersWithGoodPosition: pushInPosition,
    });
  },
  resetMissedLetters: () => set({ missedLetters: [] }),
  resetHittedLettersWithBadPosition: () =>
    set({ hittedLettersWithBadPosition: [] }),
  resetHittedLettersWithGoodPosition: () =>
    set({ hittedLettersWithGoodPosition: [] }),
}));
