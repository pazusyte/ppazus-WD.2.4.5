<template>
  <div class="date-picker">
    <div class="options">
      <div class="row">
        <button class="date-button" @click="goToSelected(-1)">&lt;</button>
        <div class="dropdown">
          <select id="year" v-model="selectedYear" @change="updateSelectedDate">
            <option disabled selected value="">Year</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <div class="dropdown">
          <select id="month" v-model="selectedMonth" @change="updateSelectedDate">
            <option disabled selected value="">Month</option>
            <option v-for="month in months" :key="month" :value="month">
              {{ month }}
            </option>
          </select>
        </div>
        <div class="dropdown">
          <select id="day" v-model="selectedDay" @change="updateSelectedDate">
            <option disabled selected value="">Day</option>
            <option v-for="day in daysInMonth" :key="day" :value="day">
              {{ day }}
            </option>
          </select>
        </div>
        <button class="date-button" @click="goToSelected(1)">&gt;</button>
      </div>
      <div class="row">
        <button class="date-button" @click="goToToday(-1)">Yesterday</button>
        <button class="date-button" @click="goToToday(0)">Today</button>
        <button class="date-button" @click="goToToday(1)">Tomorrow</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { generateOptions, padZero } from './dates/dateHelpers.js'

const router = useRouter()
const currentYear: number = new Date().getFullYear()
const selectedYear = ref<number>(currentYear)
const selectedMonth = ref<number | null>(null)
const selectedDay = ref<number | null>(null)

const years = generateOptions(1900, 2100)
const months = generateOptions(1, 12)
const daysInMonth = ref<number[]>([])

function updateSelectedDate(): void {
  if (selectedYear.value && selectedMonth.value && selectedDay.value) {
    const newDate = new Date(selectedYear.value, selectedMonth.value - 1, selectedDay.value)
    const formattedDate = `${newDate.getFullYear()}-${padZero(newDate.getMonth() + 1)}-${padZero(newDate.getDate())}`
    router.push(`/${formattedDate}`)
  }
}

function goToToday(offset: number): void {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + offset)
  goToDay(currentDate)
}

function goToSelected(offset: number): void {
  if (selectedYear.value && selectedMonth.value && selectedDay.value) {
    const selectedDate = new Date(selectedYear.value, selectedMonth.value - 1, selectedDay.value)
    selectedDate.setDate(selectedDate.getDate() + offset)
    goToDay(selectedDate)
  }
}

function goToDay(date: Date): void {
  selectedYear.value = date.getFullYear()
  selectedMonth.value = date.getMonth() + 1
  selectedDay.value = date.getDate()
  updateSelectedDate()
}

watch([selectedYear, selectedMonth], () => {
  const year = selectedYear.value
  const month = selectedMonth.value
  if (year !== null && month !== null) {
    const daysInSelectedMonth = new Date(year, month, 0).getDate()
    daysInMonth.value = generateOptions(1, daysInSelectedMonth)
  }
})

onMounted(() => {
  const { params } = router.currentRoute.value
  if (params.date) {
    const dateParam = params.date as string
    const [year, month, day] = dateParam.split('-').map(Number)
    selectedYear.value = year
    selectedMonth.value = month
    selectedDay.value = day
  } else {
    selectedMonth.value = null
    selectedDay.value = null
  }
})
</script>

<style scoped>
.date-picker {
  display: flex;
  flex-direction: column;
}

.options {
  display: flex;
  flex-direction: column;
}

.options .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.options .row > * {
  margin: 0 0.2rem;
}

.date-picker select {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  height: 2rem;
}

.date-button {
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  background-color: #336a80;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 2rem;
}

.date-button:hover {
  background-color: #77c4e6;
}
</style>
