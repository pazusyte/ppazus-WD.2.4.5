<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <section class="date-picker">
          <h2>Pick a Date to Log Your Expenses:</h2>
          <DatePicker :selectedDate="selectedDate" />
        </section>
      </div>
      <div class="col-md-6">
        <section class="expense-summary">
          <h2>You've spent:</h2>
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
  padding: 30px;
  height: 100%;
  background-color: white;
}

.expense-summary {
  padding: 30px;
  height: 100%;
  background-color: white;
}
</style>
