<template>
  <div class="container">
    <div class="row" id="row1">
      <div class="col-md-1">
        <button
          v-if="showButton"
          class="date-button"
          @click="goToSelected(-1)"
          aria-label="Previous month"
        >
          &lt;
        </button>
      </div>
      <div class="col-md-2 col-sm-3">
        <div class="dropdown">
          <label for="year">Year:</label>
          <select id="year" v-model="selectedYear" @change="updateSelectedDate" aria-live="polite">
            <option disabled selected value="">Year</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>
      <div class="col-md-2 col-sm-3">
        <div class="dropdown">
          <label for="month">Month:</label>
          <select
            id="month"
            v-model="selectedMonth"
            @change="updateSelectedDate"
            aria-live="polite"
          >
            <option disabled selected value="">Month</option>
            <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
          </select>
        </div>
      </div>
      <div class="col-md-2 col-sm-3">
        <div class="dropdown">
          <label for="day">Day:</label>
          <select id="day" v-model="selectedDay" @change="updateSelectedDate" aria-live="polite">
            <option disabled selected value="">Day</option>
            <option v-for="day in daysInMonth" :key="day" :value="day">{{ day }}</option>
          </select>
        </div>
      </div>
      <div class="col-md-1">
        <button
          v-if="showButton"
          class="date-button"
          @click="goToSelected(1)"
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>
    </div>
    <div class="row" id="row2">
      <div class="col-md-6">
        <button class="date-button" @click="goToToday(-1)">Yesterday</button>
      </div>
      <div class="col-md-6">
        <button class="date-button" @click="goToToday(0)">Today</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { generateOptions, padZero } from './dates/dateHelpers'

const router = useRouter()
const currentYear: number = new Date().getFullYear()
const selectedYear = ref<number>(currentYear)
const selectedMonth = ref<number | null>(null)
const selectedDay = ref<number | null>(null)

const years = generateOptions(1900, 2100)
const months = generateOptions(1, 12)
const daysInMonth = ref<number[]>([])

const showButton = computed(() => router.currentRoute.value.path !== '/')

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
.row {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding-bottom: 10px;
}

.col-md-2 {
  padding: 20px;
  margin-bottom: -20px;
}

.dropdown select {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 3rem;
  width: 5rem;
  margin-bottom: 10px;
}

.col-md-1 .date-button {
  width: 3rem;
}

.date-button {
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  background-color: rgb(36, 92, 190);
  cursor: pointer;
  transition: 0.3s ease;
  height: 3rem;
  width: 10rem;
  margin-bottom: 10px;
}

.date-button:hover {
  background-color: #77c4e6;
}

@media (max-width: 768px) {
  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .col-md-1,
  .col-md-2 {
    flex: 1;
    max-width: none;
  }
}
</style>
