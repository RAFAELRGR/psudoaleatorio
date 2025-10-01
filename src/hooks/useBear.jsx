import { create } from "zustand";

const useBear = create((set) => ({
  randomNumbers: [],
  updateRandomNumbers: (newNumbers) => set({ randomNumbers: newNumbers }),
}));

export default useBear;
