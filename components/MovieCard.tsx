import { useState } from "react";

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    synopsis: string;
    released: number;
    genre: string;
    favorited: boolean;
    watchLater: boolean;
    image: string;
  };
  onFavoriteToggle: (id: string) => void;
  onWatchLaterToggle: (id: string) => void;
}

const MovieCard = ({ movie, onFavoriteToggle, onWatchLaterToggle }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative 50% 50% overflow-hidden transition-transform transform hover:scale-105 z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-44 object-cover rounded-lg"
      />
      {isHovered && (
        <div className="absolute bottom-0 w-full bg-black bg-opacity-80 text-white p-3 transition-opacity">
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
          <p className="text-sm">{movie.synopsis}</p>
          <p className="text-xs">Released: {movie.released}</p>
          <p className="text-xs">Genre: {movie.genre}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onFavoriteToggle(movie.id)}
              className="text-yellow-400"
            >
              {movie.favorited ? '★' : '☆'}
            </button>
            <button
              onClick={() => onWatchLaterToggle(movie.id)}
              className="text-blue-400"
            >
              {movie.watchLater ? '🕒' : '⏳'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
