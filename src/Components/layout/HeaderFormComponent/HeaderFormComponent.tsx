import { FC } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hooks/helpers";
import { useEffect, useState } from "react";
import { filmResponseActions } from "../../../redux/slices/filmResponseStoreSlice.ts";
import { pageActions } from "../../../redux/slices/pageStoreSlice.ts";
import { Input, Button } from "../../UI/index.ts";
import { useDynamicSearch } from "../../../hooks/DinamicSearch.ts";
import { searchMoviesByNameDynamic } from "../../../services/getMovies.ts";
import { IFoundMovies } from "../../../Models/IFoundMovies.ts";
interface IFormProps {
  movieRequest: string;
}

export const HeaderFormComponent: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormProps>();
  const [filmName, setFilmName] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Динамічний пошук
  const searchQuery = watch("movieRequest") || "";
  const {
    updateQuery,
    results: searchResults,
    loading: searchLoading,
    error: searchError,
  } = useDynamicSearch<IFoundMovies[]>(
    searchMoviesByNameDynamic,
    300 // 300ms delay
  );

  // Loading animation for dynamic search results
  const LoadingSpinner = () => (
    <div className="p-4 text-center animate-in fade-in-0 slide-in-from-top-1 duration-200">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <div className="absolute inset-0 rounded-full h-8 w-8 border-2 border-purple-300/20 animate-pulse"></div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-400"
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
            <span className="text-gray-300 font-medium animate-pulse">
              Searching movies...
            </span>
          </div>
          <span className="text-gray-500 text-xs animate-pulse">
            Please wait
          </span>
        </div>
      </div>
    </div>
  );

  // Skeleton loading for search results
  const SkeletonResult = ({ index }: { index: number }) => (
    <div
      className="p-3 animate-in fade-in-0 slide-in-from-left-2"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "both",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-16 bg-gray-700 rounded animate-pulse"></div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded animate-pulse w-full"></div>
          <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  );

  // Оновлюємо query для динамічного пошуку
  useEffect(() => {
    updateQuery(searchQuery);
  }, [searchQuery, updateQuery]);

  useEffect(() => {
    if (filmName.trim()) {
      dispatch(filmResponseActions.addResponse(filmName));
    }
  }, [filmName, dispatch]);

  const customHandler = (formData: IFormProps) => {
    setFilmName(formData.movieRequest.replace(/ /g, "%20"));
    dispatch(pageActions.changePage(1));
    navigate("/foundedFilm");
  };
  return (
    <div className="w-full max-w-[420px] relative animate-in fade-in-0 slide-in-from-right-2 duration-500">
      <form
        className="flex gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
        style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        onSubmit={handleSubmit(customHandler)}
      >
        <Input
          className="flex-1 pl-10 animate-in fade-in-0 slide-in-from-left-2 duration-400"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          placeholder="Enter movie name"
          variant="outlined"
          size="md"
          leftIcon={
            <svg
              className="w-5 h-5"
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
          }
          error={errors.movieRequest?.message}
          {...register("movieRequest", { required: "Movie name is required" })}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="animate-in fade-in-0 slide-in-from-right-2 duration-400"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          rightIcon={
            <img
              src="src/Img/search.png"
              alt="search"
              className="h-4 w-4 animate-in fade-in-0 zoom-in-95 duration-300"
              style={{ animationDelay: "0.8s", animationFillMode: "both" }}
            />
          }
        >
          Search
        </Button>
      </form>

      {/* Validation Error Display */}
      {errors.movieRequest?.message && (
        <div className="mt-2 absolute p-2 bg-red-500/10 border border-red-500/20 rounded-lg animate-in fade-in-0 slide-in-from-top-1 duration-300">
          <div className="flex  items-center gap-2">
            <svg
              className="w-4 h-4 text-red-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span className="text-red-400 text-sm">
              {errors.movieRequest.message}
            </span>
          </div>
        </div>
      )}

      {/* Динамічні результати пошуку */}
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-600 max-h-96 overflow-y-auto animate-in fade-in-0 slide-in-from-top-1 duration-300">
          {searchLoading && !searchResults ? (
            <div className="p-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonResult key={index} index={index} />
              ))}
            </div>
          ) : searchLoading && searchResults ? (
            <LoadingSpinner />
          ) : (
            <></>
          )}

          {!searchLoading && searchError && (
            <div className="p-4 text-center animate-in fade-in-0 slide-in-from-top-1 duration-300">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-red-400 font-medium">Search Error</span>
              </div>
              <p className="text-gray-400 text-sm">
                Failed to load search results. Please try again.
              </p>
            </div>
          )}

          {!searchLoading &&
            !searchError &&
            searchResults &&
            searchResults.length > 0 && (
              <div className="p-2">
                {searchResults.slice(0, 5).map((movie, index) => (
                  <div
                    key={movie.id}
                    className="p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-left-2"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                    onClick={() => {
                      navigate(`/movie/${movie.id}`);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/src/Img/question.png";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                          {movie.title}
                        </h3>
                        <p className="text-gray-400 text-sm truncate">
                          {movie.overview}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-yellow-400 text-sm">★</span>
                          <span className="text-gray-300 text-sm">
                            {movie.vote_average.toFixed(1)}
                          </span>
                          <span className="text-gray-500 text-sm">
                            ({movie.release_date})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {searchResults.length > 5 && (
                  <div
                    className="p-2 border-t border-gray-600 animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
                    style={{
                      animationDelay: "600ms",
                      animationFillMode: "both",
                    }}
                  >
                    <button
                      className="w-full text-purple-400 hover:text-purple-300 text-sm py-2 transition-colors duration-200 hover:bg-purple-500/10 rounded"
                      onClick={() => {
                        setFilmName(searchQuery.replace(/ /g, "%20"));
                        dispatch(pageActions.changePage(1));
                        navigate("/foundedFilm");
                      }}
                    >
                      View all results ({searchResults.length})
                    </button>
                  </div>
                )}
              </div>
            )}

          {!searchLoading &&
            !searchError &&
            searchResults &&
            searchResults.length === 0 && (
              <div className="p-6 text-center animate-in fade-in-0 slide-in-from-top-1 duration-300">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
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
                  <div className="space-y-1">
                    <h3 className="text-gray-300 font-medium">
                      No movies found
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Try searching with different keywords
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};
