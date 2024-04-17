<template>
  <h1>Expense Tracker</h1>
  <div id="app">
    <router-view />
  </div>
  <nav id="navigation">
    <RouterLink :to="{ name: 'HomeView' }">Home</RouterLink>
  </nav>
</template>

<script setup>
import { onMounted, watch, onBeforeMount } from 'vue';
import useExpensesStore from '@/store';

const store = useExpensesStore();

watch(
  () => store.expenses,
  newExpenses => {
    localStorage?.setItem('expenses', JSON.stringify(newExpenses));
  },
  { deep: true }
);

onBeforeMount(() => {
  const storedExpenses = localStorage?.getItem('expenses');
  if (storedExpenses) {
    store.expenses = JSON.parse(storedExpenses);
  }
});

onMounted(() => {
  if (!store.expenses.length) {
    store.addExpense({ name: 'Example Expense', done: false, stopped: false });
  }
});
</script>
