"use client";

import { useState, useEffect } from "react";
import { MovieCard } from "@/components/movie-card";
import { Movie, fetchMovies } from "@/lib/tmdb";
import { SortMode, SortSelect } from "./sort-select";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("release_date_desc");

  const fetchSortedMovies = () => {
    fetchMovies(sortMode)
    .then((movies) => {
      setMovies(movies);
    })
    .catch((error) => {
      setError(error.message);
    });
  }

  useEffect(() => {
    fetchSortedMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchSortedMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode])

  return (
    <div className="container mt-2">
      <div className="flex gap-4">
        <h1 className="text-4xl font-semibold pb-3">Movies</h1>
        <SortSelect mode={sortMode} onChange={setSortMode} />
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
