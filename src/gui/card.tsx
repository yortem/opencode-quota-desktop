import type { Context, Persisted } from "@opencode/plugin/gui"
import { createSignal, For, onCleanup, onMount, Show, type JSX } from "solid-js"
import {
  absoluteTime,
  budgetName,
  budgetTone,
  clamp,
  meterTone,
  money,
  relativeTime,
  shortMoment,
  timeOnly,
  toneOf,
} from "./format"
import { forecastOf, forecastTone, type Forecast } from "./forecast"
import type { QuotaStore } from "./quota"
import type { Budget, DockState, GoQuota, Meter, Quota, Tone } from "./types"
import { GO_WINDOWS } from "./types"

type Props = {
  ctx: Context
  quota: QuotaStore
  dock: Persisted<DockState, DockState>
}

/** The site's chart palette: green for what happened, gold for what is projected. */
const GREEN = "#22c55e"
const GOLD = "#f5c451"

/** The bottom of the app's titlebar, where Electron starts dragging the window instead of the page. */
function topLimit(): number {
  const bar = document.querySelector<HTMLElement>('header[data-slot="titlebar-v2"]')
  const bottom = bar?.getBoundingClientRect().bottom
  return Math.max(4, (bottom ?? 44) + 6)
}

/** A draggable card with the signed-in workspace's OpenCode Go windows and Console budgets. */
export function FloatingQuota(props: Props) {
  const ctx = props.ctx
  const [element, setElement] = createSignal<HTMLDivElement>()
  const [drag, setDrag] = createSignal<{ x: number; y: number }>()
  const [heightFix, setHeightFix] = createSignal(0)
  const [pillElement, setPillElement] = createSignal<HTMLButtonElement>()
  const [pillDrag, setPillDrag] = createSignal<{ x: number; y: number }>()
  const [refreshing, setRefreshing] = createSignal(false)
  const [now, setNow] = createSignal(Date.now())
  let pillOrigin: { px: number; py: number; x: number; y: number } | undefined
  let pillMoved = false
  let suppressPillClick = false

  const clock = setInterval(() => setNow(Date.now()), 30_000)
  onCleanup(() => clearInterval(clock))

  let origin: { px: number; py: number; x: number; y: number } | undefined

  const open = () => props.dock.value.open
  const info = () => props.quota.data()
  const tone = (): Tone => {
    const shown = info()
    if (shown) return toneOf(shown)
    return props.quota.error() && shown === undefined ? "danger" : "ok"
  }
  const month = () => {
    const shown = info()
    return shown?.go?.monthly.percent
  }

  const placed = () => drag() !== undefined || props.dock.value.placed
  const position = (): JSX.CSSProperties | undefined => {
    const dragged = drag()
    if (dragged) return { left: `${dragged.x}px`, top: `${dragged.y}px` }
    if (props.dock.value.placed) {
      return { left: `${props.dock.value.x}px`, top: `${props.dock.value.y + heightFix()}px` }
    }
    return undefined
  }

  const toggleForecast = () => {
    props.dock.update((draft) => {
      draft.forecast = !draft.forecast
    })
  }

  const minimize = () => {
    const box = element()?.getBoundingClientRect()
    const wasPlaced = props.dock.value.placed

    props.dock.update((draft) => {
      draft.open = false
      // Keep the visible top-left, not the base top that the anchor may have shifted.
      if (wasPlaced && box) {
        draft.x = box.left
        draft.y = box.top
      }
      // The pill has its own place; minimizing never moves it.
    })
    setHeightFix(0)
    setDrag(undefined)
  }

  const pillPlaced = () => pillDrag() !== undefined || props.dock.value.pillPlaced
  const launcherPosition = (): JSX.CSSProperties | undefined => {
    const dragged = pillDrag()
    if (dragged) return { left: `${dragged.x}px`, top: `${dragged.y}px` }
    if (props.dock.value.pillPlaced) {
      return { left: `${props.dock.value.pillX}px`, top: `${props.dock.value.pillY}px` }
    }
    return undefined
  }

  const keepPillOnScreen = () => {
    if (!props.dock.value.pillPlaced) return
    const box = pillElement()?.getBoundingClientRect()
    if (!box) return
    const minTop = topLimit()
    const x = clamp(props.dock.value.pillX, 4, Math.max(4, window.innerWidth - box.width - 4))
    const y = clamp(props.dock.value.pillY, minTop, Math.max(minTop, window.innerHeight - box.height - 4))
    if (x === props.dock.value.pillX && y === props.dock.value.pillY) return
    props.dock.update((draft) => {
      draft.pillX = x
      draft.pillY = y
    })
  }

  const onPillMove = (event: PointerEvent) => {
    if (!pillOrigin) return
    const dx = event.clientX - pillOrigin.px
    const dy = event.clientY - pillOrigin.py
    if (!pillMoved && Math.abs(dx) + Math.abs(dy) < 3) return
    pillMoved = true
    const box = pillElement()?.getBoundingClientRect()
    const width = box?.width ?? 110
    const height = box?.height ?? 30
    const minTop = topLimit()
    const x = clamp(pillOrigin.x + dx, 4, Math.max(4, window.innerWidth - width - 4))
    const y = clamp(pillOrigin.y + dy, minTop, Math.max(minTop, window.innerHeight - height - 4))
    setPillDrag({ x, y })
  }

  const onPillUp = () => {
    if (!pillOrigin) return
    pillOrigin = undefined
    window.removeEventListener("pointermove", onPillMove)
    window.removeEventListener("pointerup", onPillUp)
    window.removeEventListener("pointercancel", onPillUp)
    const next = pillDrag()
    const moved = pillMoved
    pillMoved = false
    setPillDrag(undefined)
    if (!moved || !next) return
    props.dock.update((draft) => {
      draft.pillX = next.x
      draft.pillY = next.y
      draft.pillPlaced = true
    })
    // The click after this pointerup belongs to the drag, not to opening the card.
    suppressPillClick = true
    window.setTimeout(() => {
      suppressPillClick = false
    }, 0)
  }

  const onPillDown = (event: PointerEvent) => {
    if (event.button !== 0) return
    const box = pillElement()?.getBoundingClientRect()
    if (!box) return
    pillOrigin = { px: event.clientX, py: event.clientY, x: box.left, y: box.top }
    pillMoved = false
    setPillDrag({ x: box.left, y: box.top })
    window.addEventListener("pointermove", onPillMove)
    window.addEventListener("pointerup", onPillUp)
    window.addEventListener("pointercancel", onPillUp)
  }

  const openFromPill = () => {
    if (suppressPillClick) {
      suppressPillClick = false
      return
    }
    props.dock.update((draft) => {
      draft.open = true
      // The card keeps its own place; the pill's place is separate.
    })
  }

  const attachPill = (node: HTMLButtonElement) => {
    setPillElement(node)
    if (node) requestAnimationFrame(keepPillOnScreen)
  }

  onCleanup(() => {
    window.removeEventListener("pointermove", onPillMove)
    window.removeEventListener("pointerup", onPillUp)
    window.removeEventListener("pointercancel", onPillUp)
  })

  // The site's usage page lives one level above its Overview tab.
  const openDashboard = (url: string) => {
    const target = url.replace(/\/overview\/?$/, "")
    try {
      const parsed = new URL(target)
      const host = parsed.hostname.toLowerCase()
      // Only the Console's own HTTPS host, never a URL an unexpected server could redirect to.
      if (parsed.protocol !== "https:" || (host !== "opencode.ai" && !host.endsWith(".opencode.ai"))) return
      ctx.system.openExternal(parsed.toString())
    } catch {
      // A malformed URL is ignored.
    }
  }

  // The background poll stays silent; only a click spins the refresh button.
  const refreshNow = async () => {
    setRefreshing(true)
    try {
      await props.quota.refresh("manual")
    } finally {
      setRefreshing(false)
    }
  }

  const [dragging, setDragging] = createSignal(false)

  const onMove = (event: PointerEvent) => {
    if (!dragging() || !origin) return
    const box = element()?.getBoundingClientRect()
    const width = box?.width ?? 320
    const height = box?.height ?? 220
    const minTop = topLimit()
    const x = clamp(origin.x + event.clientX - origin.px, 4, Math.max(4, window.innerWidth - width - 4))
    const y = clamp(
      origin.y + event.clientY - origin.py,
      minTop,
      Math.max(minTop, window.innerHeight - height - 4),
    )
    setDrag({ x, y })
  }

  const endDrag = () => {
    if (!dragging()) return
    setDragging(false)
    origin = undefined
    window.removeEventListener("pointermove", onMove)
    window.removeEventListener("pointerup", endDrag)
    window.removeEventListener("pointercancel", endDrag)
    window.removeEventListener("blur", endDrag)
    const next = drag()
    if (!next) return
    props.dock.update((draft) => {
      draft.x = next.x
      draft.y = next.y
      draft.placed = true
    })
    setDrag(undefined)
  }

  const onDown = (event: PointerEvent) => {
    if (event.button !== 0) return
    const target = event.target
    if (target instanceof Element && target.closest("button, a, input, textarea, select")) return
    const box = element()?.getBoundingClientRect()
    if (!box) return

    // A card held above the viewport edge by its own height becomes a card at the visible top.
    if (heightFix() !== 0) {
      const top = props.dock.value.y + heightFix()
      props.dock.update((draft) => {
        draft.y = top
      })
      setHeightFix(0)
    }

    origin = { px: event.clientX, py: event.clientY, x: box.left, y: box.top }
    setDrag({ x: box.left, y: box.top })
    setDragging(true)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", endDrag)
    window.addEventListener("pointercancel", endDrag)
    window.addEventListener("blur", endDrag)
    event.preventDefault()
  }

  onCleanup(() => {
    window.removeEventListener("pointermove", onMove)
    window.removeEventListener("pointerup", endDrag)
    window.removeEventListener("pointercancel", endDrag)
    window.removeEventListener("blur", endDrag)
  })

  // Keep a card that the user placed fully on screen as it grows, so the forecast never opens below the display.
  // A card in the lower half keeps its bottom edge; one in the upper half keeps its top edge.
  let lastHeight = 0
  let initializing = true
  let initFrame: number | undefined

  const keepOnScreen = () => {
    const box = element()?.getBoundingClientRect()
    if (!box) return
    const height = box.height
    const margin = 4
    const minTop = topLimit()
    const maxTop = Math.max(minTop, window.innerHeight - margin - height)
    const currentTop = box.top

    if (!props.dock.value.placed) {
      setHeightFix(0)
      if (!initializing) lastHeight = height
    } else if (initializing || lastHeight === 0) {
      // The first layout after opening: keep the position it had and only move it enough to fit.
      const top = clamp(currentTop, minTop, maxTop)
      setHeightFix(top - props.dock.value.y)
      if (!initializing) lastHeight = height
    } else {
      // A real size change: a lower card keeps its bottom edge, an upper card its top edge.
      const bottomAnchored = props.dock.value.y > window.innerHeight * 0.35
      const desired = bottomAnchored ? currentTop + (lastHeight - height) : currentTop
      const top = clamp(desired, minTop, maxTop)
      setHeightFix(top - props.dock.value.y)
      lastHeight = height
    }

    const left = clamp(props.dock.value.x, margin, Math.max(margin, window.innerWidth - box.width - margin))
    if (left !== props.dock.value.x) {
      props.dock.update((draft) => {
        draft.x = left
      })
    }
  }

  let observer: ResizeObserver | undefined

  // Runs when the card mounts and again whenever it reopens, so a hidden card keeps its anchor.
  const attach = (node: HTMLDivElement) => {
    setElement(node)
    observer?.disconnect()
    observer = undefined
    if (initFrame !== undefined) cancelAnimationFrame(initFrame)
    initFrame = undefined
    if (!node) return

    lastHeight = 0
    initializing = true
    setHeightFix(0)
    observer = new ResizeObserver(() => keepOnScreen())
    observer.observe(node)

    // Let the first paint measure the whole card, not just the header, before anchoring to its size.
    initFrame = requestAnimationFrame(() => {
      initFrame = undefined
      initializing = false
      keepOnScreen()
    })
  }

  const onResize = () => {
    keepOnScreen()
    keepPillOnScreen()
  }

  onMount(() => {
    window.addEventListener("resize", onResize)
    onCleanup(() => {
      window.removeEventListener("resize", onResize)
      observer?.disconnect()
      if (initFrame !== undefined) cancelAnimationFrame(initFrame)
    })
  })

  const updated = () => {
    const at = props.quota.updatedAt()
    return at ? ctx.t("card.updated", { time: timeOnly(ctx, at) }) : ""
  }

  return (
    <>
    <Show when={open()}>
      <div
        ref={attach}
        class="oq-floating"
        classList={{ "oq-dock": !placed() }}
        data-mode={ctx.appearance.mode()}
        dir={ctx.locale.direction()}
        style={position()}
      >
        <header class="oq-head" onPointerDown={onDown}>
          <span class="oq-dot" data-tone={tone()} />
          <span class="oq-name">{ctx.t("card.title")}</span>
          <Show when={info()?.workspace.name}>
            {(name) => (
              <span class="oq-ws" title={name()}>
                {name()}
              </span>
            )}
          </Show>
          <span class="oq-spacer" />
          <ctx.ui.IconButton
            icon="refresh"
            label={ctx.t("card.refresh")}
            size="small"
            variant="ghost"
            busy={refreshing()}
            onClick={() => void refreshNow()}
          />
          <ctx.ui.IconButton
            icon="minus"
            label={ctx.t("card.minimize")}
            size="small"
            variant="ghost"
            onClick={minimize}
          />
        </header>

        <div class="oq-body">
              {info() === undefined ? (
                <div class="oq-state oq-inline">
                  <ctx.ui.Loader size="small" />
                  <span>{ctx.t("card.loading")}</span>
                </div>
              ) : info() === null ? (
                <div class="oq-state">
                  <span class="oq-state-title">{ctx.t("card.signedOut.title")}</span>
                  <span>{ctx.t("card.signedOut.body")}</span>
                </div>
              ) : (
                <QuotaBody
                  ctx={ctx}
                  info={info()!}
                  now={now}
                  forecastOpen={props.dock.value.forecast}
                  toggleForecast={toggleForecast}
                />
              )}
              <Show when={props.quota.error()}>
                {(message) => (
                  <div class="oq-error-row">
                    <span class="oq-error">{ctx.t("card.error", { message: message() })}</span>
                    <ctx.ui.Button
                      variant="ghost"
                      size="small"
                      onClick={() => void refreshNow()}
                    >
                      {ctx.t("card.retry")}
                    </ctx.ui.Button>
                  </div>
                )}
              </Show>
            </div>

            <Show when={info()}>
              {(shown) => (
                <footer class="oq-foot">
                  <span class="oq-updated">{updated()}</span>
                  <ctx.ui.Button
                    variant="ghost"
                    size="small"
                    onClick={() => openDashboard(shown().workspace.usageURL)}
                  >
                    {ctx.t("card.openDashboard")}
                  </ctx.ui.Button>
                </footer>
              )}
            </Show>
      </div>
    </Show>

    <Show when={!open()}>
      <button
        ref={attachPill}
        type="button"
        class="oq-launcher"
        classList={{ "oq-launcher-dock": !pillPlaced() }}
        data-mode={ctx.appearance.mode()}
        dir={ctx.locale.direction()}
        style={launcherPosition()}
        aria-label={ctx.t("card.launcher.open")}
        title={ctx.t("card.launcher.open")}
        onPointerDown={onPillDown}
        onClick={openFromPill}
      >
        <span class="oq-dot" data-tone={tone()} />
        <span>{ctx.t("card.launcher")}</span>
        <Show when={month() !== undefined}>
          <span class="oq-launcher-value">{Math.round(month()!)}%</span>
        </Show>
      </button>
    </Show>
    </>
  )
}

