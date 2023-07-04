import { create } from "zustand";

interface ActiveRowState {
  activeRow: number;
  nextActiveRow: () => void;
}

export const useActiveRow = create<ActiveRowState>()((set, get) => ({
  activeRow: 0,
  nextActiveRow: () => set({ activeRow: get().activeRow + 1 }),
}));
