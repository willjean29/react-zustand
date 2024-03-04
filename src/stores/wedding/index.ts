import { devtools } from "zustand/middleware";
import { PersonSlice, createPersonSlice } from "./person.slice";
import { create } from "zustand";
import { createGuestSlice, GuestSlice } from "./guest.slice";
type WeddingStore = PersonSlice & GuestSlice;
export const useWeddingBoundStore = create<WeddingStore>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
  }))
);
