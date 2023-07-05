import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WinCounter {
  counter: number;
  incrementCounter: () => void;
}

export const useWinCounter = create<WinCounter>()(
  persist(
    (set, get) => ({
      counter: 0,
      incrementCounter: () => set({ counter: get().counter + 1 }),
    }),
    { name: "winCounter" }
  )
);
