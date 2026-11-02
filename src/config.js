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
  wind: 'Сильный ветер: нужна ветрозащита',
  eveningDrop: 'Вечером заметно холоднее, чем днём: не убирай куртку в рюкзак',
}