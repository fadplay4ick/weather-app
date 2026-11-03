import { describe, expect, it } from 'vitest'
import { detectSwipe, neighborDate } from './swipe.js'

const start = { x: 200, y: 300 }

describe('распознавание свайпа', () => {
  it('влево даёт next', () => {
    expect(detectSwipe(start, { x: 100, y: 305 })).toBe('next')
  })

  it('вправо даёт prev', () => {
    expect(detectSwipe(start, { x: 300, y: 295 })).toBe('prev')
  })

  it('короткий сдвиг не считается', () => {
    expect(detectSwipe(start, { x: 160, y: 300 })).toBeNull()
  })

  it('преимущественно вертикальный жест не считается', () => {
    expect(detectSwipe(start, { x: 120, y: 420 })).toBeNull()
  })
})

describe('соседний день', () => {
  const dates = ['2026-11-03', '2026-11-04', '2026-11-05']

  it('находит следующий и предыдущий', () => {
    expect(neighborDate(dates, '2026-11-04', 'next')).toBe('2026-11-05')
    expect(neighborDate(dates, '2026-11-04', 'prev')).toBe('2026-11-03')
  })

  it('на краях возвращает null', () => {
    expect(neighborDate(dates, '2026-11-03', 'prev')).toBeNull()
    expect(neighborDate(dates, '2026-11-05', 'next')).toBeNull()
  })
})