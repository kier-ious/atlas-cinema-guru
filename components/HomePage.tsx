"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MovieCard from './MovieCard';
import { titles } from '../seed/titles';

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [minYear, setMinYear] = useState<number | undefined>(undefined);
  const [maxYear, setMaxYear] = useState<number | undefined>(undefined);
  const [genres, setGenres] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [watchLater, setWatchLater] = useState<string[]>([]);

  const moviesPerPage = 10; 

  // Redirect to login if user isn’t logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Filter movies based on search, YR, and genres
  const filterMovies = () => {
    let filtered = titles;

    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minYear) filtered = filtered.filter(movie => movie.released >= minYear);
    if (maxYear) filtered = filtered.filter(movie => movie.released <= maxYear);
    if (genres.length > 0) {
      filtered = filtered.filter(movie => genres.includes(movie.genre));
    }

    return filtered;
  };

  const filteredMovies = filterMovies();
  const paginatedMovies = filteredMovies.slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const toggleWatchLater = (id: string) => {
    setWatchLater((prev) =>
      prev.includes(id) ? prev.filter(watchLaterId => watchLaterId !== id) : [...prev, id]
    );
  };

  const allGenres = Array.from(new Set(titles.map(movie => movie.genre)));

  return (
    <div className="home-page">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Year"
          value={minYear || ''}
          onChange={(e) => setMinYear(e.target.value ? parseInt(e.target.value) : undefined)}
        />
        <input
          type="number"
          placeholder="Max Year"
          value={maxYear || ''}
          onChange={(e) => setMaxYear(e.target.value ? parseInt(e.target.value) : undefined)}
        />
        <select
          multiple
          value={genres}
          onChange={(e) => setGenres(Array.from(e.target.selectedOptions, option => option.value))}
        >
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="movies-list">
        {paginatedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{ ...movie, isFavorite: favorites.includes(movie.id), isWatchLater: watchLater.includes(movie.id) }}
            onFavoriteToggle={toggleFavorite}
            onWatchLaterToggle={toggleWatchLater}
          />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage * moviesPerPage >= filteredMovies.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
