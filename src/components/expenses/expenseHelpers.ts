export function isValidExpenseAmount(amount: number): boolean {
  return amount !== 0 && !/\.\d{3,}/.test(amount.toString())
}
