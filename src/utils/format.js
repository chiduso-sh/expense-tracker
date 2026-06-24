import { CURRENCY } from './constants.js'

// Format a number as currency with two decimals, e.g. 1234.5 -> "$1,234.50".
// Intl.NumberFormat handles thousands separators and rounding for us.
export function formatCurrency(amount) {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0)

  return `${CURRENCY}${formatted}`
}

// Turn an ISO date string ("2026-06-24") into a friendlier label
// ("Jun 24, 2026") for display in the list.
export function formatDate(isoDate) {
  if (!isoDate) return ''
  // Append T00:00 so the date is parsed in local time, not UTC.
  const date = new Date(`${isoDate}T00:00`)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Today's date as an ISO string ("2026-06-24"), used as the form default.
export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}
