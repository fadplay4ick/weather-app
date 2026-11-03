import { detectSwipe } from '../logic/swipe.js'

function toPoint(touch) {
  return { x: touch.clientX, y: touch.clientY }
}

export function attachSwipe(target, onSwipe) {
  let start = null
  target.addEventListener('touchstart', (event) => {
    start = toPoint(event.changedTouches[0])
  })
  target.addEventListener('touchend', (event) => {
    if (!start) return
    const direction = detectSwipe(start, toPoint(event.changedTouches[0]))
    start = null
    if (direction) onSwipe(direction)
  })
}