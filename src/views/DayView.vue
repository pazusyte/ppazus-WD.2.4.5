<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <section class="date-picker">
          <h2>Expenses for:</h2>
          <DatePicker :selectedDate="selectedDate" />
        </section>
      </div>
      <div class="col-md-8">
        <section class="expense-summary">
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
  display: flex; /* Add flexbox */
  flex-direction: column; /* Arrange items vertically */
  align-items: flex-start; /* Align items to start of container */
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
