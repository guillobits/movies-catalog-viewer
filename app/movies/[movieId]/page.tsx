"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Movie, fetchMovie, fetchMovieRecommandations } from "@/lib/tmdb";
import { Badge } from "@/components/ui/badge";
import { MovieCard } from "@/components/movie-card";

export default function MovieDetails({
  params,
}: {
  params: { movieId: string };
}) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieRecommentations, setMovieRecommentations] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const movieId = parseInt(params.movieId);
    fetchMovie(movieId)
      .then((movie) => {
        setMovie(movie);
        fetchMovieRecommandations(movieId).then((recommandations) =>
          setMovieRecommentations(recommandations)
        );
      })
      .catch(() => {
        setError("Error while fetching the movie details");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {movie ? (
        <div className="flex flex-col gap-5">
          {/* Hero */}
          <div className="relative flex w-full h-screen md:h-[600px]">
            {/* Hero Image Background */}
            {movie.backdrop_path ? (
              <>
                <Image
                  className="object-cover w-full h-full"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                  width={1920}
                  height={800}
                />
                {/* Hero Overlay */}
                <div className="bg-gradient-to-r from-slate-900/70 via-50% via-slate-900/70 to-80% w-full h-full absolute top-0 left-0 right-0 bottom-0" />
              </>
            ) : (
              <div className="bg-slate-900/70 absolute top-0 left-0 right-0 bottom-0" />
            )}

            {/* Hero Content */}
            <div className="absolute top-0 bottom-0 left-0 w-full">
              <div className="container h-full">
                <div className="flex flex-col gap-3 lg:w-1/2 h-full justify-center text-white">
                  <h1 className="text-4xl italic">{movie.title}</h1>
                  {movie.release_date ? (
                    <span>Released on {movie.release_date}</span>
                  ) : null}
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
            <h2 className="text-3xl mb-3">Recommendations</h2>
            {movieRecommentations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
                {movieRecommentations.map((movieRecommended) => (
                  <MovieCard
                    key={movieRecommended.id}
                    movie={movieRecommended}
                  />
                ))}
              </div>
            ) : (
              <p>No recommendation for this movie</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
