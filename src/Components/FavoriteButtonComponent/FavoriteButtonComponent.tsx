import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/helpers";
import { favoritesActions } from "../../redux/slices/favoritesStoreSlice.ts";
import { IMovies } from "../../Models/IMovies.ts";

interface FavoriteButtonProps {
  movie: IMovies;
  size?: "sm" | "md" | "lg";
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  movie,
  size = "md",
}) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favoritesSlice.favorites);

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(favoritesActions.toggleFavorite(movie));
  };

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`${
        sizeClasses[size]
      } flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
        isFavorite
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-red-400"
      }`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className="w-4 h-4"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};
