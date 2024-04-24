import { defineStore } from 'pinia'
import type { Expense } from '@/components/expenses/Expense.ts'

export type ExpensesState = {
  expenses: Expense[]
}

const store = defineStore('expenses', {
  state: (): ExpensesState => ({
    expenses: []
  }),
  actions: {
    addExpense(this: ExpensesState, expense: Expense): void {
      this.expenses.push(expense)
    },
    editExpense(this: ExpensesState, index: number, newName: string): void {
      this.expenses[index].name = newName
    },
    deleteExpense(this: ExpensesState, index: number): void {
      this.expenses.splice(index, 1)
    }
  }
})

export default store
