import { useAppSelector } from "../../redux/hooks/helpers";
import { FoundedMovieComponent } from "../FoundedMovieComponent/FoundedMovieComponent.tsx";
import { useNavigate } from "react-router";
import { ErrorComponent } from "../ErrorComponent/ErrorComponent.tsx";
import { PagesButtonComponent } from "../PagesButtonsComponent/PagesButtonComponent.tsx";
import { useEffect, useState } from "react";
import { IFoundMovies } from "../../Models/IFoundMovies.ts";
import { searchMoviesByName } from "../../services/getMovies.ts";

export const FoundedMoviesComponent = () => {
  const request = useAppSelector((state) => state.filmSlice.result);
  const page = useAppSelector((state) => state.pageSlice.page);
  const [films, setFilms] = useState<IFoundMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const res = await searchMoviesByName(request, page);
        setFilms(res);
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [page, request]);

  // Skeleton loading component for found movies
  const FoundedMovieSkeleton = ({ index }: { index: number }) => (
    <div
      className="max-w-[250px] h-[350px] m-2.5 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-600 h-full flex flex-col">
        <div className="h-[200px] bg-gray-700 animate-pulse"></div>
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


  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-20 flex flex-col">
      <button
        className="mx-auto bg-purple-600 text-white border-none px-5 py-2 rounded-full text-base font-medium cursor-pointer shadow-sm transition-all duration-200 self-center justify-center w-[300px] hover:bg-purple-700 animate-in fade-in-0 slide-in-from-top-2 duration-500"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <div className="flex justify-center flex-wrap mx-auto items-center">
        {loading ? (
          // Show skeleton cards while movies are loading
          Array.from({ length: 12 }).map((_, index) => (
            <FoundedMovieSkeleton key={index} index={index} />
          ))
        ) : films.length > 0 ? (
          films
            .filter(Boolean)
            .map((movie, index) => (
              <div
                key={movie.id}
                className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'both'
                }}
              >
                <FoundedMovieComponent movie={movie} />
              </div>
            ))
        ) : (
          <div className="col-span-full animate-in fade-in-0 slide-in-from-top-2 duration-300">
            <ErrorComponent />
          </div>
        )}
      </div>
      <div className="flex justify-center animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        <PagesButtonComponent />
      </div>
    </div>
  );
};
