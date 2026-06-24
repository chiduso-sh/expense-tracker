# Expense Tracker

A small, dependency-light expense tracker built with React + Vite and plain CSS.
Data is stored in the browser's `localStorage`, so there is no backend.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Features

- Add, edit, and delete expenses (delete asks for a quick confirm)
- Filter by category and/or by month, combined
- Live running total of the currently visible expenses
- Per-category summary breakdown
- Data persists across refreshes via `localStorage`
- Clear empty states for "no expenses" and "no matches"

## Where the core logic lives

| Concern | File |
| --- | --- |
| Shared state + CRUD (add/edit/delete) | [`src/App.jsx`](src/App.jsx) |
| Total + per-category calculations (`reduce`) | [`src/utils/calculations.js`](src/utils/calculations.js) |
| localStorage read/write (single place) | [`src/utils/storage.js`](src/utils/storage.js) |
| Currency/date formatting | [`src/utils/format.js`](src/utils/format.js) |
| Categories + currency symbol | [`src/utils/constants.js`](src/utils/constants.js) |

### Components

- `ExpenseForm` — add/edit form with inline validation
- `ExpenseList` / `ExpenseItem` — the list and each row
- `FilterControls` — category + month filters
- `SummaryPanel` — per-category totals
- `EmptyState` — the empty/no-match message

## How it fits together

All shared state (the `expenses` array, the active filters, and the id of the
item being edited) lives in `App.jsx` and flows down to components via props.

- **Add** creates a new object with `crypto.randomUUID()` and prepends it with
  the spread operator: `[newExpense, ...prev]`.
- **Edit** uses `map` to replace only the item whose `id` matches, leaving the
  rest untouched.
- **Delete** uses `filter` to keep every item whose `id` does *not* match.
- **Totals** use `reduce` — one pass to sum all amounts, another to build the
  `{ category: total }` breakdown.
- **Persistence** is a single `useEffect` in `App.jsx` that writes to
  `localStorage` whenever the `expenses` array changes; it's read back once on
  startup.

## Data model

```js
{
  id: string,         // crypto.randomUUID()
  description: string,
  amount: number,     // positive
  category: 'Food' | 'Transport' | 'Housing' | 'Entertainment' | 'Health' | 'Other',
  date: string,       // ISO, e.g. "2026-06-24"
}
```
