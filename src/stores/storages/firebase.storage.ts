import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = "https://zustand-storage-ef6bf-default-rtdb.firebaseio.com/zustand";

const firebaseStore: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) => res.json());
      console.log({ data });
      return JSON.stringify(data);
    } catch (error) {
      throw new Error("Error fetching data");
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    console.log({ value });
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
    console.log({ data });
    return;
  },
  removeItem: function (name: string): void {
    console.log("object removed", name);
  },
};

export const customFirebaseStorage = createJSONStorage(() => firebaseStore);
