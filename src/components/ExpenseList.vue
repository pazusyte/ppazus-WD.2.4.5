<template>
  <div>
    <div class="col-md-12">
      <input
        v-model="newExpenseName"
        id="expenseName"
        placeholder="Enter Expense Name"
        class="expense-input"
      />
      <input
        v-model="newExpenseAmount"
        id="expenseAmount"
        placeholder="Enter Expense Amount"
        class="expense-input"
        type="number"
      />
      <select v-model="selectedExpenseType" id="expenseType" class="expense-dropdown">
        <option value="" disabled selected>Select Type</option>
        <option value="essential">Essential</option>
        <option value="non-essential">Non-Essential</option>
      </select>
      <select v-model="selectedExpenseCategory" id="expenseCategory" class="expense-dropdown">
        <option value="" disabled selected>Select Category</option>
        <option value="groceries">Groceries</option>
        <option value="rent-utilities">Rent/Utilities</option>
        <option value="taxes">Taxes</option>
        <option value="going-out">Going-Out</option>
        <option value="shopping">Shopping</option>
        <option value="home">Home</option>
        <option value="health-beauty">Health/Beauty</option>
        <option value="transport">Transport</option>
        <option value="misc">Miscellaneous</option>
      </select>
      <button @click="addNewExpense" class="expense-button">Add</button>
      <p v-if="error" class="errorMessage" role="alert">{{ error }}</p>
    </div>
    <table class="expense-details" role="table" aria-label="Expense Details">
      <tr>
        <th>Name</th>
        <th>Amount</th>
        <th>Type</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
      <tr v-for="(expense, index) in filteredExpenses" :key="index" role="row">
        <td role="cell">{{ expense.name }}</td>
        <td role="cell">€{{ expense.amount }}</td>
        <td role="cell">{{ expense.expenseType }}</td>
        <td role="cell">{{ expense.expenseCategory }}</td>
        <td>
          <button @click="editExpense(store, index)" class="small-expense-button" id="edit">
            Edit
          </button>
          <button @click="confirmDelete(expense)" class="small-expense-button" id="delete">
            Delete
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import '@/components/expenses/expenseList.css'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { generateExpense } from './expenses/Expense'
import { isValidExpenseAmount } from './expenses/expenseHelpers'
import type { Expense } from './expenses/Expense'
import useExpensesStore from '@/store'

const store = useExpensesStore()
const route = useRoute()
const newExpenseName = ref('')
const newExpenseAmount = ref<number | null>(null)

const selectedDate = computed(() => {
  const date = Array.isArray(route.params.date) ? route.params.date.join(',') : route.params.date
  return date || new Date().toISOString().slice(0, 10)
})

let selectedExpenseType = ''
let selectedExpenseCategory = ''
let error = ref('')

function addNewExpense() {
  const amount: number | null = newExpenseAmount.value !== null ? newExpenseAmount.value : null

  if (
    newExpenseName.value.trim() !== '' &&
    selectedExpenseType !== '' &&
    selectedExpenseCategory !== '' &&
    amount !== null &&
    !isNaN(amount) &&
    isValidExpenseAmount(amount)
  ) {
    const newExpense = generateExpense(
      newExpenseName.value,
      amount,
      selectedDate.value,
      selectedExpenseType,
      selectedExpenseCategory
    )
    store.addExpense(newExpense)
    newExpenseName.value = ''
    newExpenseAmount.value = null
    selectedExpenseType = ''
    selectedExpenseCategory = ''
    error.value = ''
  } else {
    error.value = 'Please enter a valid expense name, type, and category, and amount'
  }
}

const expenses = computed(() => {
  const allExpenses = store.expenses
  return allExpenses
})

const filteredExpenses = computed(() => {
  return expenses.value.filter((expense) => expense.date === selectedDate.value)
})

function editExpense(store: any, index: number) {
  const newName = prompt('Edit the expense name:')
  if (newName !== null && newName.trim() !== '') {
    store.editExpense(index, newName)
  }
}

function confirmDelete(expense: Expense): void {
  const isConfirmed = confirm('Do you really want to delete this expense?')
  if (isConfirmed) {
    const index = store.expenses.indexOf(expense)
    if (index !== -1) {
      store.deleteExpense(index)
    }
  }
}
</script>
