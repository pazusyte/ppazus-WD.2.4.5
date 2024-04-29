import type { Expense } from './Expense'

function getExpensesFromLocalStorage(): Expense[] {
  const storedExpenses = localStorage?.getItem('expenses')
  if (!storedExpenses) {
    return []
  }
  return JSON.parse(storedExpenses)
}

function filterExpensesByDate(expenses: Expense[], targetDate: Date): Expense[] {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return (
      expenseDate.getDate() === targetDate.getDate() &&
      expenseDate.getMonth() === targetDate.getMonth() &&
      expenseDate.getFullYear() === targetDate.getFullYear()
    )
  })
}

function calculateTotalExpense(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => {
    return total + Number(expense.amount)
  }, 0)
}

export function calculateExpensesForMonth(month: number, year: number): number {
  const expenses = getExpensesFromLocalStorage()
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate.getMonth() === month && expenseDate.getFullYear() === year
  })
  const totalExpense = calculateTotalExpense(filteredExpenses)
  return totalExpense
}

export function calculateExpensesForToday(): number {
  const today = new Date()
  const expenses = getExpensesFromLocalStorage()
  const filteredExpenses = filterExpensesByDate(expenses, today)
  const totalExpense = calculateTotalExpense(filteredExpenses)
  return totalExpense
}

export function calculateExpensesForYesterday(): number {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const expenses = getExpensesFromLocalStorage()
  const filteredExpenses = filterExpensesByDate(expenses, yesterday)
  const totalExpense = calculateTotalExpense(filteredExpenses)
  return totalExpense
}
