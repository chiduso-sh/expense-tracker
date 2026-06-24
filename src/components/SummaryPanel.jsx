import { totalsByCategory, totalAmount } from '../utils/calculations.js'
import { formatCurrency } from '../utils/format.js'
import { CATEGORIES } from '../utils/constants.js'

// A plain numbers-only breakdown of spending per category, plus a grand
// total. Always reflects ALL expenses (not the filtered view) so it reads
// as an overall summary.
export default function SummaryPanel({ expenses }) {
  const byCategory = totalsByCategory(expenses)
  const grandTotal = totalAmount(expenses)

  return (
    <div className="card summary">
      <h2 className="summary__title">Summary</h2>
      <ul className="summary__list">
        {CATEGORIES.map((category) => (
          <li key={category} className="summary__row">
            <span>{category}</span>
            <span>{formatCurrency(byCategory[category])}</span>
          </li>
        ))}
      </ul>
      <div className="summary__total">
        <span>Total</span>
        <strong>{formatCurrency(grandTotal)}</strong>
      </div>
    </div>
  )
}
