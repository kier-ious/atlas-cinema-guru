"use client"

import React from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
  image: string;
  favorited: boolean;
  watchLater: boolean;
}

interface MoviesListProps {
  paginatedMovies: Movie[];
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
    <div className="grid grid-cols-3 gap-8 w-full px-4 pt-4">
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
