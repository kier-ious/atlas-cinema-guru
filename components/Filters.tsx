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
  allGenres: string[];
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
  allGenres,
}) => {
  return (
    <div className="flex flex-col lg:flex-row w-full lg:justify-between lg:space-x-8 p-6">
      {/* Search & Year Filters on the Left */}
      <div className="flex flex-col justify-start">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-[#54F4D0] bg-[#00003C] text-white rounded-full w-full focus:outline-none focus:ring-0"
        />

        <div className="flex space-x-4 w-full">
          <input
            type="number"
            placeholder="Min Year"
            value={minYear || ''}
            onChange={(e) => setMinYear(e.target.value ? parseInt(e.target.value) : undefined)}
            className="p-2 border border-[#54F4D0] bg-[#00003C] text-white rounded-full w-full focus:outline-none focus:ring-0"
          />
          <input
            type="number"
            placeholder="Max Year"
            value={maxYear || ''}
            onChange={(e) => setMaxYear(e.target.value ? parseInt(e.target.value) : undefined)}
            className="p-2 border border-[#54F4D0] bg-[#00003C] text-white rounded-full w-full focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Genres Filter on the Right */}
      <div className="flex flex-col items-start lg:items-end w-full lg:w-1/4">
        <div className="font-semibold text-lg text-white mb-2">Genres</div>
        <div className="grid grid-cols-2 gap-2 w-full">
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                const newGenres = genres.includes(genre)
                  ? genres.filter(g => g !== genre)
                  : [...genres, genre];
                setGenres(newGenres);
              }}
              className={`p-2 border border-[#54F4D0] ${genres.includes(genre) ? 'bg-[#54F4D0] text-[#00003C]' : 'bg-[#00003C] text-white'} rounded-full w-full focus:outline-none focus:ring-0`}
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
