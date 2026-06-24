import { CATEGORIES } from './constants.js'

// Sum the amounts of a list of expenses.
// reduce walks the array, carrying a running `sum` and adding each amount.
export function totalAmount(expenses) {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}

// Build a per-category breakdown: { Food: 84.2, Transport: 30, ... }.
// We start (the second argument to reduce) from an object with every
// category set to 0, then add each expense's amount onto its category.
// Starting from all-zero keeps categories with no expenses visible as 0.
export function totalsByCategory(expenses) {
  const initial = CATEGORIES.reduce((acc, category) => {
    acc[category] = 0
    return acc
  }, {})

  return expenses.reduce((acc, expense) => {
    acc[expense.category] += expense.amount
    return acc
  }, initial)
}
