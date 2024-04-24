export const generateExpense = (
  name: string,
  amount: number,
  date: string,
  expenseType: string,
  expenseCategory: string,
  id?: string
): Expense => {
  return {
    id: id || generateId(),
    name: name || '',
    amount: amount || 0,
    date: date || '',
    expenseType: expenseType || '',
    expenseCategory: expenseCategory || ''
  }
}

export type Expense = {
  id: string
  name: string
  amount: number
  date: string
  expenseType: string
  expenseCategory: string
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}
