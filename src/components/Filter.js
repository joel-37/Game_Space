import React, { useCallback } from 'react';
import '../style/Filter.css'; // Importing CSS styles

const Filter = ({
  genres, 
  tempGenre, 
  setTempGenre, 
  developers, 
  tempDeveloper, 
  setTempDeveloper, 
  publishers, 
  tempPublisher, 
  setTempPublisher, 
  tempRatingRange, 
  setTempRatingRange, 
  onApplyFilters 
}) => {

  // Memoizing the filter apply function
  const handleApplyFilters = useCallback(() => {
    onApplyFilters();
  }, [onApplyFilters]);

  return (
    <div className="filter-container">
      <h2 className="filter-title">Filters</h2>

      {/* Genre Filter */}
      <div className="filter-group">
        <h3>Genre</h3>
        <select 
          id="genre-select"
          value={tempGenre} 
          onChange={(e) => setTempGenre(e.target.value)} 
          aria-label="Select Genre"
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      {/* Rating Range Filter */}
      <div className="filter-group">
        <h3>Rating Range</h3>
        <div className="rating-range">
          <input
            type="number"
            id="min-rating"
            placeholder="Min Rating"
            value={tempRatingRange.min}
            onChange={(e) => setTempRatingRange({ ...tempRatingRange, min: e.target.value })}
            className="filter-rating-input"
            aria-label="Minimum Rating"
            min="0" // Optional: Set a minimum rating range of 0
          />
          <input
            type="number"
            id="max-rating"
            placeholder="Max Rating"
            value={tempRatingRange.max}
            onChange={(e) => setTempRatingRange({ ...tempRatingRange, max: e.target.value })}
            className="filter-rating-input"
            aria-label="Maximum Rating"
            max="10" // Optional: Set a maximum rating range of 10
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="filter-buttons">
        <button className="btn-apply" onClick={handleApplyFilters}>Apply Filters</button>
      </div>
    </div>
  );
};

export default Filter;