function QuotaBody(props: {
  ctx: Context
  info: Quota
  now: () => number
  forecastOpen: boolean
  toggleForecast: () => void
}) {
  const go = props.info.go
  const budgets = props.info.budgets

  return (
    <>
      {go ? (
        <>
          <div class="oq-meters">
            <For each={GO_WINDOWS}>
              {(key) => (
                <MeterView
                  ctx={props.ctx}
                  name={props.ctx.t(`card.go.${key}`)}
                  meter={go[key]}
                  now={props.now}
                />
              )}
            </For>
          </div>
          <ForecastSection
            ctx={props.ctx}
            go={go}
            now={props.now}
            open={props.forecastOpen}
            toggle={props.toggleForecast}
          />
        </>
      ) : null}

      {budgets.length > 0 ? (
        <div class="oq-section">
          <div class="oq-section-title">{props.ctx.t("card.budgets")}</div>
          <For each={budgets}>
            {(budget) => <BudgetView ctx={props.ctx} budget={budget} now={props.now} />}
          </For>
        </div>
      ) : null}

      {!go && budgets.length === 0 ? (
        <div class="oq-state">{props.ctx.t("card.noGo")}</div>
      ) : null}
    </>
  )
}

/**
 * The monthly forecast, as the usage page draws it: the used share, the pace to renewal, the
 * actual line in green and the projected line and hatched area in gold.
 */
