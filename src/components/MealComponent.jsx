import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MealComponent = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of meals per page

  useEffect(() => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
      .then((res) => setItems(res.data.meals || [])) // Ensure it's an array
      .catch((err) => {
        console.error('Error fetching meals:', err);
        setItems([]); // Fallback to empty array
      });
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get meals for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='container mx-auto p-4 w-[70rem]'>
      <h1 className='text-2xl font-bold text-center mb-6'>Seafood Meals</h1>

      {currentItems.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {currentItems.map(({ strMeal, strMealThumb, idMeal }) => (
              <article
                key={idMeal}
                className='bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105'
              >
                <img
                  src={strMealThumb}
                  alt={`Image of ${strMeal}`}
                  className='w-full h-48 object-cover'
                />
                <div className='p-4 text-center'>
                  <p className='text-lg font-semibold'>{strMeal}</p>
                  <p className='text-gray-500'>#{idMeal}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className='flex justify-center mt-6 space-x-4'>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Previous
            </button>
            <span className='text-lg font-medium'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className='text-center text-gray-500'>Loading meals...</p>
      )}
    </div>
  );
};

export default MealComponent;
