<template>
  <h2>Pick a Date to Log Your Expenses:</h2>
  <main>
    <DatePicker :selectedDate="selectedDate" />
  </main>
</template>

<script setup lang="ts">
import DatePicker from '../components/DatePicker.vue';
import { ref } from 'vue';

const selectedDate = ref(new Date().toISOString().slice(0, 10));
</script>
