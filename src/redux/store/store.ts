import { configureStore } from "@reduxjs/toolkit";
import { pageStoreSlice } from "../slices/pageStoreSlice.ts";
import { genreStoreSlice } from "../slices/genreStoreSlice.ts";
import { genreNameStoreSlice } from "../slices/genreNameStoreSlice.ts";
import { filmResponseStoreSlice } from "../slices/filmResponseStoreSlice.ts";
import favoritesReducer from "../slices/favoritesStoreSlice.ts";

export const store = configureStore({
  reducer: {
    pageSlice: pageStoreSlice.reducer,
    genreFilterSlice: genreStoreSlice.reducer,
    genreNameSlice: genreNameStoreSlice.reducer,
    filmSlice: filmResponseStoreSlice.reducer,
    favoritesSlice: favoritesReducer,
    // sortSlice:,
  },
});
