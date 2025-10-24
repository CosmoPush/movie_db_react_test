import { FC } from "react";
import { IOneMovie } from "../../../Models/IOneMovie.ts";
import { Link } from "react-router";
import { FavoriteButton } from "../FavoriteButtonComponent/FavoriteButtonComponent.tsx";
import { IMovies } from "../../../Models/IMovies.ts";

interface MovieDetailsProps {
  movie: IOneMovie;
}

export const MovieWholeInfoComponent: FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-[70px] px-4 py-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-600 p-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3 animate-in fade-in-0 slide-in-from-left-2 duration-500">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-xl shadow-lg object-cover animate-in fade-in-0 zoom-in-95 duration-300"
            />
          </div>

          <div className="lg:w-2/3 space-y-4 animate-in fade-in-0 slide-in-from-right-2 duration-500" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <div className="flex items-start justify-between animate-in fade-in-0 slide-in-from-top-2 duration-300">
              <h1 className="text-3xl font-bold text-white animate-in fade-in-0 slide-in-from-left-1 duration-300">{movie.title}</h1>
              <div className="animate-in fade-in-0 slide-in-from-right-1 duration-300">
                <FavoriteButton movie={movie as unknown as IMovies} size="lg" />
              </div>
            </div>

            {movie.tagline && (
              <p className="text-lg italic text-gray-300 animate-in fade-in-0 slide-in-from-bottom-1 duration-300" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>{movie.tagline}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm animate-in fade-in-0 slide-in-from-bottom-2 duration-300" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
              <div className="animate-in fade-in-0 slide-in-from-left-1 duration-200">
                <span className="font-semibold text-purple-400">
                  Original Title:
                </span>
                <span className="text-gray-300 ml-2">
                  {movie.original_title}
                </span>
              </div>
              <div className="animate-in fade-in-0 slide-in-from-right-1 duration-200" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
                <span className="font-semibold text-purple-400">
                  Release Date:
                </span>
                <span className="text-gray-300 ml-2">{movie.release_date}</span>
              </div>
              <div className="animate-in fade-in-0 slide-in-from-left-1 duration-200" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                <span className="font-semibold text-purple-400">Runtime:</span>
                <span className="text-gray-300 ml-2">{movie.runtime} min</span>
              </div>
              <div className="animate-in fade-in-0 slide-in-from-right-1 duration-200" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
                <span className="font-semibold text-purple-400">Status:</span>
                <span className="text-gray-300 ml-2">{movie.status}</span>
              </div>
              <div className="animate-in fade-in-0 slide-in-from-left-1 duration-200" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                <span className="font-semibold text-purple-400">Budget:</span>
                <span className="text-gray-300 ml-2">
                  {movie.budget > 0
                    ? `$${movie.budget.toLocaleString()}`
                    : "N/A"}
                </span>
              </div>
              <div className="animate-in fade-in-0 slide-in-from-right-1 duration-200" style={{ animationDelay: '250ms', animationFillMode: 'both' }}>
                <span className="font-semibold text-purple-400">Revenue:</span>
                <span className="text-gray-300 ml-2">
                  {movie.revenue > 0
                    ? `$${movie.revenue.toLocaleString()}`
                    : "N/A"}
                </span>
              </div>
              <div className="animate-in fade-in-0 slide-in-from-left-1 duration-200" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                <span className="font-semibold text-purple-400">
                  Popularity:
                </span>
                <span className="text-gray-300 ml-2">{movie.popularity}</span>
              </div>
              <div className="animate-in fade-in-0 slide-in-from-right-1 duration-200" style={{ animationDelay: '350ms', animationFillMode: 'both' }}>
                <span className="font-semibold text-purple-400">Vote:</span>
                <span className="text-gray-300 ml-2">
                  {movie.vote_average} / 10 ({movie.vote_count} votes)
                </span>
              </div>
            </div>

            <div className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
              <span className="font-semibold text-purple-400">Genres:</span>
              <span className="text-gray-300 ml-2">
                {movie.genres.map((g) => g.name).join(", ")}
              </span>
            </div>

            <div className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300" style={{ animationDelay: '450ms', animationFillMode: 'both' }}>
              <span className="font-semibold text-purple-400">Overview:</span>
              <p className="text-gray-300 mt-2 leading-relaxed animate-in fade-in-0 slide-in-from-bottom-1 duration-300" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
                {movie.overview}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-gray-700 rounded-lg p-4 animate-in fade-in-0 slide-in-from-left-2 duration-300" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
            <h2 className="text-xl font-semibold text-white mb-3 animate-in fade-in-0 slide-in-from-top-1 duration-200">
              Spoken Languages
            </h2>
            <ul className="space-y-1">
              {movie.spoken_languages.map((lang, idx) => (
                <li
                  key={idx}
                  className="text-gray-300 animate-in fade-in-0 slide-in-from-bottom-1 duration-200"
                  style={{
                    animationDelay: `${650 + idx * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {lang.english_name} ({lang.iso_639_1})
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 animate-in fade-in-0 slide-in-from-right-2 duration-300" style={{ animationDelay: '700ms', animationFillMode: 'both' }}>
            <h2 className="text-xl font-semibold text-white mb-3 animate-in fade-in-0 slide-in-from-top-1 duration-200">
              Production Companies
            </h2>
            <ul className="space-y-1">
              {movie.production_companies.map((company, idx) => (
                <li
                  key={company.id}
                  className="text-gray-300 animate-in fade-in-0 slide-in-from-bottom-1 duration-200"
                  style={{
                    animationDelay: `${750 + idx * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {company.name}{" "}
                  {company.origin_country && `(${company.origin_country})`}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 animate-in fade-in-0 slide-in-from-left-2 duration-300" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
            <h2 className="text-xl font-semibold text-white mb-3 animate-in fade-in-0 slide-in-from-top-1 duration-200">
              Production Countries
            </h2>
            <ul className="space-y-1">
              {movie.production_countries.map((country, idx) => (
                <li
                  key={idx}
                  className="text-gray-300 animate-in fade-in-0 slide-in-from-bottom-1 duration-200"
                  style={{
                    animationDelay: `${850 + idx * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {country.name}
                </li>
              ))}
            </ul>
          </div>

          {movie.homepage && (
            <div className="text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-300" style={{ animationDelay: '900ms', animationFillMode: 'both' }}>
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-lg animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
              >
                Visit Homepage
              </a>
            </div>
          )}
        </div>

        <div className="mt-8 text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-300" style={{ animationDelay: movie.homepage ? '950ms' : '900ms', animationFillMode: 'both' }}>
          <Link
            to={"/"}
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-all duration-200 hover:scale-105 hover:shadow-lg animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};
