import { test, expect } from 'vitest'
import {
  getExpensesFromLocalStorage,
  filterExpensesByDate
} from '@/components/expenses/expenseCalculations'

let expenses: any[] = []

expenses = [
  { date: '2024-05-10', amount: 50, expenseType: 'food', expenseCategory: 'groceries' },
  { date: '2024-05-11', amount: 100, expenseType: 'clothing', expenseCategory: 'shopping' },
  { date: '2024-04-20', amount: 30, expenseType: 'transportation', expenseCategory: 'transport' }
]

test('getExpensesFromLocalStorage returns empty array if no expenses stored', () => {
  localStorage.removeItem('expenses')
  expect(getExpensesFromLocalStorage()).toEqual([])
})

test('getExpensesFromLocalStorage returns parsed expenses from localStorage', () => {
  localStorage.setItem('expenses', JSON.stringify(expenses))
  expect(getExpensesFromLocalStorage()).toEqual(expenses)
})

test('filterExpensesByDate filters expenses by target date', () => {
  const targetDate = new Date('2024-05-10')
  const expectedFilteredExpenses = [expenses[0]]
  expect(filterExpensesByDate(expenses, targetDate)).toEqual(expectedFilteredExpenses)
})
