import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TbAlertTriangle } from 'react-icons/tb'
import { GiSwapBag } from 'react-icons/gi'
import { SectionHead } from '../components'
import { HOSTELS, KINDS, type Item, type Kind } from '../data/catalog'
import type { PhotoKey } from '../data/images'
import { useStore } from '../store'

// FR-92: game accounts and gambling are blocked at listing time
const BLOCKED = /\b(account|acc|login|password|id\s*sell|smurf|boost(ing)?|bet(ting)?|case\s*opening|gamble|gambling)\b/i
const ART: Partial<Record<Kind, PhotoKey>> = { console: 'ps5Room', controller: 'dualsense', mobile: 'mobileCtrl', wrap: 'ps5', pc: 'pcBuilds', vr: 'quest3' }

export default function Sell() {
  const { addListing, notify } = useStore()
  const nav = useNavigate()
  const [f, setF] = useState({ name: '', kind: 'controller' as Kind, mode: 'buy' as Item['mode'], price: '', rent: '', condition: 'Good' as NonNullable<Item['condition']>, hostel: 'Girnar' })
  const blocked = BLOCKED.test(f.name)
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (blocked) return
    const price = Number(f.price) || undefined
    const rentPerDay = Number(f.rent) || undefined
    if ((f.mode !== 'rent' && !price) || (f.mode !== 'buy' && !rentPerDay)) return notify('Add a price')
    const id = 'my-' + Date.now()
    addListing({
      id, name: f.name.trim(), kind: f.kind, mode: f.mode, price, rentPerDay, value: price ?? (rentPerDay ?? 0) * 100, condition: f.condition,
      art: f.kind === 'cs2' ? { type: 'icon', icon: GiSwapBag } : { type: 'photo', key: ART[f.kind] ?? 'pcBuilds' },
      seller: 's7', listed: 'just now', watchers: 0, blurb: 'Your listing. Stock photo shown until you add real photos at handover.', specs: [['Hostel', f.hostel]],
    })
    notify('Listed. GG, it is live on the market')
    nav(`/item/${id}`)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 md:px-6">
      <SectionHead kicker="Sell or rent out" title={<>List your <span className="text-red">gear</span></>} />
      <form onSubmit={submit} className="hud space-y-5 border border-line bg-surface p-6">
        <div>
          <label className="label" htmlFor="n">What are you listing?</label>
          <input id="n" required className="field" placeholder="e.g. DualSense, Cosmic Red" value={f.name} onChange={(e) => set('name', e.target.value)} aria-invalid={blocked} aria-describedby={blocked ? 'blk' : undefined} />
          {blocked && <p id="blk" className="mt-2 flex items-center gap-2 text-sm text-red-text"><TbAlertTriangle /> Game accounts, logins and betting are not allowed on GGX. They break Riot, Sony and Steam terms.</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="k">Category</label>
            <select id="k" className="field" value={f.kind} onChange={(e) => set('kind', e.target.value as Kind)}>{KINDS.filter((k) => k.id !== 'all').map((k) => <option key={k.id} value={k.id}>{k.label}</option>)}</select>
          </div>
          <div>
            <label className="label" htmlFor="c">Condition</label>
            <select id="c" className="field" value={f.condition} onChange={(e) => set('condition', e.target.value as typeof f.condition)}>{['New', 'Like new', 'Good', 'Fair'].map((c) => <option key={c}>{c}</option>)}</select>
          </div>
        </div>
        <div>
          <span className="label">Listing type</span>
          <div className="grid grid-cols-3 border border-line-strong" role="radiogroup">
            {([['buy', 'Sell'], ['rent', 'Rent out'], ['both', 'Both']] as const).map(([v, l]) => (
              <button type="button" key={v} role="radio" aria-checked={f.mode === v} onClick={() => set('mode', v)} className={`min-h-11 text-sm font-semibold ${f.mode === v ? 'bg-red text-ink' : 'text-muted hover:text-fg'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {f.mode !== 'rent' && <div><label className="label" htmlFor="p">Price (₹)</label><input id="p" inputMode="numeric" className="field tabular" value={f.price} onChange={(e) => set('price', e.target.value.replace(/\D/g, ''))} /></div>}
          {f.mode !== 'buy' && <div><label className="label" htmlFor="r">Rent per day (₹)</label><input id="r" inputMode="numeric" className="field tabular" value={f.rent} onChange={(e) => set('rent', e.target.value.replace(/\D/g, ''))} /></div>}
          <div><label className="label" htmlFor="h">Hostel</label><select id="h" className="field" value={f.hostel} onChange={(e) => set('hostel', e.target.value)}>{HOSTELS.map((h) => <option key={h}>{h}</option>)}</select></div>
        </div>
        <button disabled={blocked} className="btn btn-red w-full !min-h-12">Publish listing</button>
        <p className="text-center text-xs text-muted">GGX takes 8% on sales and 12% on rentals, only when a deal completes.</p>
      </form>
    </div>
  )
}