function ForecastSection(props: {
  ctx: Context
  go: GoQuota
  now: () => number
  open: boolean
  toggle: () => void
}) {
  const ctx = props.ctx
  const meter = () => props.go.monthly
  const forecast = () => forecastOf(meter(), "monthly", props.now())
  const tone = () => forecastTone(forecast(), meter())
  const renews = () => shortMoment(ctx, meter().resetsAt, true)

  const pace = () => {
    const shown = forecast()
    if (meter().limited || meter().percent >= 100) return ctx.t("card.limited")
    if (shown.stale || meter().percent <= 0) return ctx.t("card.forecast.empty")
    if (shown.runsOutAt !== undefined) {
      return ctx.t("card.forecast.runsOut", { time: relativeTime(ctx, shown.runsOutAt, props.now()) })
    }
    return ctx.t("card.forecast.onPace", { percent: Math.round(shown.projected) })
  }

  const summary = () => {
    const shown = forecast()
    if (meter().limited || meter().percent >= 100) return ctx.t("card.limited")
    if (shown.stale || meter().percent <= 0) return ctx.t("card.forecast.empty")
    if (shown.runsOutAt !== undefined) {
      return ctx.t("card.forecast.summaryRunOut", {
        time: relativeTime(ctx, shown.runsOutAt, props.now()),
      })
    }
    return ctx.t("card.forecast.summary", { percent: Math.round(shown.projected) })
  }

  const ticks = () => {
    const start = forecast().start
    const end = meter().resetsAt
    return [0, 1, 2, 3].map((index) => start + ((end - start) * index) / 3)
  }

  return (
    <>
      <button
        type="button"
        class="oq-fc-toggle"
        aria-expanded={props.open}
        aria-label={ctx.t(props.open ? "card.forecast.hide" : "card.forecast.show")}
        onClick={props.toggle}
      >
        <span class="oq-fc-toggle-label">{ctx.t("card.forecast")}</span>
        <span class="oq-fc-toggle-summary">{summary()}</span>
        <ctx.ui.Icon
          name="chevron-down"
          size="small"
          class="oq-fc-chevron"
          data-open={props.open ? "true" : "false"}
        />
      </button>

      <div class="oq-fc-wrap" data-open={props.open ? "true" : "false"}>
        <div class="oq-fc-inner">
          <div class="oq-fc-panel">
            <div class="oq-fc-hero">
              <span class="oq-fc-percent">{Math.round(meter().percent)}%</span>
              <span class="oq-fc-pace" data-tone={tone()}>
                {pace()}
              </span>
            </div>
            <div class="oq-fc-caption">
              {ctx.t("card.forecast.usage")}
              <span class="oq-fc-sep">·</span>
              {ctx.t("card.forecast.renews", { date: renews() })}
            </div>

            <ForecastChart meter={meter()} forecast={forecast()} />

            <div class="oq-fc-axis">
              <For each={ticks()}>{(at) => <span>{shortMoment(ctx, at, true)}</span>}</For>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ForecastChart(props: { meter: Meter; forecast: Forecast }) {
  const fillId = `oq-fc-fill-${Math.random().toString(36).slice(2, 9)}`
  const hatchId = `oq-fc-hatch-${Math.random().toString(36).slice(2, 9)}`

  const W = 296
  const H = 116
  const LEFT = 32
  const RIGHT = 4
  const TOP = 6
  const BOTTOM = 4

  const yMax = () => {
    const top = Math.max(props.meter.percent, props.forecast.projected)
    return Math.max(150, Math.ceil(top / 50) * 50)
  }
  const x = (t: number) => LEFT + t * (W - LEFT - RIGHT)
  const y = (value: number) => {
    const max = yMax()
    return TOP + (1 - Math.min(Math.max(value, 0), max) / max) * (H - TOP - BOTTOM)
  }

  const yTicks = () => {
    const list: number[] = []
    for (let value = 0; value <= yMax(); value += 50) list.push(value)
    return list
  }

  const actual = () => `M${x(0)},${y(0)}L${x(props.forecast.elapsed)},${y(props.meter.percent)}`
  const actualArea = () => `${actual()}L${x(props.forecast.elapsed)},${y(0)}Z`
  const projectedLine = () => {
    const forecast = props.forecast
    if (forecast.elapsed <= 0 || forecast.elapsed >= 1) return undefined
    return `M${x(forecast.elapsed)},${y(props.meter.percent)}L${x(1)},${y(forecast.projected)}`
  }
  const projectedArea = () => {
    const forecast = props.forecast
    if (forecast.elapsed <= 0 || forecast.elapsed >= 1) return undefined
    return `M${x(forecast.elapsed)},${y(props.meter.percent)}L${x(1)},${y(forecast.projected)}L${x(1)},${y(0)}L${x(forecast.elapsed)},${y(0)}Z`
  }
  const crossing = () => {
    const forecast = props.forecast
    if (forecast.projected <= 100 || props.meter.percent >= 100) return undefined
    const t =
      forecast.elapsed +
      ((100 - props.meter.percent) * (1 - forecast.elapsed)) /
        (forecast.projected - props.meter.percent)
    return t > forecast.elapsed && t <= 1 ? t : undefined
  }

  return (
    <svg class="oq-fc-chart" viewBox={`0 0 ${W} ${H}`} role="img">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color={GREEN} stop-opacity="0.26" />
          <stop offset="100%" stop-color={GREEN} stop-opacity="0" />
        </linearGradient>
        <pattern
          id={hatchId}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke={GOLD} stroke-width="1.3" stroke-opacity="0.32" />
        </pattern>
      </defs>

      <For each={yTicks()}>
        {(value) => (
          <>
            <line
              class={value === 100 ? "oq-fc-grid oq-fc-limit" : "oq-fc-grid"}
              x1={x(0)}
              x2={x(1)}
              y1={y(value)}
              y2={y(value)}
            />
            <text class="oq-fc-axis-label" x={LEFT - 6} y={y(value) + 2.5} text-anchor="end">
              {value}%
            </text>
          </>
        )}
      </For>

      <Path d={actualArea()} fill={`url(#${fillId})`} />
      <Show when={projectedArea()}>{(d) => <Path d={d()} fill={`url(#${hatchId})`} />}</Show>

      <Path d={actual()} stroke={GREEN} width={1.7} />
      <Show when={projectedLine()}>
        {(d) => <Path d={d()} stroke={GOLD} width={1.7} />}
      </Show>

      <line
        class="oq-fc-nowline"
        x1={x(props.forecast.elapsed)}
        x2={x(props.forecast.elapsed)}
        y1={TOP}
        y2={H - BOTTOM}
      />
      <circle
        class="oq-fc-dot"
        cx={x(props.forecast.elapsed)}
        cy={y(props.meter.percent)}
        r="3"
        fill={GREEN}
      />
      <Show when={props.forecast.elapsed > 0 && props.forecast.elapsed < 1}>
        <circle cx={x(1)} cy={y(props.forecast.projected)} r="2.6" fill={GOLD} />
      </Show>
      <Show when={crossing()}>
        {(t) => <circle cx={x(t())} cy={y(100)} r="2.8" fill={GOLD} />}
      </Show>
    </svg>
  )
}

/** A smooth line path for the chart, drawn with rounded joins. */
function Path(props: { d: string; stroke?: string; width?: number; fill?: string }) {
  return (
    <path
      class={props.stroke ? "oq-fc-line" : "oq-fc-area"}
      d={props.d}
      stroke={props.stroke}
      stroke-width={props.width}
      fill={props.fill ?? "none"}
    />
  )
}

function MeterView(props: { ctx: Context; name: string; meter: Meter; now: () => number }) {
  const percent = () => clamp(Math.round(props.meter.percent), 0, 100)
  const tone = () => meterTone(props.meter)

  return (
    <div class="oq-meter">
      <div class="oq-meter-head">
        <span class="oq-meter-name" title={props.name}>
          {props.name}
        </span>
        <span class="oq-meter-value" data-tone={tone()}>
          {props.meter.limited
            ? props.ctx.t("card.limited")
            : props.ctx.t("card.used", { percent: percent() })}
        </span>
      </div>
      <div class="oq-track">
        <div class="oq-fill" data-tone={tone()} style={{ width: `${percent()}%` }} />
      </div>
      <div class="oq-reset" title={absoluteTime(props.ctx, props.meter.resetsAt)}>
        {props.ctx.t("card.resets", {
          time: relativeTime(props.ctx, props.meter.resetsAt, props.now()),
        })}
      </div>
    </div>
  )
}

function BudgetView(props: { ctx: Context; budget: Budget; now: () => number }) {
  const percent = () =>
    props.budget.limit > 0 ? clamp((props.budget.spent / props.budget.limit) * 100, 0, 100) : 100
  const tone = () => budgetTone(props.budget)
  const name = () => budgetName(props.ctx, props.budget)

  return (
    <div class="oq-meter">
      <div class="oq-meter-head">
        <span class="oq-meter-name" title={name()}>
          {name()}
        </span>
        <span class="oq-meter-value" data-tone={tone()}>
          {props.ctx.t("card.budget.spent", {
            spent: money(props.ctx, props.budget.spent),
            limit: money(props.ctx, props.budget.limit),
          })}
        </span>
      </div>
      <div class="oq-track">
        <div class="oq-fill" data-tone={tone()} style={{ width: `${percent()}%` }} />
      </div>
      <div class="oq-reset" title={absoluteTime(props.ctx, props.budget.resetsAt)}>
        {props.ctx.t("card.resets", {
          time: relativeTime(props.ctx, props.budget.resetsAt, props.now()),
        })}
      </div>
    </div>
  )
}
