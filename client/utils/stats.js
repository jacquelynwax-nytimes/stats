export const calculateBarHeight = (time, shortest, longest) => {
  const MIN_HEIGHT = 275
  const MAX_HEIGHT = 275
  const MIN_WIDTH = 80
  const MAX_WIDTH = 320
  const HEIGHT_DIFF = MAX_HEIGHT - MIN_HEIGHT
  const WIDTH_DIFF = MAX_WIDTH - MIN_WIDTH
  const solveTimeRange = longest - shortest
  const percentOfRange = (time - shortest) / solveTimeRange
  return {
    height: MIN_HEIGHT + (HEIGHT_DIFF * percentOfRange),
    width: MIN_WIDTH + (WIDTH_DIFF * percentOfRange),
  }
}

export const formatTime = (time) => {
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = Math.floor(time % 60)
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${m}:${ss}`
}

export const formatTimeAsInt = (time) => {
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = Math.floor(time % 60)
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${m}:${ss}`
}
