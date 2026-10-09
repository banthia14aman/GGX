import { Link, useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { TbBrandSteam, TbCheck, TbChevronLeft, TbArrowsExchange } from 'react-icons/tb'
import { Guarantee, ItemArt } from '../components'
import { findSeller, inr } from '../data/catalog'
import { STAGES, useStore } from '../store'

const NEXT: Record<string, string[]> = {
  cs2: ['Simulate: seller sends trade offer', 'Simulate: accept in Steam', 'Simulate: 7 days pass', 'Simulate: payout day 8'],
  buy: ['Simulate: scan seller\'s QR', 'Simulate: 48h window closes'],
  rent: ['Simulate: scan QR at pickup', 'Simulate: return the gear', 'Simulate: 48h window closes'],
}

export default function OrderPage() {
  const { id = '' } = useParams()
  const { orders, item, advance } = useStore()
  const o = orders.find((x) => x.id === id)
  if (!o) return <div className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="display text-5xl">Order not found</h1><Link to="/me" className="btn btn-red mt-6">Your orders</Link></div>
  const it = item(o.line.itemId)!
  const seller = findSeller(it.seller)
  const stages = STAGES[o.track]
  const last = o.stage === stages.length - 1
  const qrValue = `ggx://handover/${o.id}/${o.stage === 0 ? 'out' : 'return'}`

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-8 md:px-6">
      <Link to="/me" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-fg"><TbChevronLeft /> Passport</Link>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-sm text-muted">{o.id}</div>
          <h1 className="display text-5xl md:text-6xl">{it.name}</h1>
        </div>
        <span className={`border px-3 py-1 text-sm font-semibold ${last ? 'border-ok text-ok' : 'border-red-text text-red-text'}`}>{stages[o.stage]}</span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          {/* Status timeline */}
          <ol className="border border-line bg-surface p-5">
            {stages.map((s, i) => {
              const done = i <= o.stage
              return (
                <li key={s} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < stages.length - 1 && <span className={`absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 ${i < o.stage ? 'bg-red' : 'bg-line'}`} aria-hidden />}
                  <span className={`grid h-8 w-8 shrink-0 place-items-center border-2 ${done ? 'border-red bg-red text-ink shadow-[0_0_14px_-2px_var(--color-red)]' : 'border-line-strong text-muted'}`}>{done ? <TbCheck /> : i + 1}</span>
                  <div className="pt-1">
                    <div className={done ? 'font-semibold' : 'text-muted'}>{s}</div>
                    {i === o.stage && !last && <div className="text-xs text-red-text">Current step</div>}
                  </div>
                </li>
              )
            })}
          </ol>
          {!last && <button onClick={() => advance(o.id)} className="btn btn-red mt-4 w-full">{NEXT[o.track][o.stage]}</button>}
          <p className="mt-2 text-xs text-muted">Demo controls: in the real app these steps happen through QR scans, Steam and timers.</p>
        </div>

        <div className="space-y-4">
          {o.track === 'cs2' ? (
            <div className="border border-line bg-[oklch(0.2_0.03_250)] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold"><TbBrandSteam size={20} /> Trade offer (lookalike)</div>
              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs">
                <div className="border border-line p-2"><div className="text-muted">{seller.handle} gives</div><ItemArt item={it} className="mt-2 aspect-[4/3]" /></div>
                <TbArrowsExchange className="text-2xl text-muted" aria-hidden />
                <div className="border border-line p-2"><div className="text-muted">You give</div><div className="mt-2 grid aspect-[4/3] place-items-center text-muted">Nothing. Paid via GGX</div></div>
              </div>
              <p className="mt-3 text-xs text-muted">{o.stage === 0 ? 'Waiting for the seller to send the offer.' : o.stage === 1 ? 'Offer received. Accept it in Steam.' : 'Item is in your inventory. Trade protection running.'}</p>
            </div>
          ) : (
            <div className="border border-line bg-surface p-5 text-center">
              <div className="text-sm font-semibold">{o.stage === 0 ? 'Scan at pickup' : o.track === 'rent' && o.stage === 1 ? 'Show this when you return it' : 'Handover complete'}</div>
              <div className="mx-auto mt-4 w-fit bg-white p-3"><QRCodeSVG value={qrValue} size={168} bgColor="#ffffff" fgColor="#0d0808" /></div>
              <div className="mt-3 font-mono text-xl tracking-[0.3em]">{o.id.slice(4)} {String(o.created).slice(-2)}</div>
              <p className="mt-1 text-xs text-muted">Fallback code if the camera fails</p>
            </div>
          )}

          <dl className="border border-line p-5 text-sm">
            <div className="flex justify-between py-1"><dt className="text-muted">Seller</dt><dd>{seller.handle} · {seller.hostel}</dd></div>
            <div className="flex justify-between py-1"><dt className="text-muted">{o.line.mode === 'rent' ? `Rent, ${o.line.days} days` : 'Price'}</dt><dd className="tabular">{inr(o.amount)}</dd></div>
            {o.deposit > 0 && <div className="flex justify-between py-1"><dt className="text-muted">Deposit (refundable)</dt><dd className="tabular">{inr(o.deposit)}</dd></div>}
            {o.credits > 0 && <div className="flex justify-between py-1"><dt className="text-muted">Credits used</dt><dd className="tabular text-ok">-{inr(o.credits * 10)}</dd></div>}
          </dl>
          <Guarantee compact />
        </div>
      </div>
    </div>
  )
}
