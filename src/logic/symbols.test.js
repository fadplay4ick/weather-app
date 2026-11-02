import { describe, expect, it } from 'vitest'
import { weatherIconKey } from './symbols.js'

describe('иконка по коду погоды', () => {
  it.each([
    ['clearsky_day', 'clear'],
    ['clearsky_night', 'clearNight'],
    ['fair_day', 'partly'],
    ['partlycloudy_night', 'partlyNight'],
    ['cloudy', 'cloudy'],
    ['lightrain', 'rain'],
    ['rainshowers_day', 'rain'],
    ['heavysnow', 'snow'],
    ['sleet', 'snow'],
    ['fog', 'fog'],
    ['lightrainandthunder', 'thunder'],
    ['unknown_code', 'cloudy'],
    [null, 'cloudy'],
  ])('код %s даёт иконку %s', (symbol, expected) => {
    expect(weatherIconKey(symbol)).toBe(expected)
  })
})