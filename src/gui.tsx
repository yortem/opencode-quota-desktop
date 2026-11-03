import { Command, Plugin, Slot, Store, Style, TitlebarItem } from "@opencode/plugin/gui"
import { Schema } from "effect"
import { FloatingQuota } from "./gui/card"
import { budgetName, clamp, toneOf, topPercent } from "./gui/format"
import { en } from "./gui/i18n"
import { createQuota } from "./gui/quota"
import { STYLE } from "./gui/style"
import { GO_WINDOWS, type RefreshReason } from "./gui/types"

const Dock = Schema.Struct({
  x: Schema.Number,
  y: Schema.Number,
  placed: Schema.Boolean,
  open: Schema.Boolean,
  collapsed: Schema.Boolean,
  forecast: Schema.Boolean,
  layout: Schema.Number,
})

/** Seconds between automatic refreshes, between 15 and 3600. */
function refreshSeconds(value: unknown): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? clamp(Math.round(parsed), 15, 3600) : 60
}

export default Plugin.define({
  i18n: { en },
  stores: {
    dock: Store.global(Dock, {
      x: 0,
      y: 0,
      placed: false,
      open: true,
      collapsed: false,
      forecast: false,
      layout: 0,
    }),
  },
  setup(ctx) {
    const quota = createQuota(ctx)

    // A save written before the card learned to dock starts at the bottom-right again.
    const dock = ctx.stores.dock
    if (dock.value.layout < 2) {
      dock.update((draft) => {
        draft.layout = 2
        draft.placed = false
        draft.x = 0
        draft.y = 0
      })
    }

    const seconds = refreshSeconds(ctx.options.refreshSeconds)
    let disposed = false

    const refresh = (reason: RefreshReason) => {
      if (!disposed) void quota.refresh(reason)
    }

    const tick = () => {
      if (document.visibilityState !== "hidden") refresh("auto")
    }

    const onVisible = () => {
      if (document.visibilityState === "visible") refresh("auto")
    }

    const timer = setInterval(tick, seconds * 1000)
    document.addEventListener("visibilitychange", onVisible)
    window.addEventListener("focus", onVisible)
    refresh("initial")

    const toggle = () => {
      ctx.stores.dock.update((draft) => {
        draft.open = !draft.open
      })
    }

    const manual = async () => {
      await quota.refresh("manual")
      const failure = quota.error()
      if (failure) {
        ctx.toast.show({ variant: "error", title: ctx.t("toast.error"), description: failure })
      } else {
        ctx.toast.show({ variant: "success", title: ctx.t("toast.refreshed") })
      }
    }

    ctx.add(Style, STYLE)

    ctx.add(
      Command,
      (): Command => ({
        id: "toggle",
        title: ctx.t("command.toggle"),
        description: ctx.t("command.toggle.description"),
        keywords: "quota usage limits go budget",
        bind: "mod+shift+q",
        featured: true,
        run: toggle,
      }),
    )

    ctx.add(
      Command,
      (): Command => ({
        id: "refresh",
        title: ctx.t("command.refresh"),
        run: () => void manual(),
      }),
    )

    ctx.add(
      Command,
      (): Command => ({
        id: "reset",
        title: ctx.t("command.reset"),
        run: () => {
          ctx.stores.dock.update((draft) => {
            draft.placed = false
            draft.x = 0
            draft.y = 0
            draft.open = true
            draft.collapsed = false
          })
        },
      }),
    )

    // The titlebar pill keeps the number in sight while the floating card is hidden.
    ctx.add(TitlebarItem, (): TitlebarItem | undefined => {
      const shown = quota.data()
      if (!shown) return undefined

      const detail: string[] = []
      if (shown.go) {
        for (const key of GO_WINDOWS) {
          detail.push(`${ctx.t(`card.go.${key}`)} ${Math.round(shown.go[key].percent)}%`)
        }
      }
      for (const budget of shown.budgets) {
        const percent = budget.limit > 0 ? Math.round((budget.spent / budget.limit) * 100) : 100
        detail.push(`${budgetName(ctx, budget)} ${percent}%`)
      }

      const top = topPercent(shown)
      return {
        id: "quota",
        label: top === undefined ? ctx.t("titlebar.fallback") : ctx.t("titlebar.label", { percent: top }),
        title: ctx.t("titlebar.title", { text: detail.join(" · ") }),
        icon: toneOf(shown) === "danger" ? "warning" : "window-analytics",
        run: toggle,
      }
    })

    // The card renders from the window's bottom slot, but positions itself fixed over the app.
    ctx.add(Slot, {
      at: "window.bottom",
      order: 100,
      render: () => <FloatingQuota ctx={ctx} quota={quota} dock={ctx.stores.dock} />,
    })

    return () => {
      disposed = true
      clearInterval(timer)
      document.removeEventListener("visibilitychange", onVisible)
      window.removeEventListener("focus", onVisible)
    }
  },
})
