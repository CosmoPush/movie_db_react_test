import { FC } from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getOneMovie } from "../../../services/getMovies.ts";
import { ErrorComponent } from "../../common";
import { MovieWholeInfoComponent } from "../index.ts";
import { IOneMovie } from "../../../Models/IOneMovie.ts";

export const MovieInfoComponent: FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [movie, setMovie] = useState<IOneMovie>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const res = await getOneMovie(id);
        setMovie(res);
      } catch (error) {
        console.error("Error loading movie:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  // Skeleton component for detailed movie information

  // Loading animation component
  const MovieDetailLoadingSpinner = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-[70px] px-4 py-8 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
          <div className="absolute inset-0 rounded-full h-16 w-16 border-2 border-purple-300 opacity-20 animate-pulse"></div>
        </div>
        <div className="text-center space-y-2">
          <span className="text-gray-400 text-xl animate-pulse block">
            Loading movie...
          </span>
          <span className="text-gray-500 text-sm animate-pulse">
            Please wait
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {loading ? (
        <MovieDetailLoadingSpinner />
      ) : movie ? (
        <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
          <MovieWholeInfoComponent movie={movie} />
        </div>
      ) : (
        <div className="animate-in fade-in-0 slide-in-from-top-2 duration-300">
          <ErrorComponent />
        </div>
      )}
    </div>
  );
};
