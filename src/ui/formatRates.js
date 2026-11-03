const DASH = '—'
const UP = '▲'
const DOWN = '▼'

function formatNumber(value) {
  return value.toFixed(2).replace('.', ',')
}

export function formatRate(value) {
  return value === null ? DASH : formatNumber(value)
}

export function changeDirection(change) {
  if (!change) return null
  return change > 0 ? 'up' : 'down'
}

export function formatChange(change) {
  const direction = changeDirection(change)
  if (!direction) return ''
  const arrow = direction === 'up' ? UP : DOWN
  return `${arrow} ${formatNumber(Math.abs(change))}`
}