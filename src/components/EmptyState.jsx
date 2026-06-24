// Shown when there are no expenses at all, or when none match the active
// filters. The message adapts to which situation we're in.
export default function EmptyState({ isFiltered }) {
  return (
    <div className="empty">
      {isFiltered ? (
        <p>No expenses match the current filters.</p>
      ) : (
        <p>No expenses yet. Add your first one using the form.</p>
      )}
    </div>
  )
}
