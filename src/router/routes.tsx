import { createBrowserRouter } from "react-router";
import { MainLayout } from "../Layouts/MainLayout.tsx";
import { MoviesPage } from "../Pages/MoviesPage.tsx";
import { MovieIdInfoPage } from "../Pages/MovieIdInfoPage.tsx";
import { SorryPage } from "../Pages/SorryPage.tsx";
import { FoundedFilmPage } from "../Pages/FoundedFilmPage.tsx";
import { AuthorizationLayout } from "../Layouts/AuthorizationLayout.tsx";
import { LoginPage } from "../Pages/LoginPage.tsx";
import { FavoritesPageComponent } from "../Pages/FavoritesPage.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MoviesPage /> },
      { path: "movie/:id", element: <MovieIdInfoPage /> },
      { path: "sorry", element: <SorryPage /> },
      { path: "foundedFilm", element: <FoundedFilmPage /> },
      { path: "favorites", element: <FavoritesPageComponent /> },
    ],
  },
  {
    path: "/authorization",
    element: <AuthorizationLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      // {path: '/singIn',element: <SingInPage/>}
    ],
  },
]);
