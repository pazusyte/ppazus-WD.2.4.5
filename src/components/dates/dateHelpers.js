export function generateOptions(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function padZero(value) {
  return value < 10 ? `0${value}` : value.toString()
}
