"use client";

import { useEffect, useState } from "react";
import MoviesList from "@/components/MoviesList";

const WatchLater = () => {
  const [watchLaterMovies, setWatchLaterMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // To handle total pages

  const getImageUrl = (movieId: string) => `/images/${movieId}.webp`;

  useEffect(() => {
    const fetchWatchLater = async () => {
      try {
        const response = await fetch(`/api/watchlater?page=${currentPage}`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setWatchLaterMovies(data.watchLater || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch watch later movies:", error);
      }
    };

    fetchWatchLater();
  }, [currentPage]);

  const handleToggleWatchLater = async (id: string) => {
    setWatchLaterMovies((prev) =>
      prev.some(movie => movie.id === id)
        ? prev.filter(movie => movie.id !== id)
        : [...prev, { id }]
    );
  };

  return (
    <div className="watch-later-page-container min-h-screen text-white py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Watch Later</h1>

      <MoviesList
        paginatedMovies={watchLaterMovies}
        favorites={[]}
        watchLater={watchLaterMovies.map(movie => movie.id)}
        onFavoriteToggle={() => {}}
        onWatchLaterToggle={handleToggleWatchLater}
      />

      {/* Pagination Controls */}
      <div className="pagination-controls flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-400 transition"
          disabled={currentPage === 1} // Disable if on the first page
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-400 transition"
          disabled={currentPage === totalPages} 
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WatchLater;
