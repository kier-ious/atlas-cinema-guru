"use client";

import { useEffect, useState } from "react";
import MoviesList from "@/components/MoviesList";
import Pagination from "@/components/Pagination";

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites?page=${currentPage}`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setFavorites(data.favorites || []);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, [currentPage]);

  const handleToggleFavorite = async (id: string) => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((movie) => movie.id !== id)
        );
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  return (
    <div className="favorites-page-container min-h-screen text-white py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Favorites</h1>

      <MoviesList
        paginatedMovies={favorites}
        favorites={favorites.map((movie) => movie.id)}
        watchLater={[]}
        onFavoriteToggle={handleToggleFavorite}
        onWatchLaterToggle={() => {}}
      />

      <div className="pagination-controls flex justify-center mt-8 space-x-4">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage} totalMovies={0}
        />
      </div>
    </div>
  );
};

export default Favorites;
