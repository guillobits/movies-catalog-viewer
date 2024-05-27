"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"
import { SortSelect } from "./sort-select"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchNextMovies } from "@/lib/features/movies/movies.actions"

export default function Home() {
  const dispatch = useAppDispatch()
  const sortMode = useAppSelector((state) => state.movies.sortMode)
  const movies = useAppSelector((state) => state.movies.movies)
  const error = useAppSelector((state) => state.movies.error)
  const status = useAppSelector((state) => state.movies.status)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNextMovies(true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(fetchNextMovies(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode])

  const handleLoadMore = () => {
    dispatch(fetchNextMovies(false))
  }

  return (
    <div className="container mt-2">
      <div className="flex gap-4">
        <h1 className="pb-3 text-4xl font-semibold">Movies</h1>
        <SortSelect />
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {movies.map((movie, idx) => (
              <MovieCard key={movie.id} movie={movie} priorizeRender={idx < 3} />
            ))}
          </div>
          <Button 
            data-test-id="SeeMoreButton" variant="outline" onClick={handleLoadMore} disabled={status === "loading"}>
            See more
          </Button>
        </div>
      )}
    </div>
  )
}
