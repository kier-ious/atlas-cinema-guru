import React from 'react';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  minYear: number | undefined;
  setMinYear: (year: number | undefined) => void;
  maxYear: number | undefined;
  setMaxYear: (year: number | undefined) => void;
  genres: string[];
  setGenres: (genres: string[]) => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  genres,
  setGenres,
}) => {
  const allGenres = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Sci-Fi',
    'Romance',
    'Thriller',
    'Fantasy',
    'Documentary',
    'Animation',
  ];

  const handleGenreClick = (genre: string) => {
    const newGenres = genres.includes(genre)
      ? genres.filter(g => g !== genre)
      : [...genres, genre];
    setGenres(newGenres);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full lg:justify-between lg:space-x-8 p-4">
      {/* Search & Year Filters */}
      <div className="flex flex-col justify-start lg:w-1/2">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 mb-4 border-2 border-[#54F4D0] bg-[#00003C] text-white rounded-full w-full focus:outline-none focus:ring-0"
        />

        <div className="flex space-x-4 w-full">
          <input
            type="number"
            placeholder="Min Year"
            value={minYear || ''}
            onChange={(e) => setMinYear(e.target.value ? parseInt(e.target.value) : undefined)}
            className="p-2 border-2 border-[#54F4D0] bg-[#00003C] text-white rounded-full w-1/2 focus:outline-none focus:ring-0"
          />
          <input
            type="number"
            placeholder="Max Year"
            value={maxYear || ''}
            onChange={(e) => setMaxYear(e.target.value ? parseInt(e.target.value) : undefined)}
            className="p-2 border-2 border-[#54F4D0] bg-[#00003C] text-white rounded-full w-1/2 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Genres Filter */}
      <div className="flex flex-col items-start lg:items-end lg:w-1/2 mt-4 lg:mt-0">
        <h1 className="font-semibold text-lg text-white mb-2">Genres</h1>
        <div className="flex flex-wrap gap-2">
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`px-4 py-2 text-sm border-2 border-[#54F4D0] rounded-full cursor-pointer transition-all duration-200 ${genres.includes(genre) ? 'bg-[#39CCCC] text-[#00003C]' : 'bg-[#001F3F] text-white'
              } focus:outline-none`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
