import { create } from "zustand";

const useGlobalStore = create((set) => {
  return {
    favorite: false,
    ContactId: "",
    searchInputData: "",
    favoriteFunction: () =>
      set((state) => ({ ...state, favorite: !state.favorite })),
    setSearchDataToGlobalStore: (data) =>
      set((state) => ({ ...state, searchInputData: data })),
    // setContactIdToGlobalStore: (data) =>
    //   set((state) => ({ ...state, ContactId: data })),
    setContactIdToGlobalStore: (data) =>
      set((state) => {
        if (data === "AddContact") {
          return { ...state, ContactId: null }; 
        } else {
          return { ...state, ContactId: data };
        }
      }),
  };
});

export default useGlobalStore;
