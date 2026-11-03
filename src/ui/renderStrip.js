import { el } from './dom.js'
import { formatTemperature } from './format.js'

function formatDayTemperature(temperature) {
  return temperature === null ? '—' : formatTemperature(temperature)
}

function renderDay(day, onSelect) {
  const button = el('button', day.isSelected ? 'day selected' : 'day', [
    el('span', 'day-name', day.weekday),
    el('span', 'day-number', String(day.dayNumber)),
    el('span', 'day-temp', formatDayTemperature(day.temperature)),
  ])
  button.addEventListener('click', () => onSelect(day.date))
  return button
}

export function renderStrip(days, onSelect) {
  return el('nav', 'strip', days.map((day) => renderDay(day, onSelect)))
}

export function centerSelectedDay(root) {
  root.querySelector('.day.selected')?.scrollIntoView({ inline: 'center', block: 'nearest' })
}