<template>
  <div>
    <h2>Expenses</h2>
    <div class="row">
      <input v-model="newExpenseName" placeholder="Expense Name" class="expense-input" />
      <input v-model="newExpenseAmount" placeholder="Expense Amount" class="expense-input" />
      <span>€</span>
      <select v-model="selectedExpenseType" class="expense-dropdown">
        <option value="" disabled selected>Expense Type</option>
        <option value="essential">Essential</option>
        <option value="non-essential">Non-Essential</option>
      </select>
      <select v-model="selectedExpenseCategory" class="expense-dropdown">
        <option value="" disabled selected>Expense Category</option>
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
      <p v-if="error" class="errorMessage">{{ error }}</p>
    </div>
    <ul>
      <li v-for="(expense, index) in filteredExpenses" :key="index" class="expense-item">
        <span class="expense-name">{{ expense.name }}</span>
        <span class="expense-amount">{{ expense.amount }}</span>
        <span class="expense-type">€{{ expense.expenseType }}</span>
        <span class="expense-category">{{ expense.expenseCategory }}</span>
        <button @click="editExpense(store, index)" class="small-expense-button" id="edit">
          Edit
        </button>
        <button @click="confirmDelete(index)" class="small-expense-button" id="delete">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { generateExpense } from './expenses/Expense'
import useExpensesStore from '@/store'

const store = useExpensesStore()
const route = useRoute()
const newExpenseName = ref('')
const newExpenseAmount = ref(0)

const selectedDate = computed(() => {
  const date = Array.isArray(route.params.date) ? route.params.date.join(',') : route.params.date
  return date || new Date().toISOString().slice(0, 10)
})

let selectedExpenseType = ''
let selectedExpenseCategory = ''
let error = ref('')

function addNewExpense() {
  if (newExpenseName.value.trim() !== '' && newExpenseAmount.value !== 0) {
    const newExpense = generateExpense(
      newExpenseName.value,
      newExpenseAmount.value,
      selectedDate.value,
      selectedExpenseType,
      selectedExpenseCategory
    )
    store.addExpense(newExpense)
    newExpenseName.value = ''
    newExpenseAmount.value = 0
    error.value = ''
  } else {
    error.value = 'Please enter both the expense name and amount'
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

function confirmDelete(index: number) {
  const isConfirmed = confirm('Do you really want to delete this expense?')
  if (isConfirmed) {
    store.deleteExpense(index)
  }
}
</script>

<style scoped>
.expense-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  height: 1rem;
  flex-grow: 1;
}

.expense-dropdown {
  margin-left: 0.5rem;
}

.expense-button {
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  background-color: #336a80;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 2rem;
  margin-left: 0.5rem;
}

.expense-button:hover {
  background-color: #77c4e6;
}

.errorMessage {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.expense-item {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.2rem;
}

ul {
  padding: 0;
  margin: 0;
}

.expense-checkbox {
  margin-right: 0.2rem;
}

.small-expense-button {
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 1rem;
  margin-right: 0.2rem;
  margin-left: 0.2rem;
  font-size: 0.5rem;
  background-color: #234b5a;
}

.small-expense-button:hover {
  background-color: #77c4e6;
}
</style>
