import type { UsageLimitsBudget, UsageLimitsGo, UsageLimitsInfo, UsageLimitsMeter } from "@opencode/client/promise"

/** The OpenCode Console workspace quota, as the server reports it. */
export type Quota = UsageLimitsInfo
export type GoQuota = UsageLimitsGo
export type Meter = UsageLimitsMeter
export type Budget = UsageLimitsBudget

/** Where the floating card sits, and whether it is shown. */
export type DockState = {
  x: number
  y: number
  placed: boolean
  open: boolean
  collapsed: boolean
  forecast: boolean
  /** Layout revision, used to move older saves to the bottom-right dock once. */
  layout: number
}

export const GO_WINDOWS = ["rolling", "weekly", "monthly"] as const
export type WindowKey = (typeof GO_WINDOWS)[number]

export type RefreshReason = "initial" | "auto" | "manual"

export type Tone = "ok" | "warn" | "danger"
