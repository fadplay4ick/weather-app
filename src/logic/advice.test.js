import { describe, expect, it } from 'vitest'
import { CHECKPOINTS, CLOTHING_BANDS, MESSAGES } from '../config.js'
import { buildDayAdvice } from './advice.js'

function makeReading(overrides = {}) {
  return {
    time: '2026-11-03T08:00',
    temperature: 10,
    wind: 1,
    humidity: 80,
    precipitation: 0,
    symbol: 'clearsky_day',
    ...overrides,
  }
}

function makeCheckpoints(readingsById) {
  return CHECKPOINTS.map((checkpoint) => ({
    ...checkpoint,
    reading: checkpoint.id in readingsById ? readingsById[checkpoint.id] : makeReading(),
  }))
}

function adviceFor(readingsById) {
  return buildDayAdvice(makeCheckpoints(readingsById))
}

function find(advice, id) {
  return advice.find((item) => item.id === id)
}

describe('одежда по температуре', () => {
  it.each([
    [-20, 0],
    [-5, 1],
    [2, 2],
    [6, 3],
    [12, 4],
    [18, 5],
    [25, 6],
  ])('при %i° выбирается группа %i', (temperature, bandIndex) => {
    const advice = adviceFor({ morning: makeReading({ temperature }) })
    expect(find(advice, 'morning').outfit).toBe(CLOTHING_BANDS[bandIndex].summary)
  })

  it('сильный ветер делает совет теплее', () => {
    const calm = adviceFor({ morning: makeReading({ temperature: -5, wind: 1 }) })
    const windy = adviceFor({ morning: makeReading({ temperature: -5, wind: 10 }) })
    expect(find(calm, 'morning').outfit).toBe(CLOTHING_BANDS[1].summary)
    expect(find(windy, 'morning').outfit).toBe(CLOTHING_BANDS[0].summary)
  })
})

describe('предупреждения', () => {
  it('осадки добавляют совет про зонт', () => {
    const advice = adviceFor({ morning: makeReading({ precipitation: 0.5 }) })
    expect(find(advice, 'morning').warnings).toContain(MESSAGES.rain)
  })

  it('без осадков совета про зонт нет', () => {
    const advice = adviceFor({ morning: makeReading({ precipitation: 0 }) })
    expect(find(advice, 'morning').warnings).not.toContain(MESSAGES.rain)
  })

  it('ветер 8 м/с даёт предупреждение', () => {
    const advice = adviceFor({ morning: makeReading({ wind: 8 }) })
    expect(find(advice, 'morning').warnings).toContain(MESSAGES.wind)
  })

  it('ветер 7.9 м/с предупреждения не даёт', () => {
    const advice = adviceFor({ morning: makeReading({ wind: 7.9 }) })
    expect(find(advice, 'morning').warnings).not.toContain(MESSAGES.wind)
  })
})

describe('вечернее похолодание', () => {
  it('падение на 5° добавляет предупреждение вечером', () => {
    const advice = adviceFor({
      afternoon: makeReading({ temperature: 10 }),
      evening: makeReading({ temperature: 5 }),
    })
    expect(find(advice, 'evening').warnings).toContain(MESSAGES.eveningDrop)
    expect(find(advice, 'afternoon').warnings).not.toContain(MESSAGES.eveningDrop)
  })

  it('падение ровно на 3° тоже считается', () => {
    const advice = adviceFor({
      afternoon: makeReading({ temperature: 10 }),
      evening: makeReading({ temperature: 7 }),
    })
    expect(find(advice, 'evening').warnings).toContain(MESSAGES.eveningDrop)
  })

  it('падение на 2° не считается', () => {
    const advice = adviceFor({
      afternoon: makeReading({ temperature: 10 }),
      evening: makeReading({ temperature: 8 }),
    })
    expect(find(advice, 'evening').warnings).not.toContain(MESSAGES.eveningDrop)
  })
})

describe('нет данных', () => {
  it('точка без данных помечается недоступной и не ломает остальные', () => {
    const advice = adviceFor({ morning: null })
    expect(find(advice, 'morning').available).toBe(false)
    expect(find(advice, 'afternoon').available).toBe(true)
  })

  it('без данных для дня вечернее предупреждение не падает', () => {
    const advice = adviceFor({ afternoon: null })
    expect(find(advice, 'evening').warnings).not.toContain(MESSAGES.eveningDrop)
  })
})