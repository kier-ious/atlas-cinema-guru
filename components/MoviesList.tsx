import React from 'react';
import MovieCard from './MovieCard';

interface MoviesListProps {
  paginatedMovies: any[];
  favorites: string[];
  watchLater: string[];
  onFavoriteToggle: (id: string) => void;
  onWatchLaterToggle: (id: string) => void;
}

const MoviesList: React.FC<MoviesListProps> = ({
  paginatedMovies,
  favorites,
  watchLater,
  onFavoriteToggle,
  onWatchLaterToggle,
}) => {
  return (
    <div className="movies-list grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full px-4 pt-4">
      {paginatedMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={{
            ...movie,
            favorited: favorites.includes(movie.id),
            watchLater: watchLater.includes(movie.id),
          }}
          onFavoriteToggle={onFavoriteToggle}
          onWatchLaterToggle={onWatchLaterToggle}
        />
      ))}
    </div>
  );
};

export default MoviesList;
