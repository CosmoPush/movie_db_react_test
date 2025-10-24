import { FC, useEffect, useState } from "react";
import { PosterPreviewComponent } from "../PosterPreviewComponent/PosterPreviewComponent.tsx";
import { GeneralMovieInfoComponent } from "../GeneralMovieInfoComponent/GeneralMovieInfoComponent.tsx";
import { Link } from "react-router";
import { IFoundMovies } from "../../Models/IFoundMovies.ts";
import { GenresBadgeComponent } from "../GenreBadgeComponent/GenresBadgeComponent.tsx";
import { getGenreById } from "../../utils/getGenreById.ts";
import { FavoriteButton } from "../FavoriteButtonComponent/FavoriteButtonComponent.tsx";

type movieProps = { movie: IFoundMovies };
export const FoundedMovieComponent: FC<movieProps> = ({ movie }) => {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    if (movie.genre_ids) {
      getGenreById(movie.genre_ids).then((res) => setGenres(res));
    } else {
      setGenres(["No genres"]);
    }
  }, []);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="flex max-w-[250px] h-[350px] m-2.5 transition-transform duration-300 ease-in-out box-border"
    >
      {movie && (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-600 flex flex-col justify-between max-w-[250px] h-[350px] m-2.5 transition-transform duration-300 ease-in-out box-border hover:transition-all hover:duration-200 hover:shadow-2xl hover:shadow-purple-500 relative">
          {/* Favorite button */}
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton movie={movie as any} size="sm" />
          </div>

          <div className="static">
            <PosterPreviewComponent
              poster={{
                title: movie.title,
                preview: movie.backdrop_path,
              }}
            />
          </div>
          <div className="px-1.5 pb-1.5 flex flex-col justify-around">
            <GeneralMovieInfoComponent
              overview={movie.overview}
              rating={movie.vote_average}
              votes={movie.vote_count}
              release_date={movie.release_date}
            />
            <ul className="flex flex-wrap text-xs gap-1">
              {genres.map((genre, index) => (
                <GenresBadgeComponent key={index} genre={genre} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </Link>
  );
};
