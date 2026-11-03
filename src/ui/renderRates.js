import { el } from './dom.js'
import { changeDirection, formatChange, formatRate } from './formatRates.js'

function renderChange(change) {
  const direction = changeDirection(change)
  const className = direction ? `rate-change ${direction}` : 'rate-change'
  return el('p', className, formatChange(change))
}

function renderRate({ code, value, change }) {
  return el('li', 'rate-tile', [
    el('p', 'rate-code', code),
    el('p', 'rate-value', formatRate(value)),
    renderChange(change),
  ])
}

export function renderRates(rates) {
  return el('section', 'rates', [
    el('h2', 'section-title', 'Курсы ЦБ'),
    el('ul', 'rates-list', rates.map(renderRate)),
  ])
}