import { PersonSlice, createPersonSlice } from "./person.slice";
import { create } from "zustand";
type WeddingStore = PersonSlice;
export const useWeddingBoundStore = create<WeddingStore>()((...a) => ({
  ...createPersonSlice(...a),
}));
