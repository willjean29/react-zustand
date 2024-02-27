import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { customSessionStorage } from "../storages/session-storage.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}
interface PersonActions {
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
}
const personStore: StateCreator<PersonState & PersonActions> = (set) => ({
  firstName: "John",
  lastName: "Doe",
  setFirstName: (name: string) => set({ firstName: name }),
  setLastName: (name: string) => set({ lastName: name }),
});

export const usePersonStore = create<PersonState & PersonActions>()(persist(personStore, { name: "person-store", storage: customSessionStorage }));
