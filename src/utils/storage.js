// All localStorage access lives here, so the rest of the app never touches
// the browser API directly. If we ever swap to a real backend, only this
// file changes.

const STORAGE_KEY = 'expense-tracker.expenses'

// A few sample expenses so a brand-new user sees a populated UI.
// Used only when localStorage is empty.
const SAMPLE_EXPENSES = [
  { id: 's1', description: 'Groceries', amount: 54.2, category: 'Food', date: '2026-06-22' },
  { id: 's2', description: 'Bus pass', amount: 30, category: 'Transport', date: '2026-06-20' },
  { id: 's3', description: 'Rent', amount: 1200, category: 'Housing', date: '2026-06-01' },
  { id: 's4', description: 'Movie night', amount: 18.5, category: 'Entertainment', date: '2026-06-18' },
]

// Read the saved expenses. Returns the sample data on first run, and falls
// back to an empty list if the stored JSON is missing or corrupt.
export function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return SAMPLE_EXPENSES
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Write the full expenses array back to localStorage. Called whenever the
// list changes so data survives a page refresh.
export function saveExpenses(expenses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  } catch {
    // Ignore write errors (e.g. storage full or disabled).
  }
}
