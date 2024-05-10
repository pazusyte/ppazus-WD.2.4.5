<template>
  <table>
    <tr>
      <th></th>
      <th>Year</th>
      <th>Month</th>
      <th>Day</th>
      <th></th>
    </tr>
    <tr>
      <td role="cell">
        <button
          v-if="showButton"
          class="date-button"
          @click="goToSelected(-1)"
          aria-label="Previous month"
        >
          &lt;
        </button>
      </td>
      <td role="cell">
        <div class="dropdown">
          <select id="year" v-model="selectedYear" @change="updateSelectedDate" aria-live="polite">
            <option disabled selected value="">Year</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </td>
      <td role="cell">
        <div class="dropdown">
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
      </td>
      <td role="cell">
        <div class="dropdown">
          <select id="day" v-model="selectedDay" @change="updateSelectedDate" aria-live="polite">
            <option disabled selected value="">Day</option>
            <option v-for="day in daysInMonth" :key="day" :value="day">{{ day }}</option>
          </select>
        </div>
      </td>
      <td>
        <button
          v-if="showButton"
          class="date-button"
          @click="goToSelected(1)"
          aria-label="Next month"
        >
          &gt;
        </button>
      </td>
    </tr>
    <tr>
      <td><button class="date-button" @click="goToToday(-1)">Yesterday</button></td>
      <td></td>
      <td></td>
      <td></td>
      <td><button class="date-button" @click="goToToday(0)">Today</button></td>
    </tr>
  </table>
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
.dropdown select {
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 3rem;
  width: 5rem;
  margin-bottom: 10px;
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
  width: 6rem;
  margin-bottom: 10px;
}

.date-button:hover {
  background-color: #77c4e6;
}

@media (max-width: 767px) {
  td button {
    font-size: 10px;
    width: 100%;
  }
  .date-button {
    width: 100%;
  }
  .dropdown select {
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 3rem;
    width: 4rem;
    margin-bottom: 10px;
  }
}
</style>
