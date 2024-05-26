"use client";

import { useState, useEffect, useCallback } from "react";
import { MovieCard } from "@/components/movie-card";
import { SortMode, SortSelect } from "./sort-select";
import { Button } from "@/components/ui/button";
import { fetchMovies } from "@/api/movies";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { appendList, incrementPage, resetPage, setError, updateList } from "@/lib/features/movies/movies.slice";
import { RootState } from "@/lib/store";

export default function Home() {
  const movies = useAppSelector((state : RootState) => state.movies.movies)
  const sortMode = useAppSelector((state : RootState) => state.movies.sortMode)
  const error = useAppSelector((state : RootState) => state.movies.error)
  const nextPage = useAppSelector((state : RootState) => state.movies.nextPage)

  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const fetchNextSortedMovies = useCallback(
    async (shouldReset = false) => {
      setLoading(true);
      const pageToFetch = shouldReset ? 1 : nextPage;
      fetchMovies(sortMode, pageToFetch)
      .then((nextMovies) => {
        if (shouldReset) {
          dispatch(resetPage())
          dispatch(updateList(nextMovies));
          dispatch(incrementPage())
        } else {
          dispatch(appendList(nextMovies));
          dispatch(incrementPage())
        }
      })
      .catch((error) => {
        dispatch(setError(error))
      })
      .finally(() => {
        setLoading(false);
      });
    },
    [nextPage, sortMode, dispatch]
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
        <SortSelect />
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
