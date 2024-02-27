import { createJSONStorage, StateStorage } from "zustand/middleware";

const sessionStore: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: function (name: string, value: string): void {
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): void {
    console.log("object removed", name);
  },
};

export const customSessionStorage = createJSONStorage(() => sessionStore);
