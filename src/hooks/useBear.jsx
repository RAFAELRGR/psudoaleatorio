import { create } from "zustand";

const useBear = create((set) => ({
  randomNumbers: [],
  updateRandomNumbers: (newNumbers) => set({ randomNumbers: newNumbers, existR: 1 }),
  existR: 0
}));

export default useBear;
