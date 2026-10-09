import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TbSearch, TbX } from 'react-icons/tb'
import { GiRadarSweep } from 'react-icons/gi'
import { ItemCard } from '../components'
import { findSeller, HOSTELS, items as base, KINDS } from '../data/catalog'
import { useStore } from '../store'

const SORTS = { new: 'Newest', low: 'Price: low to high', high: 'Price: high to low', hot: 'Most watched' } as const

export default function Market() {
  const [sp, setSp] = useSearchParams()
  const { listings } = useStore()
  const kind = sp.get('kind') ?? 'all'
  const mode = sp.get('mode') ?? 'any'
  const sort = (sp.get('sort') ?? 'new') as keyof typeof SORTS
  const q = sp.get('q') ?? ''
  const hostel = sp.get('hostel') ?? ''
  const max = Number(sp.get('max')) || 0
  const set = (k: string, v: string) => { const n = new URLSearchParams(sp); if (v) n.set(k, v); else n.delete(k); setSp(n, { replace: true }) }

  const all = useMemo(() => [...listings, ...base], [listings])
  const list = useMemo(() => {
    const priceOf = (i: (typeof all)[number]) => i.price ?? i.rentPerDay ?? 0
    const r = all.filter((i) =>
      (kind === 'all' || i.kind === kind) &&
      (mode === 'any' || i.mode === mode || i.mode === 'both') &&
      (!hostel || findSeller(i.seller).hostel === hostel) &&
      (!max || priceOf(i) <= max) &&
      (!q || i.name.toLowerCase().includes(q.toLowerCase())))
    if (sort === 'low') r.sort((a, b) => priceOf(a) - priceOf(b))
    if (sort === 'high') r.sort((a, b) => priceOf(b) - priceOf(a))
    if (sort === 'hot') r.sort((a, b) => b.watchers - a.watchers)
    return r
  }, [all, kind, mode, hostel, q, sort, max])

  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-10 md:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h1 className="display text-6xl md:text-7xl">Market</h1>
        <div className="relative w-full max-w-md">
          <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <label htmlFor="q" className="sr-only">Search gear</label>
          <input id="q" value={q} onChange={(e) => set('q', e.target.value)} placeholder="Search AWP, PS5, DualSense…" className="field !pl-10" />
        </div>
      </div>

      <div className="noscroll -mx-4 mb-6 flex gap-1 overflow-x-auto border-b border-line px-4 md:mx-0 md:px-0" role="tablist" aria-label="Category">
        {KINDS.map((k) => (
          <button key={k.id} role="tab" aria-selected={kind === k.id} onClick={() => set('kind', k.id === 'all' ? '' : k.id)}
            className={`relative shrink-0 px-4 py-3 text-sm font-semibold transition-colors ${kind === k.id ? 'text-fg' : 'text-muted hover:text-fg'}`}>
            {k.label}
            {kind === k.id && <span className="absolute inset-x-2 bottom-0 h-0.5 bg-red shadow-[0_0_10px_var(--color-red)]" />}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex border border-line-strong" role="radiogroup" aria-label="Buy or rent">
          {[['any', 'Buy + rent'], ['buy', 'Buy'], ['rent', 'Rent']].map(([v, l]) => (
            <button key={v} role="radio" aria-checked={mode === v} onClick={() => set('mode', v === 'any' ? '' : v)}
              className={`min-h-10 px-4 text-sm font-medium transition-colors ${mode === v ? 'bg-red text-ink' : 'text-muted hover:text-fg'}`}>{l}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Budget">
          {[[500, 'Under ₹500'], [2000, 'Under ₹2,000'], [5000, 'Under ₹5,000']].map(([v, l]) => (
            <button key={v} role="radio" aria-checked={max === v} onClick={() => set('max', max === v ? '' : String(v))}
              className={`min-h-10 border px-3 text-sm font-medium transition-colors ${max === v ? 'border-red text-red-text shadow-[0_0_14px_-6px_var(--color-red)]' : 'border-line-strong text-muted hover:text-fg'}`}>{l}</button>
          ))}
        </div>
        <label className="sr-only" htmlFor="hostel">Hostel</label>
        <select id="hostel" value={hostel} onChange={(e) => set('hostel', e.target.value)} className="field !w-auto !min-h-10">
          <option value="">Any hostel</option>
          {HOSTELS.map((h) => <option key={h}>{h}</option>)}
        </select>
        <label className="sr-only" htmlFor="sort">Sort</label>
        <select id="sort" value={sort} onChange={(e) => set('sort', e.target.value)} className="field !w-auto !min-h-10">
          {Object.entries(SORTS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <span className="ml-auto text-sm text-muted"><span className="tabular font-semibold text-fg">{list.length}</span> listings</span>
      </div>

      {list.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] sm:gap-4">
          {list.map((i) => <ItemCard key={i.id} item={i} />)}
        </div>
      ) : (
        <div className="hud border border-line bg-surface px-6 py-16 text-center">
          <GiRadarSweep className="mx-auto mb-3 text-5xl text-red-text" aria-hidden />
          <p className="text-lg font-semibold">Nothing on the radar</p>
          <p className="mt-1 text-sm text-muted">No listings match. Wishlist a search and we will ping you when one lands.</p>
          <button onClick={() => setSp({})} className="btn btn-line mt-5"><TbX /> Clear filters</button>
        </div>
      )}
    </div>
  )
}
