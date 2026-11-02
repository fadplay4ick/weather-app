import { CITY, MESSAGES } from '../config.js'
import { weatherIconKey } from '../logic/symbols.js'
import { el, svgIcon } from './dom.js'
import { formatHour, formatTemperature } from './format.js'
import { ICONS } from './icons.js'

const WARNING_ICONS = {
  [MESSAGES.rain]: 'umbrella',
  [MESSAGES.wind]: 'wind',
  [MESSAGES.eveningDrop]: 'cold',
}

function renderChip(text) {
  return el('li', 'chip', [
    svgIcon(ICONS[WARNING_ICONS[text]], 'chip-icon'),
    el('span', null, text),
  ])
}

function renderCard({ label, hour, reading, outfit, warnings }, isHero) {
  const card = el('article', isHero ? 'card hero' : 'card')
  card.append(
    el('div', 'card-head', [
      el('div', null, [el('p', 'card-label', label), el('p', 'card-time', formatHour(hour))]),
      svgIcon(ICONS[weatherIconKey(reading.symbol)], 'weather-icon'),
    ]),
    el('p', 'card-temp', formatTemperature(reading.temperature)),
    el('p', 'card-outfit', outfit)
  )
  if (warnings.length) card.append(el('ul', 'chips', warnings.map(renderChip)))
  return card
}

function renderHeader({ prefix, date }) {
  return el('header', 'header', [
    el('p', 'header-city', `${prefix}, ${CITY.name}`),
    el('h1', 'header-date', date),
  ])
}

function renderStatus(root, text, onRetry) {
  const screen = el('div', 'status-screen', el('p', 'status-text', text))
  if (onRetry) {
    const button = el('button', 'retry', 'Повторить')
    button.addEventListener('click', onRetry)
    screen.append(button)
  }
  root.replaceChildren(screen)
}

export function renderLoading(root) {
  renderStatus(root, 'Загружаю погоду…')
}

export function renderError(root, onRetry) {
  renderStatus(root, 'Не удалось загрузить погоду', onRetry)
}

export function renderScreen(root, { advice, dayLabel }) {
  const cards = advice.filter(({ available }) => available)
  if (!cards.length) return renderStatus(root, 'Нет данных о погоде')
  root.replaceChildren(
    renderHeader(dayLabel),
    el('main', 'cards', cards.map((item, index) => renderCard(item, index === 0)))
  )
}