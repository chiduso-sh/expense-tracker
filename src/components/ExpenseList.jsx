import ExpenseItem from './ExpenseItem.jsx'
import EmptyState from './EmptyState.jsx'

// Renders the visible expenses, or an empty state when there are none.
// Pure presentation: all data and callbacks come from the parent.
export default function ExpenseList({ expenses, editingId, onEdit, onDelete, isFiltered }) {
  if (expenses.length === 0) {
    return <EmptyState isFiltered={isFiltered} />
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          isEditing={expense.id === editingId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
