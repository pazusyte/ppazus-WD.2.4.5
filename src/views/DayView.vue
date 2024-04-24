<template>
  <main class="container">
    <div class="datepicker-container">
      <h1>Expenses for:</h1>
      <DatePicker v-model="selectedDate" />
    </div>
    <div class="expenses-container">
      <ExpenseList :header="'Day Expenses'" :expenses="expenses" />
    </div>
  </main>
</template>

<script setup lang="ts">
import DatePicker from '../components/DatePicker.vue';
import ExpenseList from '../components/ExpenseList.vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useExpensesStore from '@/store';

const route = useRoute();

const { expenses } = useExpensesStore();

let selectedDate = route.params.date || new Date().toISOString().slice(0, 10);

watch(
  () => route.params.date,
  (newValue) => {
    selectedDate = newValue || new Date().toISOString().slice(0, 10);
  }
);
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align items at the top of the container */
  max-width: 1280px;
  padding: 2rem;
  font-weight: normal;
}

.datepicker-container {
  flex: 1; /* Take up remaining space */
  margin-right: 1rem; /* Add some space between the two containers */
}

.expenses-container {
  flex: 1; /* Take up remaining space */
}

/* Adjustments to existing styles */
#navigation {
  font-weight: bold;
  color: #77c4e6;
}
</style>
