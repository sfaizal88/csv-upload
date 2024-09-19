/**
*
* Pagination component
* @author - Faizal
* @date   - 19th September 2024
*
***/
// REACT IMPORT
import React from 'react';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS TYPE
type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ 
    totalPages, 
    currentPage, 
    onPageChange 
}: PaginationProps) => {
    // IF TOTAL PAGE IS 1 THEN NO NEED OF PAGINATION
    if (totalPages <= 1) return null;

    const maxPageNumbersToShow = 10;
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    const handlePrevClick = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
    return (
        <div className="pagination-container">
            {/* First Page Button */}
            <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="primary-btn"
            >
            First
            </button>
            <button onClick={handlePrevClick} disabled={currentPage === 1}  className='primary-btn'>
            Prev
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index;
            return (
                <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={pageNumber === currentPage ? 'active-pagination' : 'inactive-pagination'}
                >
                {pageNumber}
                </button>
                );
            })}
            <button onClick={handleNextClick} disabled={currentPage === totalPages} className='primary-btn'>
            Next
            </button>
            <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="last-page primary-btn"
            >
            Last
            </button>
        </div>
    );
};

export default Pagination;
