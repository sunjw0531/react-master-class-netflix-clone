const API_KEY = '2eb91db2e2cd808cd6ca5f4d3c5a62e6';
const BASE_PATH = 'https://api.themoviedb.org/3';

// get now-playing movies
interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
}

// get latest movies

interface Genre {
  id: number;
  name: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface IGetLatestMovies {
  adult: boolean;
  backdrop_path?: any;
  belongs_to_collection?: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id?: any;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: any;
  production_companies: any[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: any[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export function getLatestMovies() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ITopRatedMovies {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&page=1`).then(
    (res) => res.json()
  );
}

interface Dates {
  maximum: string;
  minimum: string;
}

export interface IUpComingMovies {
  dates: Dates;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export function getUpComingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&page=1`).then(
    (res) => res.json()
  );
}

/////////////////////////
//// TV API /////////////
/////////////////////////
export function getTVonair() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko&page1`
  ).then((res) => res.json());
}

interface TVResult {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface ITVonair {
  page: number;
  results: TVResult[];
  total_pages: number;
  total_results: number;
}

export function getTVtoprated() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko&page=1`
  ).then((res) => res.json());
}

export function getTVpopular() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko&page=1`
  ).then((res) => res.json());
}
