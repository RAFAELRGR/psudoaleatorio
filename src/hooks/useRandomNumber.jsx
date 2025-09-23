import { create } from "zustand";
export const useRandomNumber = create((set) => ({
  numbers: [],
  setRandomNumber: (newNumbers) => set({ numbers: newNumbers }),
}));
