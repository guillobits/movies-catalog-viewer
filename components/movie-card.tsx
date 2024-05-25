import Image from "next/image";
import { useRouter } from "next/navigation";

import { Movie } from "@/lib/tmdb";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ImageOff, Rocket } from "lucide-react";

export type MovieCardProps = {
  movie: Movie;
  className?: string;
};

export const MovieCard = (props: MovieCardProps) => {
  const router = useRouter();

  const openMovieDetails = () => {
    router.push(`/movies/${props.movie.id}`);
  };

  return (
    <div
      onClick={openMovieDetails}
      className={cn(
        "relative rounded-lg border-2 border-border bg-card text-card-foreground shadow-sm cursor-pointer overflow-hidden flex flex-col-reverse justify-between min-h-80",
        props.className
      )}
      {...props}
    >
      <div className="flex flex-col text-card-foreground py-5 px-3 gap-2">
        <h3 className="text-xl font-semibold">{props.movie.original_title}</h3>
        <Badge className="flex w-max gap-2">
          <Rocket size={12} />
          {props.movie.release_date}
        </Badge>
      </div>
      <div className="bg-secondary flex-auto">
        {props.movie.poster_path ? (
          <Image
            className="object-cover h-full w-full"
            src={`https://image.tmdb.org/t/p/original/${props.movie.poster_path}`}
            alt={props.movie.original_title}
            width={400}
            height={100}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-secondary-foreground">
            <ImageOff />
          </div>
        )}
      </div>
    </div>
  );
};
