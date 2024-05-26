"use server";

import { SortMode } from "@/app/sort-select";

const TMDB_API_URI = "https://api.themoviedb.org/3";
const TMDB_HEADERS = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

export interface Movie {
  id: number
  title: string
  original_title: string
  release_date: string
  overview: string
  poster_path: string
  backdrop_path: string
}

export interface MoviesFetchResponse {
  results: Movie[];
}

/**
 * Fetch the movies from TMDB
 * 
 * @param sort The sort mode to use
 * @param page The current page - start at 1
 * @returns Movie[] - A list of movie
 */
export const fetchMovies = async (sort: SortMode, page: number) => {
  const now = new Date();
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  // Filter the movies already released (by release_date < now)
  let endpoint = "/discover/movie"
  endpoint += `?primary_release_date.lte=${formatDate(now)}`
  endpoint += `&page=${page}`
  endpoint += `&sort_by=primary_release_date.`

  // Apply Sorting mode
  endpoint += (sort === 'release_date_asc') ? 'asc' : 'desc'

  const data = await fetch(`${TMDB_API_URI}${endpoint}`, TMDB_HEADERS);
  if (!data.ok) {
    throw new Error(`Failed to fetch the last released movies`);
  }

  const response: MoviesFetchResponse = await data.json();
  return response.results;
};

/**
 * Fetch a specified movie from TMDB
 * @param id The TMDB movie id to retrieve
 * @returns Movie - The movie object
 */
export const fetchMovie = async (id: number) => {
  const data = await fetch(`${TMDB_API_URI}/movie/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });

  if (!data.ok) {
    throw new Error(`Failed to fetch the movie with id=${id}`);
  }
  return (await data.json()) as Movie;
};

/**
 * Fetch the movies recommendation for a specified movie
 * @param id - The TMDB movie id recommandations desired
 * @returns Movie[] - The movies related to the movie specified
 */
export const fetchMovieRecommandations = async (id: number) => {
  const data = await fetch(
    `${TMDB_API_URI}/movie/${id}/recommendations`,
    TMDB_HEADERS
  );
  if (!data.ok) {
    throw new Error(`Failed to fetch movie recommandations`);
  }

  const response: MoviesFetchResponse = await data.json();
  return response.results;
};