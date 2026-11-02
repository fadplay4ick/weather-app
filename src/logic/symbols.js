const RULES = [
  ['thunder', 'thunder'],
  ['snow', 'snow'],
  ['sleet', 'snow'],
  ['rain', 'rain'],
  ['fog', 'fog'],
  ['partlycloudy', 'partly'],
  ['cloudy', 'cloudy'],
  ['clearsky', 'clear'],
  ['fair', 'partly'],
]

const WITH_NIGHT_VARIANT = new Set(['clear', 'partly'])

export function weatherIconKey(symbol) {
  if (!symbol) return 'cloudy'
  const kind = RULES.find(([part]) => symbol.includes(part))?.[1] ?? 'cloudy'
  const isNight = symbol.endsWith('_night')
  return WITH_NIGHT_VARIANT.has(kind) && isNight ? `${kind}Night` : kind
}