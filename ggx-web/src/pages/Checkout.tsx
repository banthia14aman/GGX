import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { TbBrandSteam, TbCreditCard, TbLoader2, TbLock, TbCircleCheck } from 'react-icons/tb'
import { GiTwoCoins, GiSwapBag } from 'react-icons/gi'
import { Guarantee, ItemArt } from '../components'
import { inr } from '../data/catalog'
import { lineTotals, useStore, type Order } from '../store'

const UPI = ['Google Pay', 'PhonePe', 'Paytm', 'BHIM']
const POINTS = ['Seller\'s hostel gate', 'Central Library steps', 'LHC lobby', 'SAC entrance']

export default function Checkout() {
  const { cart, item, credits, checkout } = useStore()
  const [useCredits, setUseCredits] = useState(true)
  const [method, setMethod] = useState('upi')
  const [upi, setUpi] = useState(UPI[0])
  const [point, setPoint] = useState(POINTS[0])
  const [steamUrl, setSteamUrl] = useState('https://steamcommunity.com/tradeoffer/new/?partner=00000000&token=demo')
  const [phase, setPhase] = useState<'idle' | 'paying' | 'done'>('idle')
  const [done, setDone] = useState<Order[]>([])

  const lines = cart.flatMap((l) => { const it = item(l.itemId); return it ? [{ l, it, t: lineTotals(l, it) }] : [] })
  const amount = lines.reduce((a, x) => a + x.t.amount, 0)
  const deposits = lines.reduce((a, x) => a + x.t.deposit, 0)
  const creditOff = useCredits ? Math.min(credits, lines.reduce((a, x) => a + Math.floor((x.t.amount * 0.1) / 10), 0)) * 10 : 0
  const total = amount + deposits - creditOff
  const hasCs2 = lines.some((x) => x.it.kind === 'cs2')
  const hasPhysical = lines.some((x) => x.it.kind !== 'cs2')

  const pay = () => {
    setPhase('paying')
    setTimeout(() => { setDone(checkout(useCredits)); setPhase('done') }, 1800)
  }

  if (phase === 'done') return <Success orders={done} />
  if (!lines.length) return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <GiSwapBag className="mx-auto mb-3 text-5xl text-red-text" aria-hidden />
      <h1 className="display text-5xl">Nothing to check out</h1>
      <Link to="/market" className="btn btn-red mt-6">Browse the market</Link>
    </div>
  )

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-10 md:px-6">
      <h1 className="display mb-8 text-6xl">Checkout</h1>
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-muted">Your loadout</h2>
            <div className="border border-line">
              {lines.map(({ l, it, t }) => (
                <div key={l.key} className="flex gap-4 border-b border-line p-4 last:border-b-0">
                  <ItemArt item={it} className="h-20 w-28 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{it.name}</div>
                    <div className="text-sm text-muted">{l.mode === 'rent' ? `Rental · ${l.days} day${l.days > 1 ? 's' : ''} from ${l.start}` : it.kind === 'cs2' ? 'Steam trade' : 'Campus handover'}</div>
                  </div>
                  <div className="tabular text-right">
                    <div className="font-bold">{inr(t.amount)}</div>
                    {t.deposit > 0 && <div className="text-xs text-muted">+{inr(t.deposit)} deposit</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {hasCs2 && (
            <section>
              <label htmlFor="steam" className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-muted"><TbBrandSteam /> Your Steam trade URL</label>
              <input id="steam" value={steamUrl} onChange={(e) => setSteamUrl(e.target.value)} className="field font-mono text-xs" />
              <p className="mt-2 text-xs text-muted">Demo placeholder. In the real app you link Steam once, and GGX checks the incoming offer against this listing.</p>
            </section>
          )}

          {hasPhysical && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-muted">Handover point</h2>
              <div className="grid gap-2 sm:grid-cols-2" role="radiogroup">
                {POINTS.map((p) => (
                  <button key={p} role="radio" aria-checked={point === p} onClick={() => setPoint(p)} className={`min-h-12 border px-4 text-left text-sm transition-colors ${point === p ? 'border-red text-fg shadow-[0_0_16px_-6px_var(--color-red)]' : 'border-line-strong text-muted hover:text-fg'}`}>{p}</button>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-muted">Pay with</h2>
            <div className="grid grid-cols-2 border border-line-strong" role="radiogroup">
              {[['upi', 'UPI'], ['card', 'Card']].map(([v, l]) => (
                <button key={v} role="radio" aria-checked={method === v} onClick={() => setMethod(v)} className={`min-h-12 font-semibold ${method === v ? 'bg-red text-ink' : 'text-muted hover:text-fg'}`}>{l}</button>
              ))}
            </div>
            {method === 'upi' ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {UPI.map((u) => (
                  <button key={u} onClick={() => setUpi(u)} aria-pressed={upi === u} className={`min-h-10 border px-4 text-sm ${upi === u ? 'border-red text-fg' : 'border-line-strong text-muted'}`}>{u}</button>
                ))}
              </div>
            ) : (
              <div className="mt-3 flex items-center gap-2 border border-line-strong bg-raised px-3 py-3 text-sm text-muted"><TbCreditCard /> Card details are entered on the Razorpay page (test mode).</div>
            )}
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="hud border border-line bg-surface p-5">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Items</dt><dd className="tabular">{inr(amount)}</dd></div>
              {deposits > 0 && <div className="flex justify-between"><dt className="text-muted">Refundable deposits</dt><dd className="tabular">{inr(deposits)}</dd></div>}
              <div className="flex items-center justify-between">
                <dt><label className="flex cursor-pointer items-center gap-2 text-muted"><input type="checkbox" checked={useCredits} onChange={(e) => setUseCredits(e.target.checked)} className="h-4 w-4 accent-[var(--color-red)]" /><GiTwoCoins className="text-warn" /> Use credits ({credits})</label></dt>
                <dd className="tabular text-ok">{creditOff ? `-${inr(creditOff)}` : inr(0)}</dd>
              </div>
              <p className="text-xs text-muted">Credits cover up to 10% of an order. Spend the rest on Passport cosmetics.</p>
              <div className="flex items-end justify-between border-t border-line pt-3"><dt className="font-semibold">Pay now</dt><dd className="tabular text-3xl font-bold">{inr(total)}</dd></div>
            </dl>
            <button onClick={pay} className="btn btn-red mt-5 w-full !min-h-12 text-base"><TbLock /> Pay {inr(total)}</button>
            <p className="mt-3 text-center text-xs text-muted">Held by GGX until handover or Steam trade protection ends.</p>
          </div>
          <div className="mt-4"><Guarantee compact /></div>
        </aside>
      </div>

      <AnimatePresence>
        {phase === 'paying' && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-ink/80 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="alertdialog" aria-label="Processing payment">
            <motion.div initial={{ y: 20, scale: 0.97 }} animate={{ y: 0, scale: 1 }} className="w-full max-w-sm border border-line bg-surface p-6 text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Razorpay · test mode</div>
              <TbLoader2 className="mx-auto my-6 animate-spin text-5xl text-red-text" aria-hidden />
              <div className="font-semibold">Waiting for {method === 'upi' ? upi : 'card'} confirmation</div>
              <div className="tabular mt-1 text-2xl font-bold">{inr(total)}</div>
              <p className="mt-3 text-xs text-muted">Demo: no money moves.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Success({ orders }: { orders: Order[] }) {
  const { item } = useStore()
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <TbCircleCheck className="text-6xl text-ok" aria-hidden />
      </motion.div>
      <h1 className="display mt-4 text-7xl">GG. <span className="text-red glow-text">Paid.</span></h1>
      <p className="mt-3 text-fg/80">Your money is held by GGX. Each seller has been notified. Track every order below.</p>
      <div className="mt-8 border border-line">
        {orders.map((o) => {
          const it = item(o.line.itemId)!
          return (
            <Link key={o.id} to={`/order/${o.id}`} className="flex items-center gap-4 border-b border-line p-4 last:border-b-0 hover:bg-raised">
              <ItemArt item={it} className="h-16 w-20 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-mono text-xs text-muted">{o.id}</div>
                <div className="truncate font-semibold">{it.name}</div>
              </div>
              <span className="btn btn-line !min-h-10">Track</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
