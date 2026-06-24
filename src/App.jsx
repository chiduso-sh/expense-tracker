import { useEffect, useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import FilterControls from './components/FilterControls.jsx'
import SummaryPanel from './components/SummaryPanel.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import { loadExpenses, saveExpenses } from './utils/storage.js'
import { totalAmount } from './utils/calculations.js'
import { formatCurrency } from './utils/format.js'
import './App.css'

export default function App() {
  // --- Shared state, lifted up to the parent and passed down via props ---

  // The full list of expenses. Initialised once from localStorage.
  const [expenses, setExpenses] = useState(() => loadExpenses())

  // The id of the expense currently being edited, or null when adding.
  const [editingId, setEditingId] = useState(null)

  // Active filters: category ("All" = no filter) and a month ("" = all months).
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [monthFilter, setMonthFilter] = useState('')

  // --- Persistence ---
  // Whenever the expenses array changes, sync it to localStorage in one place.
  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  // --- CRUD operations ---

  // ADD: build a new expense and prepend it with the spread operator,
  // so the newest item appears at the top of the list.
  function addExpense(data) {
    const newExpense = { id: crypto.randomUUID(), ...data }
    setExpenses((prev) => [newExpense, ...prev])
  }

  // UPDATE: map over the list, replacing only the item whose id matches.
  // Every other item is returned unchanged.
  function updateExpense(id, data) {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...data } : expense,
      ),
    )
    setEditingId(null)
  }

  // DELETE: filter the list down to the items whose id does NOT match.
  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
    // If we were editing the item we just deleted, leave edit mode.
    if (editingId === id) setEditingId(null)
  }

  // The expense object currently being edited (or null), derived from state.
  const editingExpense = expenses.find((e) => e.id === editingId) || null

  // The form calls this on submit; we route to add or update based on mode.
  function handleSubmit(data) {
    if (editingId) {
      updateExpense(editingId, data)
    } else {
      addExpense(data)
    }
  }

  // --- Filtering ---
  // Apply both filters together. useMemo avoids recomputing on every render
  // unless the inputs actually change.
  const visibleExpenses = useMemo(() => {
    return expenses
      .filter((e) => categoryFilter === 'All' || e.category === categoryFilter)
      .filter((e) => monthFilter === '' || e.date.startsWith(monthFilter))
      .sort((a, b) => b.date.localeCompare(a.date)) // newest date first
  }, [expenses, categoryFilter, monthFilter])

  // Running total of whatever is currently visible.
  const visibleTotal = totalAmount(visibleExpenses)

  return (
    <div className="app">
      <header className="app__header">
        <h1>Expense Tracker</h1>
        <p className="app__subtitle">
          {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'} tracked
        </p>
      </header>

      <main className="app__layout">
        <section className="app__sidebar">
          <ExpenseForm
            onSubmit={handleSubmit}
            editingExpense={editingExpense}
            onCancelEdit={() => setEditingId(null)}
          />
          <SummaryPanel expenses={expenses} />
        </section>

        <section className="app__content">
          <FilterControls
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            monthFilter={monthFilter}
            onMonthChange={setMonthFilter}
          />

          <div className="total-bar">
            <span>Total ({visibleExpenses.length} shown)</span>
            <strong>{formatCurrency(visibleTotal)}</strong>
          </div>

          <ExpenseList
            expenses={visibleExpenses}
            editingId={editingId}
            onEdit={setEditingId}
            onDelete={deleteExpense}
            isFiltered={categoryFilter !== 'All' || monthFilter !== ''}
          />
        </section>
      </main>
    </div>
  )
}
