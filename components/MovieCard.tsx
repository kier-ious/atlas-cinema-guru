import { useState } from "react";

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    synopsis: string;
    released: number;
    genre: string;
    isFavorite: boolean;
    isWatchLater: boolean;
    image_url: string;
  };
  onFavoriteToggle: (id: string) => void;
  onWatchLaterToggle: (id: string) => void;
}

const MovieCard = ({ movie, onFavoriteToggle, onWatchLaterToggle }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.image_url} // Use image_url directly
        alt={movie.title}
        className="movie-image"
      />
      {isHovered && (
        <div className="hover-details">
          <h3>{movie.title}</h3>
          <p>{movie.synopsis}</p>
          <p>Released: {movie.released}</p>
          <p>Genre: {movie.genre}</p>
          <button
            onClick={() => onFavoriteToggle(movie.id)}>
            {movie.isFavorite ? '★' : '☆' }
          </button>
          <button
            onClick={() => onWatchLaterToggle(movie.id)}>
            {movie.isWatchLater ? '🕒' : '⏳'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
