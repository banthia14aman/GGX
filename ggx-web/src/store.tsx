import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { deposit, findItem, type Item } from './data/catalog'

// ponytail: client-only state persisted to localStorage. The demo has no backend by design;
// Phase D swaps these setters for Supabase calls.

export type Line = { key: string; itemId: string; mode: 'buy' | 'rent'; days: number; start?: string }
export type Order = {
  id: string; line: Line; amount: number; deposit: number; credits: number; stage: number; created: number
  track: 'cs2' | 'buy' | 'rent'
}
export type Pass = { id: string; tournamentId: string; team: string; created: number }

export const ME = { handle: 'player_one', name: 'You', hostel: 'Girnar', tier: 1 as 1 | 2 }
export const STAGES: Record<Order['track'], string[]> = {
  cs2: ['Paid, held by GGX', 'Steam trade offer sent', 'Trade accepted', 'Trade protection (7 days)', 'Payout released'],
  buy: ['Paid, held by GGX', 'Handed over (QR scanned)', 'Completed'],
  rent: ['Paid, held by GGX', 'Rental active', 'Returned', 'Completed, deposit refunded'],
}

type State = {
  cart: Line[]; orders: Order[]; wishlist: string[]; credits: number; passes: Pass[]; listings: Item[]; invited: string[]
}
const initial: State = { cart: [], orders: [], wishlist: [], credits: 15, passes: [], listings: [], invited: [] }
const KEY = 'ggx-demo-v1'

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...initial, ...JSON.parse(raw) } : initial
  } catch {
    return initial
  }
}

export function lineTotals(line: Line, item: Item, tier: 1 | 2 = ME.tier) {
  const amount = line.mode === 'rent' ? (item.rentPerDay ?? 0) * line.days : item.price ?? 0
  const dep = line.mode === 'rent' ? deposit(item.value, tier) : 0
  return { amount, deposit: dep }
}

type Ctx = State & {
  toast: string | null
  notify: (msg: string) => void
  item: (id: string) => Item | undefined
  addToCart: (l: Omit<Line, 'key'>) => void
  removeFromCart: (key: string) => void
  toggleWish: (id: string) => void
  checkout: (useCredits: boolean) => Order[]
  advance: (orderId: string) => void
  register: (tournamentId: string, team: string) => Pass
  addListing: (i: Item) => void
  invite: (id: string) => void
  reset: () => void
}

const StoreCtx = createContext<Ctx | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<State>(load)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* private mode: state stays in memory */ }
  }, [s])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(t)
  }, [toast])

  const item = useCallback((id: string) => findItem(id) ?? s.listings.find((l) => l.id === id), [s.listings])

  const value = useMemo<Ctx>(() => ({
    ...s,
    toast,
    notify: setToast,
    item,
    addToCart: (l) => {
      setS((p) => ({ ...p, cart: [...p.cart.filter((c) => c.itemId !== l.itemId), { ...l, key: crypto.randomUUID() }] }))
      setToast('Added to your loadout')
    },
    removeFromCart: (key) => setS((p) => ({ ...p, cart: p.cart.filter((c) => c.key !== key) })),
    toggleWish: (id) => setS((p) => {
      const has = p.wishlist.includes(id)
      setToast(has ? 'Removed from wishlist' : 'Wishlisted: we will ping you on price drops')
      return { ...p, wishlist: has ? p.wishlist.filter((w) => w !== id) : [...p.wishlist, id] }
    }),
    checkout: (useCredits) => {
      // Credits: 1 credit = ₹10, max 10% of each order (functional design, section 7)
      let creditsLeft = useCredits ? s.credits : 0
      const created: Order[] = s.cart.flatMap((line) => {
        const it = item(line.itemId)
        if (!it) return []
        const t = lineTotals(line, it)
        const credits = Math.min(creditsLeft, Math.floor((t.amount * 0.1) / 10))
        creditsLeft -= credits
        return [{
          id: 'GGX-' + Math.floor(1000 + Math.random() * 9000), line, amount: t.amount, deposit: t.deposit, credits, stage: 0, created: Date.now(),
          track: it.kind === 'cs2' ? 'cs2' : line.mode,
        }]
      })
      const spent = created.reduce((a, o) => a + o.credits, 0)
      setS((p) => ({ ...p, cart: [], orders: [...created, ...p.orders], credits: p.credits - spent }))
      return created
    },
    advance: (orderId) => setS((p) => {
      const orders = p.orders.map((o) => (o.id === orderId ? { ...o, stage: Math.min(o.stage + 1, STAGES[o.track].length - 1) } : o))
      const done = orders.find((o) => o.id === orderId)
      // Lending on time / completing a trade earns credits (the Steam Points idea)
      const earned = done && done.stage === STAGES[done.track].length - 1 ? 2 : 0
      if (earned) setToast(`GG. Order complete, +${earned} credits`)
      return { ...p, orders, credits: p.credits + earned }
    }),
    register: (tournamentId, team) => {
      const pass = { id: 'PASS-' + Math.floor(100000 + Math.random() * 900000), tournamentId, team, created: Date.now() }
      setS((p) => ({ ...p, passes: [pass, ...p.passes.filter((x) => x.tournamentId !== tournamentId)] }))
      return pass
    },
    addListing: (i) => setS((p) => ({ ...p, listings: [i, ...p.listings] })),
    invite: (id) => {
      setS((p) => ({ ...p, invited: p.invited.includes(id) ? p.invited : [...p.invited, id] }))
      setToast('Invite sent. Squad chat opens on Discord once they accept.')
    },
    reset: () => { setS(initial); setToast('Demo reset') },
  }), [s, toast, item])

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const c = useContext(StoreCtx)
  if (!c) throw new Error('useStore outside StoreProvider')
  return c
}
