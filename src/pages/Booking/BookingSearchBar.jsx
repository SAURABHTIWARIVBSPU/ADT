import { useFilter } from '../../context/FilterContext'; // ✅ Fixed path
import "../../styles/components/BookingSearchBar.css";
import { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';

export default function BookingSearchBar() {
  const { setActiveFilter } = useFilter();
  const [location, setLocation] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: 'selection' }
  ]);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setShowDatePicker(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setShowDatePicker(false);
    }
  };

  const handleSearch = () => {
    setActiveFilter({
      location,
      dateRange: dateRange[0],
    });
  };

  return (
    <div className="booking-search-bar">
      <input
        type="text"
        placeholder="Search adventure location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={() => setShowDatePicker(!showDatePicker)}>Pick Date</button>
      {showDatePicker && (
        <div ref={refOne}>
          <DateRange
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          />
        </div>
      )}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
