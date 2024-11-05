import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalMovies: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalMovies,
  onPageChange,
}) => {
  const moviesPerPage = 20;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  return (
    <div className="pagination flex flex-col items-center mt-4 p-6">
      <div className="relative inline-flex space-x-1">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-6 py-2 rounded-l-full border border-[#1DD2AF] bg-[#1DD2AF] text-[#00003C] ${
            currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-[#00003C] hover:text-white'
          } transition-all duration-300 ease-in-out`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage * moviesPerPage >= totalMovies}
          className={`px-6 py-2 rounded-r-full border border-[#1DD2AF] bg-[#1DD2AF] text-[#00003C] ${
            currentPage * moviesPerPage >= totalMovies ? 'cursor-not-allowed' : 'hover:bg-[#00003C] hover:text-white'
          } transition-all duration-300 ease-in-out`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
