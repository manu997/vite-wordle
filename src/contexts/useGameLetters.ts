import { create } from "zustand";

interface GameLetters {
  missedLetters: string[];
  hittedLettersWithBadPosition: string[];
  hittedLettersWithGoodPosition: string[];
  addMissedLetters: (letter: string) => void;
  addHittedLettersWithBadPosition: (letter: string) => void;
  removeHittedLettersWithBadPosition: (letter: string) => void;
  addHittedLettersWithGoodPosition: (letter: string) => void;
  resetMissedLetters: () => void;
  resetHittedLettersWithBadPosition: () => void;
  resetHittedLettersWithGoodPosition: () => void;
}

export const useGameLetters = create<GameLetters>()((set, get) => ({
  missedLetters: [],
  hittedLettersWithBadPosition: [],
  hittedLettersWithGoodPosition: [],
  addMissedLetters: (letter: string) =>
    set({ missedLetters: [...get().missedLetters, letter] }),
  addHittedLettersWithBadPosition: (letter: string) =>
    set({
      hittedLettersWithBadPosition: [
        ...get().hittedLettersWithBadPosition,
        letter,
      ],
    }),
  removeHittedLettersWithBadPosition: (letter: string) =>
    set({
      hittedLettersWithBadPosition: [
        ...get().hittedLettersWithBadPosition.filter(
          (letterInWord) => letterInWord !== letter
        ),
      ],
    }),
  addHittedLettersWithGoodPosition: (letter: string) =>
    set({
      hittedLettersWithGoodPosition: [
        ...get().hittedLettersWithGoodPosition,
        letter,
      ],
    }),
  resetMissedLetters: () => set({ missedLetters: [] }),
  resetHittedLettersWithBadPosition: () =>
    set({ hittedLettersWithBadPosition: [] }),
  resetHittedLettersWithGoodPosition: () =>
    set({ hittedLettersWithGoodPosition: [] }),
}));
