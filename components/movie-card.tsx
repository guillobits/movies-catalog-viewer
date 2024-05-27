import Image from "next/image"
import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ImageOff, Rocket } from "lucide-react"
import { Movie } from "@/lib/types/movie"

export type MovieCardProps = {
  movie: Movie
  className?: string
  priorizeRender?: boolean
}

export const MovieCard = ({ movie, className, priorizeRender = false }: MovieCardProps) => {
  const router = useRouter()

  const openMovieDetails = () => {
    router.push(`/movies/${movie.id}`)
  }

  return (
    <div
      onClick={openMovieDetails}
      className={cn(
        "relative flex min-h-80 cursor-pointer flex-col-reverse justify-between overflow-hidden rounded-lg border-2 border-border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-2 px-3 py-5 text-card-foreground">
        <h3 className="text-xl font-semibold">{movie.title}</h3>
        <Badge className="flex w-max gap-2">
          <Rocket size={12} />
          {movie.release_date}
        </Badge>
      </div>
      <div className="flex-auto bg-secondary">
        {movie.poster_path ? (
          <Image
            className="h-full w-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            width={400}
            height={100}
            priority={priorizeRender}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-secondary-foreground">
            <ImageOff />
          </div>
        )}
      </div>
    </div>
  )
}
