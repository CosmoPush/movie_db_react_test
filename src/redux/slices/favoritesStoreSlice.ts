import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovies } from "../../Models/IMovies.ts";

interface FavoritesState {
  favorites: IMovies[];
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<IMovies>) => {
      const movie = action.payload;
      const isAlreadyFavorite = state.favorites.some(
        (fav) => fav.id === movie.id
      );

      if (!isAlreadyFavorite) {
        state.favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      state.favorites = state.favorites.filter((movie) => movie.id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    toggleFavorite: (state, action: PayloadAction<IMovies>) => {
      const movie = action.payload;
      const existingIndex = state.favorites.findIndex(
        (fav) => fav.id === movie.id
      );

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(movie);
      }

      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const favoritesActions = favoritesSlice.actions;
export default favoritesSlice.reducer;
