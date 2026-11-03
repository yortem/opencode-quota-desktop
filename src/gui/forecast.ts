import type { Meter, Tone, WindowKey } from "./types"

/** How long each Go allowance window lasts. */
export const WINDOW_MS: Record<WindowKey, number> = {
  rolling: 5 * 60 * 60 * 1000,
  weekly: 7 * 24 * 60 * 60 * 1000,
  monthly: 30 * 24 * 60 * 60 * 1000,
}

export type Forecast = {
  /** When the window began. */
  start: number
  /** How much of the window has passed, from 0 to 1. */
  elapsed: number
  /** The percent this pace reaches by the reset; the used percent when there is too little to extrapolate. */
  projected: number
  /** When the pace reaches 100%, only while it would happen before the reset. */
  runsOutAt?: number
  /** Milliseconds until the reset. */
  remaining: number
  /** The window already reset; the next answer is due. */
  stale: boolean
}

/**
 * A linear projection of the current pace to the end of the window. The server reports the
 * window's reset time, so the start is the reset minus the window's length.
 */
export function forecastOf(meter: Meter, window: WindowKey, now: number): Forecast {
  const duration = WINDOW_MS[window]
  const start = meter.resetsAt - duration
  const remaining = Math.max(0, meter.resetsAt - now)
  const elapsedMs = Math.min(duration, Math.max(0, now - start))
  const elapsed = duration > 0 ? elapsedMs / duration : 0
  const stale = meter.resetsAt <= now
  const percent = Math.max(0, meter.percent)

  // Nothing to extrapolate from: no usage, a window that just began, or one that already reset.
  if (percent <= 0 || elapsed <= 0.005 || stale) {
    return { start, elapsed: stale ? 1 : elapsed, projected: percent, remaining, stale }
  }

  const projected = Math.min(999, percent / elapsed)
  const runsOutAt =
    projected > 100 ? now + (100 - percent) / (percent / elapsedMs) : undefined

  return {
    start,
    elapsed,
    projected,
    runsOutAt: runsOutAt !== undefined && runsOutAt < meter.resetsAt ? runsOutAt : undefined,
    remaining,
    stale,
  }
}

/** The urgency of a forecast: a window that runs out before its reset is the loudest. */
export function forecastTone(forecast: Forecast, meter: Meter): Tone {
  if (meter.limited || forecast.runsOutAt !== undefined || forecast.projected >= 100) return "danger"
  return forecast.projected >= 75 ? "warn" : "ok"
}
