import React, { useState } from "react";

const TableWithPagination = ({ data, columns, defaultPageSize = 20 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Hisob-kitoblar
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      {/* Jadval */}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th key={col} className="px-4 py-2 border border-gray-200 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={`${index}-${col}`}
                  className="px-4 py-2 border border-gray-200"
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>

        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>

        {/* Page Size Selector */}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1); // Reset page to 1
          }}
          className="ml-4 px-2 py-1 border border-gray-300 rounded"
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableWithPagination;
