<template>
  <header>
    <h1>
      <router-link :to="{ name: 'HomeView' }" class="link" id="tracker"
        >Expense Tracker</router-link
      >
      <router-link :to="{ name: 'SummaryView' }" class="link" id="summary"
        >Expense Summary</router-link
      >
    </h1>
  </header>
  <div id="app">
    <router-view />
  </div>
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
