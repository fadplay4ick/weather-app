import { describe, expect, it } from 'vitest'
import { getTargetDate, pickCheckpoints } from './checkpoints.js'

function readingsAt(time) {
  return [{ time }]
}

function makeReadings(times) {
  return times.map((time) => ({ time }))
}

function readingFor(checkpoints, id) {
  return checkpoints.find((checkpoint) => checkpoint.id === id).reading
}

describe('выбор дня для советов', () => {
  it('утром берётся сегодняшний день', () => {
    expect(getTargetDate(readingsAt('2026-11-03T07:00'))).toBe('2026-11-03')
  })

  it('в 18:00 ещё сегодняшний день', () => {
    expect(getTargetDate(readingsAt('2026-11-03T18:00'))).toBe('2026-11-03')
  })

  it('после 18:00 берётся завтрашний день', () => {
    expect(getTargetDate(readingsAt('2026-11-03T19:00'))).toBe('2026-11-04')
  })

  it('на границе месяца и года день считается верно', () => {
    expect(getTargetDate(readingsAt('2026-11-30T20:00'))).toBe('2026-12-01')
    expect(getTargetDate(readingsAt('2026-12-31T22:00'))).toBe('2027-01-01')
  })
})

describe('выбор записи для точки дня', () => {
  it('при часовых данных берёт запись ровно на час точки', () => {
    const readings = makeReadings([
      '2026-11-03T07:00',
      '2026-11-03T08:00',
      '2026-11-03T09:00',
    ])
    const result = pickCheckpoints(readings, '2026-11-03')
    expect(readingFor(result, 'morning').time).toBe('2026-11-03T08:00')
  })

  it('при шаге 6 часов берёт ближайшие записи', () => {
    const readings = makeReadings([
      '2026-11-06T03:00',
      '2026-11-06T09:00',
      '2026-11-06T15:00',
      '2026-11-06T21:00',
    ])
    const result = pickCheckpoints(readings, '2026-11-06')
    expect(readingFor(result, 'morning').time).toBe('2026-11-06T09:00')
    expect(readingFor(result, 'afternoon').time).toBe('2026-11-06T15:00')
  })

  it('при равном расстоянии берёт более раннюю запись', () => {
    const readings = makeReadings([
      '2026-11-06T03:00',
      '2026-11-06T15:00',
      '2026-11-06T21:00',
    ])
    const result = pickCheckpoints(readings, '2026-11-06')
    expect(readingFor(result, 'evening').time).toBe('2026-11-06T15:00')
  })

  it('запись дальше 3 часов не подходит', () => {
    const readings = makeReadings(['2026-11-06T03:00', '2026-11-06T15:00'])
    const result = pickCheckpoints(readings, '2026-11-06')
    expect(readingFor(result, 'morning')).toBeUndefined()
  })

  it('прошедшая точка остаётся пустой, запись после неё не подставляется', () => {
    const readings = makeReadings(['2026-11-03T10:00', '2026-11-03T11:00'])
    const result = pickCheckpoints(readings, '2026-11-03')
    expect(readingFor(result, 'morning')).toBeUndefined()
  })
})