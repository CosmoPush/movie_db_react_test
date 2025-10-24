import { FC } from "react";
import { useEffect, useState } from "react";
import { getMovies } from "../../../services/getMovies.ts";
import { IMovies } from "../../../Models/IMovies.ts";
import { MovieListCardComponent, GenresFilterComponent } from "../index.ts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/helpers";
import { genresNameActions } from "../../../redux/slices/genreNameStoreSlice.ts";
import { genresStoreSliceActions } from "../../../redux/slices/genreStoreSlice.ts";
import { pageActions } from "../../../redux/slices/pageStoreSlice.ts";
import { ErrorComponent, PagesButtonComponent } from "../../common/index.ts";

export const MovieListComponent: FC = () => {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [filterButtonsState, setFilterButtonsState] = useState<string>(
    "filterButtonsActive"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [genresLoading, setGenresLoading] = useState<boolean>(true);
  const [genreSearch, setGenreSearch] = useState<string>("");
  const page = useAppSelector((state) => state.pageSlice.page);

  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.genreNameSlice.genres);
  const filteredGenres = useAppSelector(
    (state) => state.genreFilterSlice.genres
  );

  // Get active genre names for display
  const activeGenreNames =
    filteredGenres.length > 0
      ? genres
          .filter((genre) => filteredGenres.includes(genre.id))
          .map((genre) => genre.name)
          .join(", ")
      : "All Movies";
  console.log(page);
  useEffect(() => {
    const loadGenres = async () => {
      setGenresLoading(true);
      try {
        await dispatch(genresNameActions.loadGenres());
      } finally {
        setGenresLoading(false);
      }
    };
    loadGenres();
  }, [dispatch]);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        console.log(filteredGenres);
        console.log(page);
        const res = await getMovies(JSON.stringify(page), filteredGenres);
        setMovies(res);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [page, filteredGenres]);

  // Skeleton loading component for movies
  const MovieSkeletonCard = ({ index }: { index: number }) => (
    <div
      className="max-w-[250px] h-[400px] m-2.5 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "both",
      }}
    >
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-600 h-full flex flex-col">
        <div className="h-[300px] bg-gray-700 animate-pulse"></div>
        <div className="p-3 flex flex-col justify-between flex-1">
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded animate-pulse w-full"></div>
            <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-12"></div>
            <div className="h-6 bg-gray-700 rounded animate-pulse w-8"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading animation component for genres
  const GenresLoadingSpinner = () => (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
        <span className="text-gray-400 animate-pulse">Loading genres...</span>
      </div>
    </div>
  );

  // Popular genres (you can customize this list)
  const popularGenres = genres.slice(0, 8); // First 8 genres as popular
  const filteredGenresList = genres.filter((genre) =>
    genre.name.toLowerCase().includes(genreSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-x-hidden">
      {/* Header spacing */}
      <div className="pt-[70px]"></div>

      {/* Main content container */}
      <div className="container mx-auto px-4 py-8">
        {/* Active Filters Display */}
        {filteredGenres.length > 0 && (
          <div className="mb-4 animate-in fade-in-0 slide-in-from-top-1 duration-300">
            <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                <span className="text-purple-300 font-medium">
                  Active Filters:
                </span>
                <span className="text-white font-semibold">
                  {activeGenreNames}
                </span>
              </div>
              <button
                onClick={() => {
                  dispatch(genresStoreSliceActions.clearAllGenres());
                  dispatch(pageActions.changePage(1));
                }}
                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-full text-sm transition-all duration-300 hover:scale-105 border border-red-500/30"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Filters Section */}
        <div className="mb-8 animate-in fade-in-0 slide-in-from-top-2 duration-500">
          {/* Filter Toggle Button */}
          <div className="flex justify-center mb-6">
            <button
              className={`group relative px-8 py-4 rounded-full text-base font-semibold cursor-pointer transition-all duration-300 overflow-hidden ${
                filterButtonsState === "filterButtonsActive"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-gray-800/80 text-gray-300 hover:text-white border border-gray-600/50 hover:border-purple-500/50"
              } hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105`}
              onClick={() => {
                if (filterButtonsState === "filterButtonsActive") {
                  setFilterButtonsState("filterButtonsUnactive");
                } else setFilterButtonsState("filterButtonsActive");
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    filterButtonsState === "filterButtonsActive"
                      ? "rotate-180"
                      : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
                {filterButtonsState === "filterButtonsActive"
                  ? "Hide Genre Filters"
                  : "Show Genre Filters"}
              </span>
              {filterButtonsState === "filterButtonsActive" && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-pulse"></div>
              )}
            </button>
          </div>

          {/* Quick Popular Genres (Always Visible) */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                Popular Genres
              </h3>
              <p className="text-gray-400 text-sm">
                Quick access to trending movie categories
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {genresLoading ? (
                <GenresLoadingSpinner />
              ) : (
                popularGenres.map((genre, index) => (
                  <div
                    key={genre.id}
                    className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <GenresFilterComponent genre={genre} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* All Genres Section */}
        {filterButtonsState === "filterButtonsActive" && (
          <div className="mb-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6 shadow-xl shadow-purple-900/20">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  All Movie Genres
                </h3>
                <p className="text-gray-400 text-sm">
                  Browse through all available movie genres
                </p>
              </div>

              {/* Genre Search */}
              <div className="mb-6 max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search genres..."
                    value={genreSearch}
                    onChange={(e) => setGenreSearch(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-gray-700/50 border border-gray-600/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* All Genres Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {genresLoading ? (
                  <GenresLoadingSpinner />
                ) : filteredGenresList.length > 0 ? (
                  filteredGenresList.map((genre, index) => (
                    <div
                      key={genre.id}
                      className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <GenresFilterComponent genre={genre} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <div className="text-gray-400">
                      <svg
                        className="w-12 h-12 mx-auto mb-3 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p>No genres found matching "{genreSearch}"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Movies grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {loading ? (
            // Show skeleton cards while movies are loading
            Array.from({ length: 20 }).map((_, index) => (
              <MovieSkeletonCard key={`skeleton-${index}`} index={index} />
            ))
          ) : movies.length > 0 ? (
            movies.map((movie, index) => (
              <div
                key={movie.id}
                className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "both",
                }}
              >
                <MovieListCardComponent movie={movie} />
              </div>
            ))
          ) : (
            <div className="col-span-full animate-in fade-in-0 slide-in-from-top-2 duration-300">
              <ErrorComponent />
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
          <PagesButtonComponent />
        </div>
      </div>
    </div>
  );
};
