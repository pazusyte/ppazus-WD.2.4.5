import type { Expense } from './Expense'

export function getExpensesFromLocalStorage(): Expense[] {
  const storedExpenses = localStorage?.getItem('expenses')
  if (!storedExpenses) {
    return []
  }
  return JSON.parse(storedExpenses)
}

export function filterExpensesByDate(expenses: Expense[], targetDate: Date): Expense[] {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return (
      expenseDate.getDate() === targetDate.getDate() &&
      expenseDate.getMonth() === targetDate.getMonth() &&
      expenseDate.getFullYear() === targetDate.getFullYear()
    )
  })
}

export function calculateTypeSumForMonth(month: number, year: number): Record<string, number> {
  const expenses = getExpensesFromLocalStorage()
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year
  })

  const typeSum: Record<string, number> = {}

  expenses.forEach((expense) => {
    typeSum[expense.expenseType] = 0
  })

  filteredExpenses.forEach((expense) => {
    typeSum[expense.expenseType] += Number(expense.amount)
  })

  return typeSum
}

export function calculateCategorySumForMonth(month: number, year: number): Record<string, number> {
  const expenses = getExpensesFromLocalStorage()
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate.getMonth() + 1 === month && expenseDate.getFullYear() === year
  })

  const categorySum: Record<string, number> = {}

  expenses.forEach((expense) => {
    categorySum[expense.expenseCategory] = 0
  })

  filteredExpenses.forEach((expense) => {
    categorySum[expense.expenseCategory] += Number(expense.amount)
  })

  return categorySum
}

export function calculateTotalExpense(expenses: Expense[]): number {
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
