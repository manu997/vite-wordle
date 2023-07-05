import { create } from "zustand";

interface GameState {
  gameState: string;
  setGameState: (newGameState: string) => void;
}

export const useGameState = create<GameState>()((set) => ({
  gameState: "playing",
  setGameState: (newGameState: string) => set({ gameState: newGameState }),
}));
