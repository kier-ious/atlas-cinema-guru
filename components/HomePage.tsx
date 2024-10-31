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

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

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
    <main className="home-page flex flex-col items-center justify-center p-6 space-y-8">

      {/* Filters */}
      <div className="flex flex-col lg:flex-row w-full lg:items-start lg:justify-end lg:space-x-8">

        {/* Search & Year Filters */}
        <div className="flex flex-col items-end space-y-4 lg:w-1/3">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-[#54F4D0] bg-[#00003C] text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#54F4D0]"
          />

          <div className="flex space-x-4 w-full">
            <input
              type="number"
              placeholder="Min Year"
              value={minYear || ''}
              onChange={(e) => setMinYear(e.target.value ? parseInt(e.target.value) : undefined)}
              className="p-2 border border-[#54F4D0] bg-[#00003C] text-white rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-[#54F4D0]"
            />
            <input
              type="number"
              placeholder="Max Year"
              value={maxYear || ''}
              onChange={(e) => setMaxYear(e.target.value ? parseInt(e.target.value) : undefined)}
              className="p-2 border border-[#54F4D0] bg-[#00003C] text-white rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-[#54F4D0]"
            />
          </div>
        </div>

        {/* Genres Filter */}
        <div className="flex flex-col items-start w-full lg:w-1/4 lg:pl-6">
          <div className="font-semibold text-lg text-white mb-2">Genres</div>
          <div className="grid grid-cols-2 gap-2 w-full">
            {allGenres.map((genre) => (
              <button
                key={genre}
                value={genre}
                onClick={() => setGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre])}
                className="px-4 py-2 bg-[#00003C] border border-[#54F4D0] text-white rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-[#54F4D0]"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Movies List */}
      <div className="movies-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4">
        {paginatedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              ...movie, image_url: movie.image_url || '',
              isFavorite: favorites.includes(movie.id),
              isWatchLater: watchLater.includes(movie.id),
            }}
            onFavoriteToggle={toggleFavorite}
            onWatchLaterToggle={toggleWatchLater}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination flex items-center space-x-4 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * moviesPerPage >= filteredMovies.length}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </main>
  );
};

export default HomePage;
