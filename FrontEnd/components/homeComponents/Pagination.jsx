"use client";

function Pagination({ currentPage, numberOfPages, onPageChange }) {
  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination-arrow"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {Array.from({ length: numberOfPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            type="button"
            className={`pagination-page ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        className="pagination-arrow"
        aria-label="Next page"
        disabled={currentPage === numberOfPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </nav>
  );
}

export default Pagination;
