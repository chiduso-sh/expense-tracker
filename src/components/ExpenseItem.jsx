import { useState } from 'react'
import { formatCurrency, formatDate } from '../utils/format.js'

// A single row in the list. Clicking the row (or "Edit") loads it into the
// form; "Delete" asks for a quick confirm first.
export default function ExpenseItem({ expense, isEditing, onEdit, onDelete }) {
  // Tracks the brief "Delete? Confirm / Cancel" state for this row only.
  const [confirming, setConfirming] = useState(false)
  // Drives the fade-out animation before the item is actually removed.
  const [leaving, setLeaving] = useState(false)

  function handleDelete() {
    setLeaving(true)
    // Wait for the fade-out animation to finish before removing from state.
    setTimeout(() => onDelete(expense.id), 180)
  }

  return (
    <li
      className={`expense-item ${isEditing ? 'expense-item--editing' : ''} ${
        leaving ? 'expense-item--leaving' : ''
      }`}
    >
      <button
        type="button"
        className="expense-item__main"
        onClick={() => onEdit(expense.id)}
        title="Click to edit"
      >
        <span className="expense-item__desc">{expense.description}</span>
        <span className="expense-item__meta">
          <span className="badge">{expense.category}</span>
          <span className="expense-item__date">{formatDate(expense.date)}</span>
        </span>
      </button>

      <span className="expense-item__amount">{formatCurrency(expense.amount)}</span>

      <div className="expense-item__actions">
        {confirming ? (
          <>
            <button type="button" className="btn btn--danger" onClick={handleDelete}>
              Confirm
            </button>
            <button type="button" className="btn" onClick={() => setConfirming(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn" onClick={() => onEdit(expense.id)}>
              Edit
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => setConfirming(true)}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}
