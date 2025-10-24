export interface IResults {
  id: number;
  name: string;
}

export interface IFindFilmResponse  {
  page: number;
  results: IResults[];
  total_pages: number;
  total_results: number;
}