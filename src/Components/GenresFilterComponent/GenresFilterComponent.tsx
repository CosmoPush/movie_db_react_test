import { IGenres } from "../../Models/IGenres.ts";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/helpers";
import { genresStoreSliceActions } from "../../redux/slices/genreStoreSlice.ts";
import { pageActions } from "../../redux/slices/pageStoreSlice.ts";

type GenreProps = { genre: IGenres };

export const GenresFilterComponent: FC<GenreProps> = ({ genre }) => {
  const dispatch = useAppDispatch();
  const selectedGenres = useAppSelector(
    (state) => state.genreFilterSlice.genres
  );
  const [buttonState, setButtonState] = useState<string>(
    selectedGenres.includes(genre.id) ? "active" : "unactive"
  );

  useEffect(() => {}, [buttonState]);

  const handleClick = () => {
    dispatch(pageActions.changePage(1));
    dispatch(genresStoreSliceActions.toggleGenre(genre.id));
    if (buttonState === "unactive") {
      setButtonState("active");
    } else setButtonState("unactive");
  };
  return (
    <button
      className={`group relative border-none px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 whitespace-nowrap overflow-hidden ${
        buttonState === "active"
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
          : "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80 hover:text-white border border-gray-600/50"
      } hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 hover:-translate-y-0.5`}
      onClick={handleClick}
    >
      <span className="relative z-10">{genre.name}</span>
      {buttonState === "active" && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-pulse"></div>
      )}
      {buttonState !== "active" && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-purple-300/10 rounded-full transition-all duration-300"></div>
      )}
    </button>
  );
};
