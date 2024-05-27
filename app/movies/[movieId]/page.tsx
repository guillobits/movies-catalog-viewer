"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

import { MovieCard } from "@/components/movie-card"
import { fetchMovie, fetchMovieRecommandations } from "@/api/movies"
import { Movie } from "@/lib/types/movie"

export default function MovieDetails({ params }: { params: { movieId: string } }) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [movieRecommentations, setMovieRecommentations] = useState<Movie[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const movieId = parseInt(params.movieId)
    fetchMovie(movieId)
      .then((movie) => {
        setMovie(movie)
      })
      .catch(() => {
        setError("Error while fetching the movie details")
      })
    fetchMovieRecommandations(movieId).then((recommandations) =>
      setMovieRecommentations(recommandations),
    ).catch(() => {
      setError("Error while fetching recommendations")
    })
  }, [params.movieId])

  return (
    <>
      {error ? <p>{error}</p> : null}
      {movie ? (
        <div className="flex flex-col gap-5">
          {/* Hero */}
          <div className="relative flex h-screen w-full md:h-[600px]">
            {/* Hero Image Background */}
            {movie.backdrop_path ? (
              <>
                <Image
                  className="h-full w-full object-cover"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                  width={1920}
                  height={800}
                  priority={true}
                />
                {/* Hero Overlay */}
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-gradient-to-r from-slate-900/70 via-slate-900/70 via-50% to-80%" />
              </>
            ) : (
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-slate-900/70" />
            )}

            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 top-0 w-full">
              <div className="container h-full">
                <div className="flex h-full flex-col justify-center gap-3 text-white lg:w-1/2">
                  <h1 className="text-4xl italic">{movie.title}</h1>
                  {movie.release_date ? <span>Released on {movie.release_date}</span> : null}
                  {movie.overview ? (
                    <>
                      <h2 className="text-xl font-semibold">Synopsis</h2>
                      <p>{movie.overview}</p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <h2 className="mb-3 text-3xl">Recommendations</h2>
            {movieRecommentations.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
                {movieRecommentations.map((movieRecommended) => (
                  <MovieCard key={movieRecommended.id} movie={movieRecommended} />
                ))}
              </div>
            ) : (
              <p>No recommendation for this movie</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
