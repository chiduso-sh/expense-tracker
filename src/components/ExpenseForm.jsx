import { useEffect, useState } from 'react'
import { CATEGORIES } from '../utils/constants.js'
import { todayISO } from '../utils/format.js'

// A blank form, used when adding a new expense.
const EMPTY_FORM = {
  description: '',
  amount: '',
  category: 'Food',
  date: todayISO(),
}

export default function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const isEditing = Boolean(editingExpense)

  // When the parent selects an item to edit, populate the form with its
  // values. When editing is cancelled/finished, reset back to blank.
  useEffect(() => {
    if (editingExpense) {
      setForm({
        description: editingExpense.description,
        amount: String(editingExpense.amount),
        category: editingExpense.category,
        date: editingExpense.date,
      })
      setErrors({})
    } else {
      setForm(EMPTY_FORM)
      setErrors({})
    }
  }, [editingExpense])

  // Update a single field by name as the user types.
  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Validate inputs and return an errors object (empty = valid).
  function validate() {
    const next = {}
    if (!form.description.trim()) {
      next.description = 'Description is required.'
    }
    const amount = Number(form.amount)
    if (form.amount === '' || Number.isNaN(amount)) {
      next.amount = 'Amount must be a number.'
    } else if (amount <= 0) {
      next.amount = 'Amount must be greater than zero.'
    }
    if (!form.date) {
      next.date = 'Date is required.'
    }
    return next
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    // Hand clean, typed data up to the parent. The parent decides whether
    // this becomes an add or an update.
    onSubmit({
      description: form.description.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    })

    if (!isEditing) setForm(EMPTY_FORM) // clear after adding
  }

  return (
    <form className={`card form ${isEditing ? 'form--editing' : ''}`} onSubmit={handleSubmit}>
      <h2 className="form__title">{isEditing ? 'Edit expense' : 'Add expense'}</h2>

      <div className="field">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="e.g. Lunch"
        />
        {errors.description && <span className="field__error">{errors.description}</span>}
      </div>

      <div className="field">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
        />
        {errors.amount && <span className="field__error">{errors.amount}</span>}
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="date">Date</label>
        <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
        {errors.date && <span className="field__error">{errors.date}</span>}
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Update' : 'Add'}
        </button>
        {isEditing && (
          <button type="button" className="btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
