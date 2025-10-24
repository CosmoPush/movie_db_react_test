import { FC, useEffect, useState } from "react";
import { IMovies } from "../../../Models/IMovies.ts";
import {
  PosterPreviewComponent,
  GeneralMovieInfoComponent,
} from "../../common";
import { getGenreById } from "../../../utils/getGenreById.ts";
import { GenresBadgeComponent, FavoriteButton } from "../index.ts";
import { Link } from "react-router";

type movieProps = { movie: IMovies };

export const MovieListCardComponent: FC<movieProps> = ({ movie }) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [genresLoading, setGenresLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGenres = async () => {
      setGenresLoading(true);
      try {
        if (movie.genre_ids) {
          const res = await getGenreById(movie.genre_ids);
          setGenres(res);
        } else {
          setGenres(["No genres"]);
        }
      } catch (error) {
        console.error("Error loading genres:", error);
        setGenres(["Error"]);
      } finally {
        setGenresLoading(false);
      }
    };
    loadGenres();
  }, [movie.genre_ids]);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-600 flex flex-col justify-between h-full hover:shadow-2xl hover:shadow-purple-500 transition-all duration-300 relative">
        {/* Favorite button */}
        <div className="absolute top-2 right-2 z-10">
          <FavoriteButton movie={movie} size="sm" />
        </div>

        <div className="flex-shrink-0">
          <PosterPreviewComponent
            poster={{
              title: movie.title,
              preview: movie.backdrop_path,
            }}
          />
        </div>

        <div className="p-4 flex flex-col justify-between flex-grow">
          <GeneralMovieInfoComponent
            overview={movie.overview}
            rating={movie.vote_average}
            votes={movie.vote_count}
            release_date={movie.release_date}
          />

          <ul className="flex flex-wrap gap-1 mt-3">
            {genresLoading ? (
              <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-6 w-16 bg-gray-700 rounded-full animate-pulse"
                  />
                ))}
              </div>
            ) : (
              genres.map((genre, index) => (
                <li
                  key={index}
                  className="animate-in fade-in-0 slide-in-from-left-1 duration-200"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <GenresBadgeComponent genre={genre} />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </Link>
  );
};
