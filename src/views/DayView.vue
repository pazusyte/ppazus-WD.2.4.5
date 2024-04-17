<template>
  <main>
    <h1>Expenses for:</h1>
    <DatePicker v-model="selectedDate" />
    <ExpenseList :header="'Day Expenses'" :expenses="expenses" />
  </main>
</template>

<script setup>
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
  newValue => {
    selectedDate = newValue || new Date().toISOString().slice(0, 10);
  }
);
</script>

<style scoped>
#navigation {
  font-weight: bold;
  color: #77c4e6;
}
</style>
