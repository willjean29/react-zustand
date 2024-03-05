import { StateCreator } from "zustand";

export interface ConfirmSlice {
  isConfirmed: boolean;
  setIsConfirmed(value: boolean): void;
}

export const createConfirmSlice: StateCreator<ConfirmSlice, [["zustand/devtools", never]]> = (set) => ({
  isConfirmed: false,
  setIsConfirmed: (value: boolean) => set({ isConfirmed: value }, false, "setIsConfirmed"),
});
