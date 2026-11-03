import { describe, expect, it } from 'vitest'
import { fetchRates, toRateSnapshot } from './cbrRates.js'

const sampleJson = {
  Date: '2026-11-04T11:30:00+03:00',
  PreviousDate: '2026-11-03T11:30:00+03:00',
  Valute: {
    USD: { Nominal: 1, Value: 80.42, Previous: 80.11 },
    EUR: { Nominal: 1, Value: 93.1, Previous: 93.22 },
    CNY: { Nominal: 10, Value: 110.8, Previous: 110.4 },
  },
}

describe('toRateSnapshot', () => {
  it('обрезает даты до дня', () => {
    const snapshot = toRateSnapshot(sampleJson)
    expect(snapshot.date).toBe('2026-11-04')
    expect(snapshot.previousDate).toBe('2026-11-03')
  })

  it('делит курс на номинал', () => {
    const { CNY } = toRateSnapshot(sampleJson).rates
    expect(CNY.value).toBeCloseTo(11.08, 5)
    expect(CNY.previous).toBeCloseTo(11.04, 5)
  })

  it('оставляет курс при номинале 1', () => {
    const { USD } = toRateSnapshot(sampleJson).rates
    expect(USD).toEqual({ value: 80.42, previous: 80.11 })
  })

  it('бросает ошибку, если валюты нет', () => {
    const broken = { ...sampleJson, Valute: { USD: sampleJson.Valute.USD } }
    expect(() => toRateSnapshot(broken)).toThrow('EUR')
  })
})

describe('fetchRates', () => {
  it('возвращает снимок курсов', async () => {
    const okResponse = { ok: true, json: async () => sampleJson }
    const snapshot = await fetchRates(async () => okResponse)
    expect(snapshot.rates.EUR.value).toBe(93.1)
  })

  it('бросает ошибку при плохом ответе сервера', async () => {
    const failing = async () => ({ ok: false, status: 503 })
    await expect(fetchRates(failing)).rejects.toThrow('503')
  })
})