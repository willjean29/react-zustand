import { create, StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
// import { customSessionStorage } from "../storages/session.storage";
// import { customFirebaseStorage } from "../storages/firebase.storage";
// import { logger } from "../middlewares/logger.midleware";

interface PersonState {
  firstName: string;
  lastName: string;
}
interface PersonActions {
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
}
const personStore: StateCreator<PersonState & PersonActions, [["zustand/devtools", never]]> = (set) => ({
  firstName: "John",
  lastName: "Doe",
  setFirstName: (value: string) => set({ firstName: value }, false, "setFirstName"),
  setLastName: (value: string) => set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<PersonState & PersonActions>()(
  // logger(
  devtools(
    persist(personStore, {
      name: "person-store",
      // storage: customSessionStorage
      // storage: customFirebaseStorage,
    })
  )
  // )
);
