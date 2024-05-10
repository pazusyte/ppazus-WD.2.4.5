import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.getByRole('button', { name: 'Today' }).click()
})

const EXPENSE_NAME = ['bread', 'rent']

test.describe('New Expense', () => {
  test('should allow me to add expense items', async ({ page }) => {
    const newExpenseName = page.getByPlaceholder('Enter Expense Name')
    const newExpenseAmount = page.getByPlaceholder('Enter Expense Amount')

    await newExpenseName.click()
    await newExpenseName.fill(EXPENSE_NAME[0])

    await newExpenseAmount.click()
    await newExpenseAmount.fill('3')

    await page.locator('#expenseType').selectOption('essential')
    await page.locator('#expenseCategory').selectOption('groceries')
    await page.getByRole('button', { name: 'Add' }).click()

    await expect(page.getByRole('cell', { name: 'bread' })).toHaveText([EXPENSE_NAME[0]])
    await expect(page.getByRole('cell', { name: '€' })).toHaveText('€3')

    await newExpenseName.click()
    await newExpenseName.fill(EXPENSE_NAME[1])

    await newExpenseAmount.click()
    await newExpenseAmount.fill('400')

    await page.locator('#expenseType').selectOption('essential')
    await page.locator('#expenseCategory').selectOption('rent-utilities')
    await page.getByRole('button', { name: 'Add' }).click()

    await expect(page.getByRole('cell', { name: 'rent', exact: true })).toHaveText([
      EXPENSE_NAME[1]
    ])
    await expect(page.getByRole('cell', { name: '€400' })).toHaveText('€400')
  })
})
