const MIN_DISTANCE = 50
const DIRECTION_RATIO = 1.5

export function detectSwipe(start, end) {
  const dx = end.x - start.x
  const dy = end.y - start.y
  if (Math.abs(dx) < MIN_DISTANCE) return null
  if (Math.abs(dx) < Math.abs(dy) * DIRECTION_RATIO) return null
  return dx < 0 ? 'next' : 'prev'
}

export function neighborDate(dates, current, direction) {
  const index = dates.indexOf(current)
  const step = direction === 'next' ? 1 : -1
  return dates[index + step] ?? null
}