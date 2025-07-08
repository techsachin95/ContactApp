import { create } from "zustand";

const useGlobalStore = create((set) => ({
  favorite: false,
  ContactId: null,
  searchInputData: "",
  favoriteFunction: () => set((state) => ({ favorite: !state.favorite })),
  setSearchDataToGlobalStore: (data) => set(() => ({ searchInputData: data })),
  setContactIdToGlobalStore: (data) =>
    set(() => ({
      ContactId: data === "AddContact" ? null : data,
    })),
}));

export default useGlobalStore;
