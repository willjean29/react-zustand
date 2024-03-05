import { devtools } from "zustand/middleware";
import { PersonSlice, createPersonSlice } from "./person.slice";
import { create } from "zustand";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { ConfirmSlice, createConfirmSlice } from "./confirm.slice";
type WeddingStore = PersonSlice & GuestSlice & DateSlice & ConfirmSlice;
export const useWeddingBoundStore = create<WeddingStore>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmSlice(...a),
  }))
);
