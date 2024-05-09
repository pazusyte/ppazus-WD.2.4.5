<template>
  <div class="container">
    <div class="row" id="row1">
      <div class="col-md-4">
        <h2>Monthly Expense Report For:</h2>
        <div class="dropdown">
          <label for="year">Select Year:</label>
          <select
            id="year"
            v-model="selectedYear"
            @change="updateExpenses"
            aria-label="Select Year"
          >
            <option disabled selected value="">Year</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
          <label for="month">Select Month:</label>
          <select
            id="month"
            v-model="selectedMonth"
            @change="updateExpenses"
            aria-label="Select Month"
          >
            <option disabled selected value="">Month</option>
            <option v-for="(month, index) in months" :key="index" :value="index + 1">
              {{ month }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-8">
        <section class="expense-summary">
          <h2>You've spent:</h2>
          <p>
            Total Expenses:
            <span role="text" aria-live="polite">{{
              monthlyExpenses.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })
            }}</span>
          </p>
          <h3>Type Expenses:</h3>
          <ul>
            <li v-for="(sum, type) in monthlyTypeExpenses" :key="type">
              {{ type }}:
              <span role="text">{{
                sum.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })
              }}</span>
            </li>
          </ul>
          <h3>Category Expenses:</h3>
          <ul>
            <li v-for="(sum, category) in monthlyCategoryExpenses" :key="category">
              {{ category }}:
              <span role="text">{{
                sum.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })
              }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { generateOptions } from '@/components/dates/dateHelpers'
import {
  calculateExpensesForMonth,
  calculateTypeSumForMonth,
  calculateCategorySumForMonth
} from '@/components/expenses/expenseCalculations'

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth()
const selectedYear = ref<number>(currentYear)
const selectedMonth = ref<number>(currentMonth)

const years = generateOptions(1900, 2100)
const months = generateOptions(1, 12)

const monthlyExpenses = ref<number>(0)
const monthlyTypeExpenses = ref<{ [key: string]: number }>({})
const monthlyCategoryExpenses = ref<{ [key: string]: number }>({})

function updateExpenses() {
  monthlyExpenses.value = calculateExpensesForMonth(selectedMonth.value, selectedYear.value)
  monthlyTypeExpenses.value = calculateTypeSumForMonth(selectedMonth.value, selectedYear.value)
  monthlyCategoryExpenses.value = calculateCategorySumForMonth(
    selectedMonth.value,
    selectedYear.value
  )
}

watch(selectedMonth, updateExpenses)
watch(selectedYear, updateExpenses)

updateExpenses()
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 10px;
}

.expense-summary {
  margin-left: 50px;
}

.dropdown select {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 3rem;
  width: 5rem;
  margin-right: 10px;
}

.col-md-1 .date-button {
  width: 3rem;
}

.date-button {
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  background-color: rgb(36, 92, 190);
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 3rem;
  width: 10rem;
}

.date-button:hover {
  background-color: #77c4e6;
}

.col-md-4 {
  padding: 20px;
  height: 50vh;
  background-color: white;
}

.col-md-8 {
  padding: 20px;
  height: 50vh;
  background-color: white;
}
</style>
