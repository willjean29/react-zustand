import { devtools } from "zustand/middleware";
import { PersonSlice, createPersonSlice } from "./person.slice";
import { create } from "zustand";
type WeddingStore = PersonSlice;
export const useWeddingBoundStore = create<WeddingStore>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
  }))
);
