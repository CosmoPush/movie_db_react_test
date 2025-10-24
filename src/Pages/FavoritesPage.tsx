import { useAppSelector, useAppDispatch } from "../redux/hooks/helpers";
import { favoritesActions } from "../redux/slices/favoritesStoreSlice.ts";
import { MovieListCardComponent } from "../Components/MovieListCardComponent/MovieListCardComponent.tsx";
import { Link } from "react-router";
import { Button, Card, Modal } from "../Components/UI";
import { useState } from "react";

export const FavoritesPageComponent = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favoritesSlice.favorites);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const handleClearFavorites = () => {
    dispatch(favoritesActions.clearFavorites());
    setIsClearModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-x-hidden">
      {/* Header spacing */}
      <div className="pt-[70px]"></div>

      {/* Main content container */}
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <Card
          title="My Favorite Movies"
          subtitle={`${favorites.length} ${
            favorites.length === 1 ? "movie" : "movies"
          } in your favorites`}
          headerActions={
            <div className="flex gap-3">
              <Link to="/">
                <Button
                  variant="primary"
                  leftIcon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                  }
                >
                  Back to Movies
                </Button>
              </Link>
              {favorites.length > 0 && (
                <Button
                  variant="danger"
                  onClick={() => setIsClearModalOpen(true)}
                  leftIcon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  }
                >
                  Clear All
                </Button>
              )}
            </div>
          }
          className="mb-8"
        >
          <div></div>
        </Card>

        {/* Favorites grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <MovieListCardComponent key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <Card
            title="No Favorite Movies Yet"
            subtitle="Start adding movies to your favorites by clicking the heart icon on any movie card."
            className="text-center py-20"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
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
              </div>
              <Link to="/">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={
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
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  }
                >
                  Browse Movies
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>

      {/* Clear All Confirmation Modal */}
      <Modal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        title="Clear All Favorites"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to remove all movies from your favorites? This
            action cannot be undone.
          </p>

          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={() => setIsClearModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleClearFavorites}>
              Clear All
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
