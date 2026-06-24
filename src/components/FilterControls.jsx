import { CATEGORIES } from '../utils/constants.js'

// Controls for narrowing the visible list. "All" / "" mean no filter.
// State lives in the parent; this component just reports changes upward.
export default function FilterControls({
  categoryFilter,
  onCategoryChange,
  monthFilter,
  onMonthChange,
}) {
  return (
    <div className="card filters">
      <div className="field">
        <label htmlFor="filter-category">Category</label>
        <select
          id="filter-category"
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="filter-month">Month</label>
        {/* A month input yields "2026-06"; we match it against date prefixes. */}
        <input
          id="filter-month"
          type="month"
          value={monthFilter}
          onChange={(e) => onMonthChange(e.target.value)}
        />
      </div>

      {(categoryFilter !== 'All' || monthFilter !== '') && (
        <button
          type="button"
          className="btn filters__clear"
          onClick={() => {
            onCategoryChange('All')
            onMonthChange('')
          }}
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
