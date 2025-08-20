// Filters.js
import "../../styles/components/Filters.css";
export default function Filters({
  activeFilter,
  setActiveFilter,
  adventureTypes
}) {
  return (
    <div className="filters mb-8">
      {/* Type Filters */}
      <h3 className="filters-title text-lg font-semibold mb-4">Filter by Activity Type</h3>
      <div className="filters-btn-group flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveFilter("All")}
          className={`filters-btn px-4 py-2 rounded-full text-sm font-medium ${activeFilter === "All" ? 'filters-btn-active bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
        >
          All
        </button>
        {adventureTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`filters-btn px-4 py-2 rounded-full text-sm font-medium ${activeFilter === type ? 'filters-btn-active bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}