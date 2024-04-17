import { padZero } from './dateHelpers.js'

export function updateSelectedDate(selectedYear, selectedMonth, selectedDay, router) {
  if (selectedYear.value && selectedMonth.value && selectedDay.value) {
    const newDate = new Date(selectedYear.value, selectedMonth.value - 1, selectedDay.value)
    const formattedDate = `${newDate.getFullYear()}-${padZero(newDate.getMonth() + 1)}-${padZero(newDate.getDate())}`
    router.push(`/${formattedDate}`)
  }
}
