function icon(body) {
  return `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`
}

function cloud(shiftY = 0) {
  return `<g transform="translate(0 ${shiftY})"><path class="cut" d="M13 33a7 7 0 0 1 0-14 10 10 0 0 1 19.4-2A8 8 0 0 1 34 33z"/></g>`
}

const SUN_RAYS = 'M24 5v5M24 38v5M5 24h5M38 24h5M10.6 10.6l3.5 3.5M33.9 33.9l3.5 3.5M10.6 37.4l3.5-3.5M33.9 14.1l3.5-3.5'
const SMALL_CLOUD = '<path class="cut" d="M16 41a6 6 0 0 1 0-12 8.5 8.5 0 0 1 16.4-1.5A6.8 6.8 0 0 1 33 41z"/>'

export const ICONS = {
  clear: icon(`<circle cx="24" cy="24" r="8"/><path d="${SUN_RAYS}"/>`),
  clearNight: icon('<path d="M38 28.5A15 15 0 1 1 19.5 10a12 12 0 0 0 18.5 18.5z"/>'),
  partly: icon(`<circle cx="17" cy="16" r="6"/><path d="M17 4v3M5 16h3M8.5 7.5l2.1 2.1M25.5 7.5l-2.1 2.1"/>${SMALL_CLOUD}`),
  partlyNight: icon(`<path d="M21 6a9 9 0 1 0 10 12 7 7 0 0 1-10-12z"/>${SMALL_CLOUD}`),
  cloudy: icon(cloud(5)),
  rain: icon(`${cloud()}<path d="M16 38l-2 6M25 38l-2 6M34 38l-2 6"/>`),
  snow: icon(`${cloud()}<g fill="currentColor" stroke="none"><circle cx="16" cy="38" r="1.4"/><circle cx="24" cy="41" r="1.4"/><circle cx="32" cy="38" r="1.4"/><circle cx="20" cy="44" r="1.4"/><circle cx="28" cy="44" r="1.4"/></g>`),
  fog: icon('<path d="M9 16h30M5 24h38M11 32h26M16 40h16"/>'),
  thunder: icon(`${cloud()}<path d="M26 31l-6 8h7l-4 8"/>`),
  umbrella: icon('<path d="M6 24a18 18 0 0 1 36 0z"/><path d="M24 24v13a3.5 3.5 0 0 1-7 0"/>'),
  wind: icon('<path d="M6 18h22a5 5 0 1 0-5-5M6 26h30a5 5 0 1 1-5 5M6 34h14"/>'),
  cold: icon('<path d="M20 8a4 4 0 0 1 8 0v18.5a8 8 0 1 1-8 0z"/><path d="M24 20v14"/>'),
}