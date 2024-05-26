"use client";

import { useState, useEffect, useCallback } from "react";
import { MovieCard } from "@/components/movie-card";
import { Movie, fetchMovies } from "@/lib/tmdb";
import { SortMode, SortSelect } from "./sort-select";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [nextPage, setNextPage] = useState<number>(1);
  const [sortMode, setSortMode] = useState<SortMode>("release_date_desc");
  const [loading, setLoading] = useState(false);

  const fetchNextSortedMovies = useCallback(
    async (shouldReset = false) => {
      setLoading(true);
      const pageToFetch = shouldReset ? 1 : nextPage;
      fetchMovies(sortMode, pageToFetch)
      .then((nextMovies) => {
        if (shouldReset) {
          setMovies(nextMovies);
          setNextPage(2);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...nextMovies]);
          setNextPage((prevPage) => prevPage + 1);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    },
    [sortMode, nextPage]
  );

  useEffect(() => {
    fetchNextSortedMovies(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode]);

  const handleLoadMore = () => {
    fetchNextSortedMovies();
  };

  return (
    <div className="container mt-2">
      <div className="flex gap-4">
        <h1 className="text-4xl font-semibold pb-3">Movies</h1>
        <SortSelect mode={sortMode} onChange={setSortMode} />
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-col gap-5 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
            {movies.map((movie, idx) => (
              <MovieCard key={movie.id} movie={movie} priorizeRender={idx < 3} />
            ))}
          </div>
          <Button variant="outline" onClick={handleLoadMore} disabled={loading}>
            See more
          </Button>
        </div>
      )}
    </div>
  );
}
