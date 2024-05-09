<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <section class="date-picker" aria-labelledby="date-picker-heading">
          <h2 id="date-picker-heading">Pick a Date to Log Your Expenses</h2>
          <DatePicker :selectedDate="selectedDate" aria-label="Select date to log expenses" />
        </section>
      </div>
      <div class="col-md-6">
        <section class="expense-summary" aria-labelledby="expense-summary-heading">
          <h2 id="expense-summary-heading">Expense Summary</h2>
          <p>
            Monthly Expenses:
            {{ monthlyExpenses.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }) }}
          </p>
          <p>
            Today's Expenses:
            {{ todayExpenses.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }) }}
          </p>
          <p>
            Yesterday's Expenses:
            {{ yesterdayExpenses.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }) }}
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DatePicker from '../components/DatePicker.vue'
import {
  calculateExpensesForMonth,
  calculateExpensesForToday,
  calculateExpensesForYesterday
} from '@/components/expenses/expenseCalculations'
import { ref } from 'vue'

const selectedDate = ref(new Date().toISOString().slice(0, 10))

const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()
const monthlyExpenses = calculateExpensesForMonth(currentMonth, currentYear)
const todayExpenses = calculateExpensesForToday()
const yesterdayExpenses = calculateExpensesForYesterday()
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.date-picker {
  padding: 20px;
  height: 30vh;
  background-color: white;
  width: 110%;
  margin-left: -10%;
}

.expense-summary {
  padding: 20px;
  height: 30vh;
  background-color: white;
  width: 110%;
}
</style>
