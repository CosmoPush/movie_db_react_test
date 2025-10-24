import axios from "axios";
import { BaseResponseType } from "../Models/BaseResponseType.ts";
import { IMovies } from "../Models/IMovies.ts";
import { IGenres, IGenresResponse } from "../Models/IGenres.ts";
import { IOneMovie } from "../Models/IOneMovie.ts";
import { IFoundMovies } from "../Models/IFoundMovies.ts";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmI2Yjg5MjQ0ZDljY2Q5ZDQ0NThiMDBiNWMwN2ViNyIsIm5iZiI6MTc0NDk4MjIwOS43MTUwMDAyLCJzdWIiOiI2ODAyNTBjMTJlODk1OGYwZjk5OTgzYTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ljCeozSUNEWn1VeoeakRRpal3mPJQIyAAdb7M6cKOcc",
  },
});

export const getMovies = async (
  page: string,
  genreIds: number[]
): Promise<IMovies[]> => {
  let genreParam;
  if (genreIds) {
    genreParam = genreIds.join("%2C");
  } else {
    genreParam = "";
  }
  const { data } = await axiosInstance.get<
    BaseResponseType & { results: IMovies[] }
  >(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreParam}`
  );

  console.log(data.results);
  return data.results;
};

export const getGenres = async (): Promise<IGenres[]> => {
  const { data } = await axiosInstance.get<IGenresResponse>(
    "/genre/movie/list?language=en"
  );
  console.log(data.genres);
  return data.genres;
};

export const getOneMovie = async (movie: string): Promise<IOneMovie> => {
  const { data } = await axiosInstance.get<IOneMovie>(
    "/movie/" + movie + "?language=en-US"
  );
  console.log(data);
  return data;
};
export const searchMoviesByName = async (
  query: string,
  page: number
): Promise<IFoundMovies[]> => {
  const { data } = await axiosInstance.get<
    BaseResponseType & { results: IFoundMovies[] }
  >(
    "/search/movie?query=" +
      query +
      "&include_adult=false&language=en-US&page=" +
      page
  );
  console.log(data);
  return data.results;
};

export const searchMoviesByNameDynamic = async (
  query: string
): Promise<IFoundMovies[]> => {
  if (!query.trim()) {
    return [];
  }

  const { data } = await axiosInstance.get<
    BaseResponseType & { results: IFoundMovies[] }
  >(
    "/search/movie?query=" +
      query +
      "&include_adult=false&language=en-US&page=1"
  );
  console.log("Dynamic search results:", data);
  return data.results;
};
