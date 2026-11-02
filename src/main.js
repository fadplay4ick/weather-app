import './style.css'
import { fetchHourlyForecast } from './api/metNorway.js'
import { getTargetDate, pickCheckpoints } from './logic/checkpoints.js'
import { buildDayAdvice } from './logic/advice.js'
import { buildDayLabel } from './logic/dayLabel.js'
import { renderError, renderLoading, renderScreen } from './ui/render.js'

const root = document.querySelector('#app')

function getTodayDate(readings) {
  return readings[0].time.slice(0, 10)
}

async function init() {
  renderLoading(root)
  try {
    const readings = await fetchHourlyForecast()
    const targetDate = getTargetDate(readings)
    const advice = buildDayAdvice(pickCheckpoints(readings, targetDate))
    const dayLabel = buildDayLabel(targetDate, getTodayDate(readings))
    renderScreen(root, { advice, dayLabel })
  } catch (error) {
    console.error(error)
    renderError(root, init)
  }
}

init()