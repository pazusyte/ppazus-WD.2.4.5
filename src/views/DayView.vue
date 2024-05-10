<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <section class="date-picker" aria-labelledby="date-picker-heading">
          <h2 id="date-picker-heading">Select Date</h2>
          <DatePicker :selectedDate="selectedDate" aria-label="Select date" />
        </section>
      </div>
      <div class="col-md-12 col-lg-6">
        <section class="expense-summary" aria-labelledby="expense-summary-heading">
          <h2 id="expense-summary-heading">Day Expenses</h2>
          <ExpenseList :header="'Day Expenses'" :expenses="expenses" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DatePicker from '../components/DatePicker.vue'
import ExpenseList from '../components/ExpenseList.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import useExpensesStore from '@/store'

const route = useRoute()

const { expenses } = useExpensesStore()

let selectedDate = route.params.date || new Date().toISOString().slice(0, 10)

watch(
  () => route.params.date,
  (newValue) => {
    selectedDate = newValue || new Date().toISOString().slice(0, 10)
  }
)
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.date-picker {
  padding: 20px;
  background-color: white;
  height: 50vh;
  width: 80%;
}

.expense-summary {
  padding: 20px;
  background-color: white;
  height: 50vh;
  width: 120%;
  margin-left: -20%;
}

.container {
  margin: 0 auto;
  max-width: 100%;

  margin-right: 10px;
}

@media (max-width: 768px) {
  .date-picker,
  .expense-summary {
    width: 100%;
    margin-left: 0;
  }
}
</style>
