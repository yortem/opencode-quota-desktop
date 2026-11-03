import type { Context } from "@opencode/plugin/gui"
import type { Budget, Meter, Quota, Tone } from "./types"
import { GO_WINDOWS } from "./types"

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function meterTone(meter: Meter): Tone {
  if (meter.limited || meter.percent >= 100) return "danger"
  return meter.percent >= 75 ? "warn" : "ok"
}

export function budgetTone(budget: Budget): Tone {
  if (budget.limit <= 0) return "ok"
  if (budget.spent >= budget.limit) return "danger"
  return budget.spent / budget.limit >= 0.75 ? "warn" : "ok"
}

/** The most urgent state across the Go windows and Console budgets. */
export function toneOf(info: Quota | null | undefined): Tone {
  if (!info) return "ok"
  let tone: Tone = "ok"
  if (info.go) {
    for (const key of GO_WINDOWS) {
      const meter = info.go[key]
      if (meter.limited || meter.percent >= 100) return "danger"
      if (meter.percent >= 75) tone = "warn"
    }
  }
  for (const budget of info.budgets) {
    const level = budgetTone(budget)
    if (level === "danger") return "danger"
    if (level === "warn") tone = "warn"
  }
  return tone
}

/** The highest percentage among the Go windows, for the titlebar pill. */
export function topPercent(info: Quota): number | undefined {
  if (!info.go) return undefined
  return Math.round(Math.max(...GO_WINDOWS.map((key) => info.go![key].percent)))
}

function localeOf(ctx: Context): string {
  const locale = ctx.locale.locale()
  return locale || "en"
}

/** `in 3 hr.` in the app's language, without a prefix. */
export function relativeTime(ctx: Context, at: number, now: number): string {
  const format = new Intl.RelativeTimeFormat(localeOf(ctx), { numeric: "auto", style: "short" })
  const minutes = Math.round((at - now) / 60_000)
  if (Math.abs(minutes) < 90) return format.format(minutes, "minute")
  const hours = Math.round(minutes / 60)
  if (Math.abs(hours) < 36) return format.format(hours, "hour")
  return format.format(Math.round(hours / 24), "day")
}

/** `Nov 9, 08:00` in the app's language, for a reset tooltip. */
export function absoluteTime(ctx: Context, at: number): string {
  return new Intl.DateTimeFormat(localeOf(ctx), {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(at)
}

export function timeOnly(ctx: Context, at: number): string {
  return new Intl.DateTimeFormat(localeOf(ctx), { timeStyle: "short" }).format(at)
}

/** A chart axis moment: a date for a window longer than a day, else a time. */
export function shortMoment(ctx: Context, at: number, long: boolean): string {
  return new Intl.DateTimeFormat(
    localeOf(ctx),
    long ? { month: "short", day: "numeric" } : { hour: "numeric", minute: "2-digit" },
  ).format(at)
}

export function money(ctx: Context, value: number): string {
  return new Intl.NumberFormat(localeOf(ctx), {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}

/** A short name for what a Console budget limits. */
export function budgetName(ctx: Context, budget: Budget): string {
  let label: string
  if (budget.coverage === "all") {
    label = ctx.t("card.budget.all")
  } else if (budget.models.length > 0) {
    const names = budget.models.map((model) => model.name)
    label =
      names.length > 2
        ? `${names.slice(0, 2).join(", ")} +${names.length - 2}`
        : names.join(", ")
  } else if (budget.vendors.length > 0) {
    label = budget.vendors.join(", ")
  } else {
    label = ctx.t("card.budget.other")
  }
  return budget.per === "model" ? `${label} (${ctx.t("card.budget.perModel")})` : label
}
