<template>
  <header>
    <RouterLink :to="{ name: 'HomeView' }">
      <h1>Expense Tracker</h1>
    </RouterLink>
  </header>
  <div id="app">
    <router-view />
  </div>
  <RouterLink :to="{ name: 'SummaryView' }">
    <h1>Expense Summary</h1>
  </RouterLink>
</template>

<script setup lang="ts">
import { onMounted, watch, onBeforeMount } from 'vue'
import useExpensesStore from '@/store'

const store = useExpensesStore()

watch(
  () => store.expenses,
  (newExpenses) => {
    localStorage?.setItem('expenses', JSON.stringify(newExpenses))
  },
  { deep: true }
)

onBeforeMount(() => {
  const storedExpenses = localStorage?.getItem('expenses')
  if (storedExpenses) {
    store.expenses = JSON.parse(storedExpenses)
  }
})

onMounted(() => {
  if (!store.expenses.length) {
    console.log('No expenses logged for this day.')
  }
})
</script>
