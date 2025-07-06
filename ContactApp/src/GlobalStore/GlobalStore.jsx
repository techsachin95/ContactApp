import { create } from "zustand";

const useGlobalStore = create((set) => {
  return {
    favorite: false,
    searchInputData: "",
    favoriteFunction: () =>
      set((state) => ({ ...state, favorite: !state.favorite })),
    setSearchDataToGlobalStore: (data) =>
      set((state) => ({ ...state, searchInputData: data })),
  };
});

export default useGlobalStore;
