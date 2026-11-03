import './style.css'
import { fetchHourlyForecast } from './api/metNorway.js'
import { fetchRates } from './api/cbrRates.js'
import { ratesForDate } from './logic/ratesForDate.js'
import { loadRatesHistory, recordRates } from './storage/ratesStorage.js'
import { getTargetDate } from './logic/checkpoints.js'
import { adviceForDate } from './logic/dayFromHistory.js'
import { buildDayLabel } from './logic/dayLabel.js'
import { buildDayStrip } from './logic/dayStrip.js'
import { neighborDate } from './logic/swipe.js'
import { recordForecast } from './storage/historyStorage.js'
import { renderError, renderLoading, renderScreen } from './ui/render.js'
import { attachSwipe } from './ui/swipeHandler.js'

const root = document.querySelector('#app')

function getTodayDate(readings) {
  return readings[0].time.slice(0, 10)
}

async function loadRatesData() {
  try {
    const snapshot = await fetchRates()
    return { snapshot, history: recordRates(snapshot) }
  } catch (error) {
    console.error(error)
    return { snapshot: null, history: loadRatesHistory() }
  }
}

let swipeHandler = null

function showDay({ history, ratesData, date, todayDate }) {
  const select = (nextDate) => showDay({ history, ratesData, date: nextDate, todayDate })
  renderScreen(root, {
    days: buildDayStrip(history, date),
    advice: adviceForDate(history, date, todayDate),
    dayLabel: buildDayLabel(date, todayDate),
    rates: ratesForDate({ snapshot: ratesData.snapshot, history: ratesData.history, date }),
    onSelectDay: select,
  })
  swipeHandler = (direction) => {
    const nextDate = neighborDate(Object.keys(history).sort(), date, direction)
    if (nextDate) select(nextDate)
  }
}

async function init() {
  renderLoading(root)
  try {
    const [readings, ratesData] = await Promise.all([fetchHourlyForecast(), loadRatesData()])
    const history = recordForecast(readings)
    showDay({ history, ratesData, date: getTargetDate(readings), todayDate: getTodayDate(readings) })
  } catch (error) {
    console.error(error)
    renderError(root, init)
  }
}

init()

attachSwipe(document.body, (direction) => swipeHandler?.(direction))