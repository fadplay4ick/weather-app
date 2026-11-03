export const CITY = {
  name: 'Москва',
  latitude: 55.7558,
  longitude: 37.6173,
  timezone: 'Europe/Moscow',
}

export const CHECKPOINTS = [
  { id: 'morning', label: 'Утро', hour: 8 },
  { id: 'afternoon', label: 'Дорога с работы', hour: 16 },
  { id: 'evening', label: 'Вечер', hour: 18 },
]

export const COMFORT_SHIFT = 3
export const WIND_LIMIT = 8
export const EVENING_DROP = 3
export const MAX_READING_DISTANCE_HOURS = 3
export const HISTORY_FORECAST_DAYS = 7
export const HISTORY_KEEP_DAYS = 30
export const APPROXIMATE_FROM_DAYS = 4
export const RAIN_THRESHOLD_6H_MM = 0.5
export const PRECIPITATION_WINDOWS = { short: 1, long: 6 }

export const CLOTHING_BANDS = [
  { below: -10, summary: 'Зимняя куртка, тёплая кофта, шапка и перчатки' },
  { below: 0, summary: 'Зимняя куртка, кофта, шапка' },
  { below: 7, summary: 'Куртка и кофта поверх футболки' },
  { below: 13, summary: 'Лёгкая куртка и кофта' },
  { below: 18, summary: 'Ветровка или кофта, футболка под низ' },
  { below: 24, summary: 'Футболка, лёгкая кофта в рюкзак' },
  { below: Infinity, summary: 'Футболка' },
]

export const MESSAGES = {
  rain: 'Осадки: возьми зонт или капюшон',
  rainPossible: 'Возможен дождь: зонт не помешает',
  wind: 'Сильный ветер: нужна ветрозащита',
  eveningDrop: 'Вечером заметно холоднее, чем днём: не убирай куртку в рюкзак',
}


export const RATES_URL = 'https://www.cbr-xml-daily.ru/daily_json.js'
export const RATES_CURRENCIES = ['USD', 'EUR', 'CNY']
export const RATES_TIMEOUT_MS = 8000