import { createSignal } from "solid-js"
import type { Context } from "@opencode/plugin/gui"
import type { Quota, RefreshReason } from "./types"

type LimitsInput = { location?: { directory?: string } }
type LimitsResult = { data: Quota | null }
type LimitsCall = (input: LimitsInput, options?: { signal?: AbortSignal }) => Promise<LimitsResult>

/**
 * OpenCode 2.2.5 moved the endpoint to `client.experimental.usage.limits` and kept the
 * old path as a deprecated alias. Use whichever the running app provides.
 */
function limitsCall(client: Context["client"]): LimitsCall | undefined {
  const value = client as unknown as {
    experimental?: { usage?: { limits?: LimitsCall } }
    usage?: { limits?: LimitsCall }
  }
  const experimental = value.experimental?.usage
  if (typeof experimental?.limits === "function") return experimental.limits.bind(experimental)
  const legacy = value.usage
  if (typeof legacy?.limits === "function") return legacy.limits.bind(legacy)
  return undefined
}

export type QuotaStore = {
  /** `undefined` before the first answer, `null` when no Console workspace is signed in. */
  data: () => Quota | null | undefined
  error: () => string | undefined
  loading: () => boolean
  updatedAt: () => number | undefined
  refresh: (reason?: RefreshReason) => Promise<void>
}

function messageOf(cause: unknown): string {
  if (cause instanceof Error) return cause.message
  if (typeof cause === "object" && cause !== null && "message" in cause) {
    const message = (cause as { message?: unknown }).message
    if (typeof message === "string") return message
  }
  return String(cause)
}

/** The live quota of the Console workspace the app's own server is signed in to. */
export function createQuota(ctx: Context): QuotaStore {
  const [data, setData] = createSignal<Quota | null | undefined>(undefined)
  const [error, setError] = createSignal<string>()
  const [loading, setLoading] = createSignal(false)
  const [updatedAt, setUpdatedAt] = createSignal<number>()
  let inFlight: Promise<void> | undefined
  let generation = 0

  const input = (): LimitsInput => {
    const session = ctx.sessions.current()
    const directory = session?.server.builtin ? session.directory : undefined
    return directory ? { location: { directory } } : {}
  }

  async function load(): Promise<void> {
    const current = ++generation
    setLoading(true)

    try {
      const call = limitsCall(ctx.client)
      if (!call) throw new Error("This OpenCode build has no usage limits API")

      const result = await call(input(), { signal: ctx.signal })
      if (current !== generation || ctx.signal.aborted) return

      setData(result.data)
      setError(undefined)
      setUpdatedAt(Date.now())
    } catch (cause) {
      if (current !== generation || ctx.signal.aborted) return
      setError(messageOf(cause))
    } finally {
      if (current === generation) setLoading(false)
    }
  }

  return {
    data,
    error,
    loading,
    updatedAt,
    refresh(reason: RefreshReason = "auto") {
      if (ctx.signal.aborted) return Promise.resolve()
      if (inFlight) return inFlight
      void reason
      inFlight = load().finally(() => {
        inFlight = undefined
      })
      return inFlight
    },
  }
}
