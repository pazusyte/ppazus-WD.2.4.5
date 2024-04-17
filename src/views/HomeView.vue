<template>
  <main>
    <DatePicker :selectedDate="selectedDate" />
    <ExpenseList :header="'Home Expenses'" :expenses="expenses" />
  </main>
</template>

<script setup>
import DatePicker from '../components/DatePicker.vue';
import { ref } from 'vue';

const selectedDate = ref(new Date().toISOString().slice(0, 10));
</script>
