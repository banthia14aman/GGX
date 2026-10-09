import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TbBrandSteam, TbMapPin, TbMinus, TbPlus, TbChevronLeft, TbEye, TbQrcode, TbClockHour4, TbShieldCheck, TbArrowsExchange } from 'react-icons/tb'
import { GiCrosshair } from 'react-icons/gi'
import { Guarantee, ItemArt, ItemCard, RarityTag, WishButton } from '../components'
import { cs2Meta, deposit, findSeller, inr, items } from '../data/catalog'
import { ME, useStore } from '../store'

const WEARS = [['FN', 0.07], ['MW', 0.15], ['FT', 0.38], ['WW', 0.45], ['BS', 1]] as const

export default function ItemPage() {
  const { id = '' } = useParams()
  const { item, addToCart, notify } = useStore()
  const nav = useNavigate()
  const it = item(id)
  const today = new Date().toISOString().slice(0, 10)
  const [mode, setMode] = useState<'buy' | 'rent'>(it?.mode === 'rent' ? 'rent' : 'buy')
  const [days, setDays] = useState(2)
  const [start, setStart] = useState(today)

  if (!it) return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <GiCrosshair className="mx-auto mb-3 text-5xl text-red-text" aria-hidden />
      <h1 className="display text-5xl">Listing not found</h1>
      <p className="mt-2 text-muted">It may have sold already. GG to the buyer.</p>
      <Link to="/market" className="btn btn-red mt-6">Back to market</Link>
    </div>
  )

  const seller = findSeller(it.seller)
  const isCs2 = it.kind === 'cs2'
  const rentAmt = (it.rentPerDay ?? 0) * days
  const dep = deposit(it.value, ME.tier)
  const depTier2 = deposit(it.value, 2)
  const color = isCs2 ? cs2Meta(it.name).color : undefined
  const similar = items.filter((x) => x.kind === it.kind && x.id !== it.id).slice(0, 4)
  const add = (go: boolean) => {
    addToCart({ itemId: it.id, mode, days: mode === 'rent' ? days : 1, start: mode === 'rent' ? start : undefined })
    if (go) nav('/checkout')
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-6 md:px-6">
      <Link to="/market" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-fg"><TbChevronLeft /> Market</Link>
      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
        {/* Inspect stage */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="hud relative border border-line" style={{ ['--hud-color' as string]: color }}>
            <ItemArt item={it} big className="aspect-[4/3] w-full" />
            <WishButton id={it.id} className="absolute right-3 top-3" />
            <div className="absolute left-3 top-3 flex items-center gap-1.5 bg-ink/85 px-2 py-1 text-xs text-muted"><TbEye aria-hidden /> <span className="tabular">{it.watchers}</span> watching</div>
          </div>
          {isCs2 && it.float != null && (
            <div className="mt-4 border border-line bg-surface p-4">
              <div className="mb-2 flex justify-between text-xs text-muted"><span>Wear (float)</span><span className="tabular font-mono text-fg">{it.float.toFixed(4)}</span></div>
              <div className="relative flex h-2">
                {WEARS.map(([l, max], i) => {
                  const min = i ? WEARS[i - 1][1] : 0
                  return <div key={l} className="h-full" style={{ width: `${(max - min) * 100}%`, background: `oklch(${0.75 - i * 0.1} 0.12 ${150 - i * 30})` }} title={l} />
                })}
                <div className="absolute -top-1 h-4 w-0.5 bg-fg shadow-[0_0_8px_white]" style={{ left: `${it.float * 100}%` }} aria-hidden />
              </div>
              <div className="mt-1 flex text-[10px] text-muted">{WEARS.map(([l, max], i) => <span key={l} style={{ width: `${(max - (i ? WEARS[i - 1][1] : 0)) * 100}%` }}>{l}</span>)}</div>
              <button onClick={() => notify('Demo: this would open the in-game inspect link in CS2')} className="btn btn-line mt-4 w-full"><GiCrosshair /> Inspect in game</button>
            </div>
          )}
        </div>

        {/* Buy box */}
        <div>
          <RarityTag item={it} />
          <h1 className="display mt-2 text-5xl md:text-6xl">{it.name}</h1>
          <p className="mt-4 max-w-prose text-fg/80">{it.blurb}</p>

          {it.mode === 'both' && (
            <div className="mt-6 grid grid-cols-2 border border-line-strong" role="radiogroup" aria-label="Buy or rent">
              {(['buy', 'rent'] as const).map((m) => (
                <button key={m} role="radio" aria-checked={mode === m} onClick={() => setMode(m)} className={`min-h-12 font-semibold transition-colors ${mode === m ? 'bg-red text-ink' : 'text-muted hover:text-fg'}`}>
                  {m === 'buy' ? `Buy ${inr(it.price!)}` : `Rent ${inr(it.rentPerDay!)}/day`}
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 border border-line bg-surface p-5">
            {mode === 'buy' ? (
              <div className="flex items-end justify-between">
                <span className="text-muted">Price</span>
                <span className="tabular text-4xl font-bold">{inr(it.price!)}</span>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="start">Pickup date</label>
                    <input id="start" type="date" min={today} value={start} onChange={(e) => setStart(e.target.value)} className="field" />
                  </div>
                  <div>
                    <span className="label" id="days-l">Days</span>
                    <div className="flex items-center border border-line-strong" aria-labelledby="days-l">
                      <button onClick={() => setDays((d) => Math.max(1, d - 1))} className="grid h-11 w-11 place-items-center hover:bg-raised" aria-label="Fewer days"><TbMinus /></button>
                      <span className="tabular flex-1 text-center font-semibold">{days}</span>
                      <button onClick={() => setDays((d) => Math.min(14, d + 1))} className="grid h-11 w-11 place-items-center hover:bg-raised" aria-label="More days"><TbPlus /></button>
                    </div>
                  </div>
                </div>
                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-muted">{inr(it.rentPerDay!)} × {days} day{days > 1 ? 's' : ''}</dt><dd className="tabular font-semibold">{inr(rentAmt)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">Refundable deposit <span className="text-xs">(new player, tier 1)</span></dt><dd className="tabular font-semibold">{inr(dep)}</dd></div>
                  <div className="flex justify-between border-t border-line pt-3 text-base"><dt>Due at checkout</dt><dd className="tabular text-2xl font-bold">{inr(rentAmt + dep)}</dd></div>
                </dl>
                {depTier2 < dep && <p className="mt-3 text-xs text-muted">Tier-2 players (3+ clean trades, 90%+ recommended) pay a <span className="font-semibold text-ok">{inr(depTier2)}</span> deposit here.</p>}
              </>
            )}
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button onClick={() => add(true)} className="btn btn-red !min-h-12">{mode === 'rent' ? 'Rent now' : 'Buy now'}</button>
              <button onClick={() => add(false)} className="btn btn-line !min-h-12">Add to loadout</button>
            </div>
          </div>

          <div className="mt-4"><Guarantee compact /></div>

          {/* Seller passport */}
          <div className="mt-6 flex items-center gap-4 border border-line p-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center border border-red/60 text-lg font-bold text-red-text">{seller.name.slice(0, 2).toUpperCase()}</div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 font-semibold">{seller.handle}<span className="inline-flex items-center gap-1 border border-ok/40 px-1.5 text-[11px] font-medium text-ok"><TbShieldCheck /> Verified IITD</span></div>
              <div className="text-sm text-muted">{seller.year} · <TbMapPin className="inline" aria-hidden /> {seller.hostel}</div>
            </div>
            <div className="text-right text-sm">
              <div className="tabular font-bold text-ok">{seller.trades ? `${seller.rec}%` : 'New'}</div>
              <div className="text-xs text-muted">{seller.trades} trades</div>
            </div>
          </div>

          {/* How it reaches you */}
          <div className="mt-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-muted">How it reaches you</h2>
            <ol className="space-y-3">
              {(isCs2
                ? [[TbBrandSteam, 'Seller sends a Steam trade offer to your linked account'], [TbArrowsExchange, 'You accept in Steam. GGX checks the item matches the listing'], [TbClockHour4, 'Steam trade protection runs 7 days. Your skin, our hold'], [TbShieldCheck, 'Day 8: seller is paid. Nothing can be reversed']]
                : [[TbQrcode, 'Meet at the seller\'s hostel or a GGX handover point'], [TbShieldCheck, 'Check the gear, then scan the seller\'s QR. Only then is money released'], [TbClockHour4, mode === 'rent' ? 'Return on time: deposit back automatically, +credits' : '48 hours to flag anything not as described']]
              ).map(([I, t], i) => {
                const Icon = I as typeof TbQrcode
                return (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="grid h-8 w-8 shrink-0 place-items-center border border-line-strong text-red-text"><Icon aria-hidden /></span>
                    <span className="pt-1.5 text-fg/85">{t as string}</span>
                  </li>
                )
              })}
            </ol>
          </div>

          <dl className="mt-6 border-t border-line">
            {it.specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-line py-2.5 text-sm"><dt className="text-muted">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
            ))}
            <div className="flex justify-between gap-4 border-b border-line py-2.5 text-sm"><dt className="text-muted">Listed</dt><dd>{it.listed}</dd></div>
          </dl>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="display mb-5 text-4xl">More like this</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">{similar.map((s) => <ItemCard key={s.id} item={s} />)}</div>
        </section>
      )}
    </div>
  )
}
